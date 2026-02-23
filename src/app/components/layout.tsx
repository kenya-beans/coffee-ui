import { Outlet, Link, NavLink, useLocation, useNavigate } from "react-router";
import { Coffee, ShoppingBag, Truck, LayoutDashboard, Menu, X, Instagram, Facebook, Twitter, User, LogOut, ChevronDown, Package, Users, BarChart3, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";

export function Layout() {
  const { cart, role, setRole } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsLoginMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLoginMenu = () => setIsLoginMenuOpen(!isLoginMenuOpen);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const customerNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Order', path: '/track-order' },
  ];

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Inventory', path: '/admin', query: 'inventory', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin', query: 'orders', icon: <ShoppingBag size={20} /> },
    { name: 'Customers', path: '/admin', icon: <Users size={20} /> },
    { name: 'Reports', path: '/admin', icon: <BarChart3 size={20} /> },
  ];

  if (role === 'admin') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Admin Sidebar */}
        <aside className="w-72 bg-amber-950 text-white flex flex-col fixed h-full z-50">
          <div className="p-8 border-b border-amber-900/50 flex items-center space-x-3">
             <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
                <Coffee size={24} />
             </div>
             <div>
                <div className="text-xl font-black tracking-tight leading-none">KENYAN BEANS</div>
                <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">Admin Central</div>
             </div>
          </div>

          <nav className="flex-grow p-6 space-y-2">
             {adminNavLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(link.path)}
                  className="flex items-center space-x-4 w-full px-4 py-4 rounded-2xl text-amber-200/60 hover:text-white hover:bg-amber-900/50 transition-all font-bold group"
                >
                  <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span>{link.name}</span>
                </button>
             ))}
          </nav>

          <div className="p-6 mt-auto border-t border-amber-900/50">
             <button
                onClick={() => {
                  setRole('customer');
                  navigate('/');
                }}
                className="flex items-center space-x-4 w-full px-4 py-4 rounded-2xl bg-amber-900/50 text-white font-black hover:bg-amber-600 transition-all"
             >
                <LogOut size={20} />
                <span>Exit Admin Mode</span>
             </button>
          </div>
        </aside>

        {/* Admin Main Content */}
        <main className="flex-grow ml-72">
          <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-40">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                   <Settings size={24} />
                </div>
                <h2 className="text-lg font-black text-amber-950 uppercase tracking-widest">System Settings</h2>
             </div>
             <div className="flex items-center space-x-6">
                <div className="text-right hidden sm:block">
                   <div className="text-sm font-black text-amber-950">Master Admin</div>
                   <div className="text-xs font-bold text-emerald-500">Live Server • Nairobi Hub</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900 border-2 border-white shadow-sm overflow-hidden">
                   <User size={24} />
                </div>
             </div>
          </header>
          <div className="p-12">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center text-white">
                <Coffee size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-amber-900">KENYAN BEANS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {customerNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-amber-700 ${
                      isActive ? "text-amber-800 border-b-2 border-amber-800 py-1" : "text-gray-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={toggleLoginMenu}
                  className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-2xl transition-all border border-gray-100 group"
                >
                  <User size={20} className="text-gray-400 group-hover:text-amber-800" />
                  <span className="text-sm font-black text-amber-950">Account</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isLoginMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLoginMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden z-50 p-2"
                    >
                      <button
                        onClick={() => {
                          setRole('customer');
                          setIsLoginMenuOpen(false);
                          navigate('/');
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${role === 'customer' ? 'bg-amber-50 text-amber-900' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        <User size={18} />
                        <span className="font-bold">Customer Portal</span>
                        {role === 'customer' && <div className="ml-auto w-2 h-2 rounded-full bg-amber-600" />}
                      </button>
                      <button
                        onClick={() => {
                          setRole('admin');
                          setIsLoginMenuOpen(false);
                          navigate('/admin');
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${role === 'admin' ? 'bg-amber-50 text-amber-900' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        <LayoutDashboard size={18} />
                        <span className="font-bold">Admin Central</span>
                        {role === 'admin' && <div className="ml-auto w-2 h-2 rounded-full bg-amber-600" />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-amber-800 transition-colors">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-black leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-amber-600 rounded-full shadow-lg border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-500 hover:text-amber-800 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {customerNavLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-3 py-4 text-base font-medium rounded-md ${
                        isActive ? "bg-amber-50 text-amber-900" : "text-gray-600 hover:bg-gray-50 hover:text-amber-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white">
                  <Coffee size={18} />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">KENYAN BEANS</span>
              </Link>
              <p className="text-amber-200/80 leading-relaxed">
                Directly sourcing the finest specialty coffee from Kenyan hills to your doorstep. Promoting sustainable trade and fair wages.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amber-400 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-amber-400 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-amber-400 transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Shop</h3>
              <ul className="space-y-4 text-amber-200/80">
                <li><Link to="/shop" className="hover:text-white transition-colors">Light Roasts</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Medium Roasts</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Dark Roasts</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Special Reserve</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <ul className="space-y-4 text-amber-200/80">
                <li><Link to="/track-order" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Newsletter</h3>
              <p className="text-amber-200/80 mb-4 text-sm">Join our brewing community for updates on new arrivals and farm stories.</p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-amber-900/50 border border-amber-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 text-white placeholder:text-amber-700"
                />
                <button className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-amber-900/50 text-center text-amber-200/40 text-sm">
            <p>&copy; 2026 Kenyan Beans Coffee Trading Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
