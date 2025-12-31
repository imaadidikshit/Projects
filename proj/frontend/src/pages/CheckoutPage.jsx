import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, Package, ChevronLeft, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { colors as colorData } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Determine API URL based on environment
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Package },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (field, value) => {
    setShippingInfo({ ...shippingInfo, [field]: value });
  };

  const handlePaymentChange = (field, value) => {
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    }
    if (field === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    if (field === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    setPaymentInfo({ ...paymentInfo, [field]: value });
  };
  console.log("DEBUG: My Backend URL is:", API_URL);
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    // 1. Prepare Payload
    const orderPayload = {
      shipping_info: shippingInfo,
      payment_info: {
        cardName: paymentInfo.cardName,
        last4: paymentInfo.cardNumber.slice(-4) || "0000"
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize || null,
        selectedColor: item.selectedColor || null,
        image: item.images?.[0] || null
      })),
      subtotal: subtotal,
      shipping_cost: shipping,
      tax: tax,
      total: total
    };

    try {
      // 2. Send to Backend
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Success
        setOrderId(data.order_id);
        setIsComplete(true);
        clearCart();
      } else {
        alert("Failed to place order: " + (data.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Could not connect to the server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isComplete) {
    navigate('/cart');
    return null;
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-black pt-32 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-8 flex items-center justify-center"
          >
            <Check size={48} className="text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">Order Confirmed!</h1>
          <p className="text-white/60 mb-2">Thank you for your purchase.</p>
          <p className="text-white/60 mb-8">Order #{orderId}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="px-8 py-4 bg-amber-400 text-black font-medium rounded-full"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/cart')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          {currentStep > 1 ? 'Back' : 'Return to Cart'}
        </motion.button>

        {/* Steps Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-12"
        >
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  currentStep >= step.id
                    ? 'bg-amber-400 text-black'
                    : 'bg-white/10 text-white/40'
                }`}>
                  {currentStep > step.id ? (
                    <Check size={20} />
                  ) : (
                    <step.icon size={20} />
                  )}
                </div>
                <span className={`mt-2 text-sm transition-colors ${
                  currentStep >= step.id ? 'text-white' : 'text-white/40'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 md:w-32 h-0.5 mx-4 transition-colors ${
                  currentStep > step.id ? 'bg-amber-400' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-serif text-white mb-6">Shipping Information</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white/70">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleShippingChange('firstName', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white/70">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleShippingChange('lastName', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/70">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white/70">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white/70">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white/70">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-white/70">State</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleShippingChange('state', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-white/70">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={shippingInfo.zip}
                        onChange={(e) => handleShippingChange('zip', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-4 bg-amber-400 text-black font-medium rounded-full mt-8 flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-serif text-white mb-6">Payment Information</h2>

                  <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-lg flex items-center gap-3">
                    <Lock className="text-amber-400" size={20} />
                    <span className="text-amber-400 text-sm">Your payment information is encrypted and secure</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-white/70">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-white/70">Name on Card</Label>
                    <Input
                      id="cardName"
                      value={paymentInfo.cardName}
                      onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                      placeholder="JOHN DOE"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-white/70">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={paymentInfo.expiry}
                        onChange={(e) => handlePaymentChange('expiry', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-white/70">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        className="bg-white/5 border-white/10 text-white focus:border-amber-400"
                        placeholder="•••"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-4 bg-amber-400 text-black font-medium rounded-full mt-8 flex items-center justify-center gap-2"
                  >
                    Review Order
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )}

              {/* Review Step */}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-serif text-white mb-6">Review Your Order</h2>

                  {/* Shipping Summary */}
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-3">Shipping Address</h3>
                    <p className="text-white/70">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                      {shippingInfo.country}
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-3">Payment Method</h3>
                    <p className="text-white/70 flex items-center gap-2">
                      <CreditCard size={18} />
                      •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.cartId} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white">{item.name}</p>
                            <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-amber-400">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-amber-400 text-black font-medium rounded-full mt-8 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order - ${total.toLocaleString()}
                        <Check size={18} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 lg:h-fit"
          >
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-serif text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-serif text-white pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-amber-400">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}