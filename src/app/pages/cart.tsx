import { Link } from "react-router";
import { Coffee, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { KENYAN_COFFEES } from "../data";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";

export function Cart() {
  const { cart: items, updateQuantity, removeFromCart } = useApp();

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 12.00 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4 text-center">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-900 shadow-sm border border-amber-100">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-amber-950">Your basket is empty</h2>
          <p className="text-lg text-gray-500 max-w-sm mx-auto">It seems you haven't added any specialty Kenyan beans to your collection yet.</p>
        </div>
        <Link to="/shop" className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-amber-600/20">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
          <Link to="/shop" className="p-3 bg-white rounded-full text-gray-400 hover:text-amber-800 transition-colors shadow-sm border border-gray-100">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-amber-950">Brewing Basket</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.bagSize}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 relative group"
                >
                  <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-grow space-y-2 text-center md:text-left">
                    <div className="text-xs font-black text-amber-600 uppercase tracking-widest">{item.region}</div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded w-fit mx-auto md:mx-0">
                      {item.bagSize} • {item.roastLevel} Roast
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-end space-y-4">
                    <div className="text-2xl font-black text-amber-950">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="flex items-center bg-gray-50 rounded-full px-3 py-1 w-fit border border-gray-100">
                      <button
                        onClick={() => updateQuantity(item.id, item.bagSize, -1)}
                        className="p-1 text-gray-400 hover:text-amber-800 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-black text-amber-950">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.bagSize, 1)}
                        className="p-1 text-gray-400 hover:text-amber-800 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.bagSize)}
                    className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-amber-950 text-amber-50 p-8 rounded-3xl shadow-2xl space-y-8">
              <h3 className="text-2xl font-black border-b border-amber-900 pb-6">Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-amber-200/60 font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-200/60 font-medium">
                  <span>Standard Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-200/60 font-medium">
                  <span>Estimated Tax</span>
                  <span>$0.00</span>
                </div>
              </div>
              <div className="pt-6 border-t border-amber-900">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-xl font-bold">Total Due</span>
                  <span className="text-4xl font-black text-amber-400">${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-amber-900/50 flex items-center justify-center space-x-3"
                >
                  <CreditCard size={24} />
                  <span>Secure Checkout</span>
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-amber-950 mb-1">Fast Global Delivery</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">Direct from Nairobi to your door in 3-5 business days via DHL Express.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-amber-950 mb-1">Quality Guaranteed</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">If you're not satisfied with the roast profile, we offer a full replacement or refund.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
