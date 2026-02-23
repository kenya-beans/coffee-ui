import { useState } from "react";
import { Coffee, Package, ShoppingBag, Users, TrendingUp, Search, Plus, MoreVertical, Edit2, Trash2, CheckCircle, Clock, AlertCircle, TrendingDown, Layers, BarChart3, Globe, Truck } from "lucide-react";
import { KENYAN_COFFEES, MOCK_ORDERS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
// If the image is in a standard assets folder:
import inStockBadge from "../../assets/c25d50b3fb82652a9a117d6b324f6ced30fce4f6.png";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders'>('overview');
  const [search, setSearch] = useState("");

  const stats = [
    { label: 'Total Revenue', value: '$24,450.80', trend: '+12.5%', icon: <TrendingUp size={20} />, color: 'bg-emerald-500' },
    { label: 'Total Orders', value: '452', trend: '+8.1%', icon: <ShoppingBag size={20} />, color: 'bg-blue-500' },
    { label: 'Coffee Inventory', value: '1,240kg', trend: '-2.4%', icon: <Layers size={20} />, color: 'bg-amber-600' },
    { label: 'Avg Order Value', value: '$54.10', trend: '+4.3%', icon: <BarChart3 size={20} />, color: 'bg-purple-500' },
  ];

  const chartData = [
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 5000, orders: 32 },
    { name: 'Thu', sales: 4500, orders: 28 },
    { name: 'Fri', sales: 6000, orders: 45 },
    { name: 'Sat', sales: 7000, orders: 58 },
    { name: 'Sun', sales: 5500, orders: 38 },
  ];

  const handleUpdateStatus = (id: string, newStatus: string) => {
    toast.success(`Order ${id} status updated to ${newStatus}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-amber-950">Management Dashboard</h1>
            <p className="text-lg text-gray-500 font-medium italic">Empowering Kenyan farmers through direct-to-consumer trade.</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 self-start md:self-center">
            {(['overview', 'inventory', 'orders'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-amber-900 text-white shadow-lg"
                    : "text-gray-400 hover:text-amber-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-between h-48 group hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start">
                      <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg`}>
                        {stat.icon}
                      </div>
                      <span className={`text-xs font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-amber-950 mb-1">{stat.value}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 min-w-0">
                   <div className="flex items-center justify-between mb-12">
                      <h3 className="text-2xl font-black text-amber-950 uppercase tracking-widest">Revenue Growth</h3>
                      <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
                        <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                        <span>Weekly Sales</span>
                      </div>
                   </div>
                   <div className="h-80 w-full relative overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d97706" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dx={-10} />
                        <Tooltip
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '16px' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#d97706" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                   </div>
                </div>

                <div className="bg-amber-950 text-amber-50 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                   <div className="relative z-10 space-y-12 h-full flex flex-col justify-between">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-black uppercase tracking-widest border-b border-amber-900 pb-6">Global Reach</h3>
                        <p className="text-amber-200/60 leading-relaxed font-medium">Direct shipments currently active to 14 countries this month.</p>
                      </div>
                      <div className="space-y-8">
                        {[
                          { country: 'USA', perc: 45 },
                          { country: 'Germany', perc: 28 },
                          { country: 'Japan', perc: 15 },
                          { country: 'UK', perc: 12 },
                        ].map((c) => (
                          <div key={c.country} className="space-y-2">
                             <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                               <span>{c.country}</span>
                               <span className="text-amber-500">{c.perc}%</span>
                             </div>
                             <div className="h-2 bg-amber-900/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${c.perc}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-amber-500 rounded-full"
                                />
                             </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-white text-amber-950 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-amber-100 transition-all flex items-center justify-center space-x-2">
                        <Globe size={18} />
                        <span>Export Report</span>
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      className="w-full pl-16 pr-8 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-bold transition-all"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-amber-600/20 flex items-center justify-center space-x-3">
                    <Plus size={24} />
                    <span>Add New Batch</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest">
                        <th className="px-6 py-6">Coffee Variety</th>
                        <th className="px-6 py-6">Region</th>
                        <th className="px-6 py-6">Stock Level</th>
                        <th className="px-6 py-6">Price</th>
                        <th className="px-6 py-6">Status</th>
                        <th className="px-6 py-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {KENYAN_COFFEES.map((coffee) => (
                        <tr key={coffee.id} className="group hover:bg-amber-50/30 transition-colors">
                          <td className="px-6 py-8">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <ImageWithFallback src={coffee.image} alt={coffee.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="text-lg font-black text-amber-950">{coffee.name}</div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{coffee.process} Process</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-8 font-bold text-gray-600">{coffee.region}</td>
                          <td className="px-6 py-8">
                             <div className="flex items-center space-x-3">
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                   <div className={`h-full rounded-full ${coffee.stock < 20 ? 'bg-rose-500' : 'bg-amber-600'}`} style={{ width: `${(coffee.stock / 60) * 100}%` }}></div>
                                </div>
                                <span className="text-sm font-black text-amber-950">{coffee.stock} units</span>
                             </div>
                          </td>
                          <td className="px-6 py-8 font-black text-amber-950">${coffee.price.toFixed(2)}</td>
                          <td className="px-6 py-8">
                             {coffee.stock > 0 ? (
                               <div className="w-24 h-12 flex items-center justify-center overflow-hidden">
                                  <ImageWithFallback src={inStockBadge} alt="In Stock" className="w-full h-full object-contain" />
                               </div>
                             ) : (
                               <span className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-rose-100 text-rose-700">
                                 Sold Out
                               </span>
                             )}
                          </td>
                          <td className="px-6 py-8">
                            <div className="flex items-center space-x-2">
                              <button className="p-3 bg-gray-50 text-gray-400 hover:text-amber-800 rounded-xl transition-colors">
                                <Edit2 size={18} />
                              </button>
                              <button className="p-3 bg-gray-50 text-gray-400 hover:text-rose-500 rounded-xl transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
                 <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest">
                        <th className="px-6 py-6">Order ID</th>
                        <th className="px-6 py-6">Customer</th>
                        <th className="px-6 py-6">Date</th>
                        <th className="px-6 py-6">Amount</th>
                        <th className="px-6 py-6">Status</th>
                        <th className="px-6 py-6">Manage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MOCK_ORDERS.map((order) => (
                        <tr key={order.id} className="group hover:bg-amber-50/30 transition-colors">
                          <td className="px-6 py-8 font-black text-amber-900">{order.id}</td>
                          <td className="px-6 py-8 font-bold text-gray-900">{order.customer}</td>
                          <td className="px-6 py-8 font-medium text-gray-400">{order.date}</td>
                          <td className="px-6 py-8 font-black text-amber-950">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-8">
                             <span className={`flex items-center space-x-2 w-fit px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                               order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                               order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                               order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                             }`}>
                               {order.status === 'Shipped' && <Truck size={14} />}
                               {order.status === 'Delivered' && <CheckCircle size={14} />}
                               {order.status === 'Pending' && <Clock size={14} />}
                               <span>{order.status}</span>
                             </span>
                          </td>
                          <td className="px-6 py-8">
                             <select
                               className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-900 focus:ring-2 focus:ring-amber-500/20 cursor-pointer transition-all"
                               onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                               defaultValue={order.status}
                             >
                               <option value="Pending">Pending</option>
                               <option value="Shipped">Shipped</option>
                               <option value="Delivered">Delivered</option>
                               <option value="Cancelled">Cancelled</option>
                             </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
