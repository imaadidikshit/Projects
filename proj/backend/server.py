from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    # Fallback/Warning if env is missing
    print("WARNING: MONGO_URL not found. Database features will fail.")
    mongo_url = "mongodb://localhost:27017" # Default fallback

client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- MODELS ---

# 1. Status Check
class StatusCheck(BaseModel):
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# 2. Newsletter
class NewsletterCreate(BaseModel):
    email: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# 3. Contact Form
class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# 4. Orders (Keeping this so Checkout doesn't break!)
class ShippingInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    zip: str
    country: str

class PaymentInfo(BaseModel):
    cardName: str
    last4: str

class OrderItem(BaseModel):
    id: str | int
    name: str
    price: float
    quantity: int
    selectedSize: Optional[str] = None
    selectedColor: Optional[str] = None
    image: Optional[str] = None

class OrderCreate(BaseModel):
    shipping_info: ShippingInfo
    payment_info: PaymentInfo
    items: List[OrderItem]
    subtotal: float
    shipping_cost: float
    tax: float
    total: float
    order_id: str = Field(default_factory=lambda: f"LX{uuid.uuid4().hex[:8].upper()}")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --- ROUTES ---

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Status Route
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

# Newsletter Route
@api_router.post("/newsletter")
async def subscribe_newsletter(sub: NewsletterCreate):
    # Check if already subscribed to avoid duplicates
    existing = await db.newsletter.find_one({"email": sub.email})
    if existing:
        return {"message": "Already subscribed"}
    
    doc = sub.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.newsletter.insert_one(doc)
    return {"message": "Subscribed successfully"}

# Contact Route
@api_router.post("/contact")
async def send_contact_message(contact: ContactCreate):
    doc = contact.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_messages.insert_one(doc)
    return {"message": "Message received"}

# Order Route
@api_router.post("/orders")
async def create_order(order: OrderCreate):
    try:
        order_doc = order.model_dump()
        order_doc['timestamp'] = order_doc['timestamp'].isoformat()
        await db.orders.insert_one(order_doc)
        return {"message": "Order placed successfully", "order_id": order.order_id}
    except Exception as e:
        logging.error(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail="Failed to create order")

app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)