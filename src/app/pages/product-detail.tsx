import { useParams, Link } from "react-router";
import { Coffee, ChevronLeft, Plus, Minus, Star, ShieldCheck, Truck, Recycle, Leaf, ArrowRight } from "lucide-react";
import { KENYAN_COFFEES } from "../data";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useApp();
  const product = KENYAN_COFFEES.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [bagSize, setBagSize] = useState("250g");

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
        <Link to="/shop" className="text-amber-700 font-bold flex items-center space-x-2">
          <ChevronLeft size={20} />
          <span>Back to Shop</span>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, bagSize);
    toast.success(`${product.name} added to cart!`, {
      description: `${quantity} x ${bagSize} bag(s) of ${product.roastLevel} roast.`,
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <nav className="flex items-center space-x-2 text-sm font-bold text-gray-500 mb-12">
          <Link to="/" className="hover:text-amber-800 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-amber-800 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-amber-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Product Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-2xl"
            >
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${i === 1 ? 'border-amber-600' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                   <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Direct Trade
                </span>
                <span className="text-sm font-bold text-gray-400">SKU: KEN-PPR-{product.id.substring(0,4).toUpperCase()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} className="fill-current" />)}
                </div>
                <span className="text-sm font-bold text-gray-500">4.9 / 5.0 (124 reviews)</span>
              </div>
              <div className="text-4xl font-black text-amber-950">${product.price.toFixed(2)}</div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Brewing Notes Card */}
            <div className="p-8 bg-amber-50 rounded-3xl grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">Process</div>
                <div className="text-lg font-black text-amber-950">{product.process}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">Elevation</div>
                <div className="text-lg font-black text-amber-950">{product.elevation}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">Region</div>
                <div className="text-lg font-black text-amber-950">{product.region}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">Cup Profile</div>
                <div className="flex flex-wrap gap-1">
                  {product.notes.map(n => <span key={n} className="text-xs font-black text-gray-600 bg-white px-2 py-1 rounded-md">{n}</span>)}
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-sm font-black text-gray-900 uppercase tracking-widest">Bag Size</div>
                <div className="flex flex-wrap gap-4">
                  {["250g", "500g", "1kg"].map(size => (
                    <button
                      key={size}
                      onClick={() => setBagSize(size)}
                      className={`px-8 py-3 rounded-xl font-bold transition-all border-2 ${
                        bagSize === size
                          ? "bg-amber-950 border-amber-950 text-white shadow-lg"
                          : "bg-white border-gray-100 text-gray-500 hover:border-amber-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-500 hover:text-amber-800 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center text-xl font-black text-amber-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-500 hover:text-amber-800 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl shadow-amber-600/20 flex items-center justify-center space-x-3"
                >
                  <Coffee size={24} />
                  <span>Add to Brewing Basket</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-100">
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheck className="text-amber-600" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lab Tested</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck className="text-amber-600" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Express</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Recycle className="text-amber-600" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eco Packaging</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Leaf className="text-amber-600" size={24} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">100% Organic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Section */}
        <section className="mt-32 pt-24 border-t border-gray-100">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-amber-950 leading-tight">You Might Also Like <br /> <span className="text-amber-600">Other Kenyan Regions</span></h2>
            <Link to="/shop" className="text-amber-700 font-bold flex items-center space-x-2 group">
              <span>See more beans</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {KENYAN_COFFEES.filter(p => p.id !== id).slice(0, 3).map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group space-y-4">
                 <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50">
                   <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                 </div>
                 <div className="flex justify-between items-center">
                   <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-800 transition-colors">{product.name}</h3>
                   <span className="text-amber-950 font-black">${product.price.toFixed(2)}</span>
                 </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
