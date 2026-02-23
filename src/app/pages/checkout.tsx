import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Coffee, ChevronLeft, CreditCard, Truck, ShieldCheck, ShoppingBag, CheckCircle, ArrowRight, Home } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export function Checkout() {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    toast.success("Order Placed Successfully!");
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-xl shadow-green-200/50"
        >
          <CheckCircle size={64} />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-amber-950">Thank you for your order!</h2>
          <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            Your specialty beans are being prepared at our Nairobi roasting facility. Order number: <span className="font-black text-amber-800">#ORD-KB-8829</span>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/track-order"
            className="bg-amber-950 hover:bg-black text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-amber-950/20 flex items-center justify-center space-x-3"
          >
            <Truck size={24} />
            <span>Track My Order</span>
          </Link>
          <Link
            to="/"
            className="bg-white border-2 border-gray-100 hover:border-amber-200 text-gray-900 px-10 py-5 rounded-full font-black text-lg transition-all flex items-center justify-center space-x-3"
          >
            <Home size={24} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Link to="/cart" className="p-3 bg-white rounded-full text-gray-400 hover:text-amber-800 transition-colors shadow-sm border border-gray-100">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-amber-950">Secure Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-10">
            {/* Shipping Info */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-50">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-900">
                  <Truck size={24} />
                </div>
                <h3 className="text-2xl font-black text-amber-950 uppercase tracking-widest">Shipping Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-amber-600 uppercase tracking-widest">First Name</label>
                  <input required type="text" placeholder="John" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-amber-600 uppercase tracking-widest">Last Name</label>
                  <input required type="text" placeholder="Doe" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-amber-600 uppercase tracking-widest">Address Line 1</label>
                  <input required type="text" placeholder="Street Address" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-amber-600 uppercase tracking-widest">City</label>
                  <input required type="text" placeholder="Nairobi" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-amber-600 uppercase tracking-widest">Country</label>
                  <select required className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all appearance-none cursor-pointer">
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="KE">Kenya</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-50">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-900">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-2xl font-black text-amber-950 uppercase tracking-widest">Payment Method</h3>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-amber-600 uppercase tracking-widest">Card Number</label>
                  <div className="relative">
                     <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                     <div className="absolute right-6 top-1/2 -translate-y-1/2 flex space-x-2">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <div className="w-8 h-5 bg-red-500 rounded"></div>
                     </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-amber-600 uppercase tracking-widest">Expiry Date</label>
                    <input required type="text" placeholder="MM/YY" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-amber-600 uppercase tracking-widest">CVC</label>
                    <input required type="text" placeholder="123" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 space-y-8">
             <div className="bg-amber-950 text-amber-50 p-8 rounded-[40px] shadow-2xl space-y-8">
              <h3 className="text-2xl font-black border-b border-amber-900 pb-6 uppercase tracking-widest">Order Total</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <span className="text-amber-200/60 font-medium uppercase tracking-tighter text-sm">Subtotal</span>
                   <span className="text-xl font-bold font-mono">$76.00</span>
                </div>
                <div className="flex justify-between items-end">
                   <span className="text-amber-200/60 font-medium uppercase tracking-tighter text-sm">Priority Shipping</span>
                   <span className="text-xl font-bold font-mono">$12.00</span>
                </div>
                <div className="pt-6 border-t border-amber-900">
                  <div className="flex justify-between items-end mb-10">
                    <span className="text-xl font-bold uppercase tracking-widest">Total</span>
                    <span className="text-4xl font-black text-amber-400 font-mono">$88.00</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-6 rounded-2xl font-black text-xl transition-all shadow-xl shadow-amber-900/50 flex items-center justify-center space-x-3 group"
                  >
                    <span>Confirm Order</span>
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
               <div className="flex items-center space-x-3 text-gray-500 mb-6">
                  <ShieldCheck size={20} className="text-amber-600" />
                  <span className="text-sm font-bold uppercase tracking-widest">Safe & Encrypted</span>
               </div>
               <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
               </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
