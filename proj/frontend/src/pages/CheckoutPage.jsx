import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, Package, ChevronLeft, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Determine API URL (Make sure your .env has REACT_APP_API_URL)
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

  // Form State
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

  // Validation Errors State
  const [errors, setErrors] = useState({});

  const subtotal = getSubtotal();
  const shipping = subtotal >= 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // --- Validation Logic ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+?[\d\s-]{10,}$/.test(phone);
  const validateCard = (num) => /^\d{16}$/.test(num.replace(/\s/g, ''));
  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);
  const validateExpiry = (exp) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);

  const validateStep1 = () => {
    const newErrors = {};
    if (!shippingInfo.firstName) newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName) newErrors.lastName = "Last name is required";
    if (!shippingInfo.address) newErrors.address = "Address is required";
    if (!shippingInfo.city) newErrors.city = "City is required";
    if (!shippingInfo.state) newErrors.state = "State is required";
    if (!shippingInfo.zip) newErrors.zip = "ZIP code is required";
    
    if (!shippingInfo.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(shippingInfo.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!shippingInfo.phone) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(shippingInfo.phone)) {
      newErrors.phone = "Invalid phone format (min 10 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!paymentInfo.cardName) newErrors.cardName = "Name on card is required";
    
    if (!paymentInfo.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!validateCard(paymentInfo.cardNumber)) {
      newErrors.cardNumber = "Invalid card number (must be 16 digits)";
    }

    if (!paymentInfo.expiry) {
      newErrors.expiry = "Expiry is required";
    } else if (!validateExpiry(paymentInfo.expiry)) {
      newErrors.expiry = "Invalid format (MM/YY)";
    }

    if (!paymentInfo.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!validateCVV(paymentInfo.cvv)) {
      newErrors.cvv = "Invalid CVV (3 or 4 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handlers ---

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleShippingChange = (field, value) => {
    setShippingInfo({ ...shippingInfo, [field]: value });
    // Clear error when user types
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handlePaymentChange = (field, value) => {
    let formattedValue = value;
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    }
    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
    }
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    setPaymentInfo({ ...paymentInfo, [field]: formattedValue });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const orderPayload = {
      shipping_info: shippingInfo,
      payment_info: {
        cardName: paymentInfo.cardName,
        last4: paymentInfo.cardNumber.replace(/\s/g, '').slice(-4) || "0000"
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
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.order_id);
        setIsComplete(true);
        clearCart();
      } else {
        alert("Failed to place order: " + (data.detail || "Unknown error"));
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Could not connect to the server.");
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
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="John"
                      />
                      {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white/70">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleShippingChange('lastName', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
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
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white/70">Phone</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white/70">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.address ? 'border-red-500' : ''}`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white/70">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.city ? 'border-red-500' : ''}`}
                        placeholder="New York"
                      />
                      {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-white/70">State</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleShippingChange('state', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.state ? 'border-red-500' : ''}`}
                        placeholder="NY"
                      />
                      {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-white/70">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={shippingInfo.zip}
                        onChange={(e) => handleShippingChange('zip', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.zip ? 'border-red-500' : ''}`}
                        placeholder="10001"
                      />
                      {errors.zip && <span className="text-red-500 text-sm">{errors.zip}</span>}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
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
                      className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.cardNumber ? 'border-red-500' : ''}`}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                    {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-white/70">Name on Card</Label>
                    <Input
                      id="cardName"
                      value={paymentInfo.cardName}
                      onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                      className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.cardName ? 'border-red-500' : ''}`}
                      placeholder="JOHN DOE"
                    />
                    {errors.cardName && <span className="text-red-500 text-sm">{errors.cardName}</span>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-white/70">Expiry Date</Label>
                      <Input
                        id="expiry"
                        value={paymentInfo.expiry}
                        onChange={(e) => handlePaymentChange('expiry', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.expiry ? 'border-red-500' : ''}`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiry && <span className="text-red-500 text-sm">{errors.expiry}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-white/70">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        className={`bg-white/5 border-white/10 text-white focus:border-amber-400 ${errors.cvv ? 'border-red-500' : ''}`}
                        placeholder="•••"
                        maxLength={4}
                      />
                      {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv}</span>}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-4 bg-white/10 text-white font-medium rounded-full flex items-center justify-center gap-2"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                      className="flex-1 py-4 bg-amber-400 text-black font-medium rounded-full flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
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
                      •••• •••• •••• {paymentInfo.cardNumber.replace(/\s/g, '').slice(-4)}
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

                  <div className="flex gap-4 mt-8">
                     <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep(2)}
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-white/10 text-white font-medium rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="flex-[2] py-4 bg-amber-400 text-black font-medium rounded-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  </div>
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