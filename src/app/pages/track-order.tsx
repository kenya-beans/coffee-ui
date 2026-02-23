import { useState } from "react";
import { Search, Truck, Package, CheckCircle2, MapPin, Calendar, Clock, ArrowRight, Coffee } from "lucide-react";
import { motion } from "motion/react";

export function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking data
    setTrackingData({
      id: orderId || "ORD-KB-8829",
      status: "In Transit",
      estimatedDelivery: "Feb 25, 2026",
      currentLocation: "Nairobi International Airport (NBO)",
      history: [
        { status: "Package picked up", location: "Nyeri Processing Station", time: "Feb 20, 2026 09:15 AM", completed: true },
        { status: "Arrived at Export Hub", location: "Nairobi, KE", time: "Feb 20, 2026 02:30 PM", completed: true },
        { status: "Cleared Customs", location: "Nairobi, KE", time: "Feb 20, 2026 05:45 PM", completed: true },
        { status: "In Transit to Destination", location: "Nairobi Airport", time: "Feb 21, 2026 01:20 AM", completed: false },
      ]
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-900 mx-auto mb-6 shadow-sm border border-amber-100">
            <Truck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-amber-950">Track Your Coffee Journey</h1>
          <p className="text-lg text-gray-500 font-medium max-w-lg mx-auto">
            See exactly where your specialty beans are on their way from the Kenyan highlands to your cup.
          </p>
        </div>

        <form onSubmit={handleTrack} className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                required
                type="text"
                placeholder="Enter Order Number (e.g. ORD-KB-8829)"
                className="w-full pl-16 pr-8 py-5 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-lg font-medium transition-all"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-amber-600/20 flex items-center justify-center space-x-3 whitespace-nowrap"
            >
              <span>Track Order</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </form>

        {trackingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Status Card */}
            <div className="bg-amber-950 text-amber-50 p-8 md:p-12 rounded-[40px] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-10 -translate-y-10 scale-150">
                <Coffee size={200} />
              </div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="text-xs font-black text-amber-500 uppercase tracking-widest">Order Status</div>
                  <div className="text-3xl font-black">{trackingData.status}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-black text-amber-500 uppercase tracking-widest">Estimated Arrival</div>
                  <div className="text-3xl font-black">{trackingData.estimatedDelivery}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-black text-amber-500 uppercase tracking-widest">Current Location</div>
                  <div className="text-lg font-bold text-amber-200/80 leading-tight">{trackingData.currentLocation}</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black text-amber-950 mb-12 uppercase tracking-widest border-b border-gray-50 pb-6">Shipment Progress</h3>
              <div className="space-y-12">
                {trackingData.history.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-8 relative">
                    {idx !== trackingData.history.length - 1 && (
                      <div className={`absolute left-5 top-10 bottom-0 w-1 ${step.completed ? 'bg-amber-600' : 'bg-gray-100 border-l-2 border-dashed border-gray-200'}`} />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${step.completed ? 'bg-amber-600 text-white' : 'bg-white border-4 border-gray-100 text-gray-300'}`}>
                      {step.completed ? <CheckCircle2 size={20} /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                    </div>
                    <div className="flex-grow pb-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className={`text-xl font-black ${step.completed ? 'text-amber-950' : 'text-gray-400'}`}>{step.status}</h4>
                        <div className="flex items-center space-x-4 text-sm font-bold text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{step.time.split(' ')[0]} {step.time.split(' ')[1]}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{step.time.split(' ')[2]} {step.time.split(' ')[3]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 font-medium">
                        <MapPin size={16} />
                        <span>{step.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
                    <Package size={24} />
                  </div>
                  <p className="text-amber-950 font-bold max-w-sm">Need help with your delivery? Our support team in Nairobi is available 24/7.</p>
               </div>
               <button className="bg-amber-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
                  Contact Support
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
