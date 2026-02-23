import { Link } from "react-router";
import { Coffee, ArrowRight, ShieldCheck, Globe, Leaf, Star } from "lucide-react";
import { motion } from "motion/react";
import { KENYAN_COFFEES } from "../data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const featured = KENYAN_COFFEES.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1633627354173-1a26871e3204"
            alt="Kenyan coffee farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <span className="inline-block px-3 py-1 bg-amber-600/20 text-amber-500 rounded-full text-sm font-semibold tracking-wider uppercase border border-amber-600/30">
              Direct Trade from Kenya
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1]">
              Finest Beans <br /> <span className="text-amber-500">From the High Peaks</span>
            </h1>
            <p className="text-xl text-amber-50/90 leading-relaxed max-w-xl">
              Experience the distinct bright acidity and deep berry notes of specialty Kenyan coffee, sourced directly from smallholder farms in Nyeri and Kirinyaga.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/shop"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Shop the Collection</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/shop"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all flex items-center space-x-2"
              >
                <span>Discover the Origin</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Globe className="text-amber-700" size={32} />,
                title: "Global Shipping",
                desc: "We ship our premium beans from Nairobi to coffee lovers worldwide with priority express."
              },
              {
                icon: <ShieldCheck className="text-amber-700" size={32} />,
                title: "Quality Guaranteed",
                desc: "Every batch is cupped and graded by Q-Graders to ensure it meets specialty standards."
              },
              {
                icon: <Leaf className="text-amber-700" size={32} />,
                title: "Sustainable Trade",
                desc: "We pay above Fairtrade prices directly to cooperatives, supporting local communities."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center space-y-4 p-8 bg-white rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-amber-100/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-amber-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-amber-900">Current Arrivals</h2>
              <p className="text-lg text-gray-500 max-w-xl">Freshly harvested crops from the central highlands, roasted to highlight their unique volcanic soil profile.</p>
            </div>
            <Link to="/shop" className="text-amber-700 font-bold flex items-center space-x-2 hover:underline decoration-2 underline-offset-4 group">
              <span>View all coffee</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-800 shadow-sm border border-amber-100">
                      {product.roastLevel} Roast
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">{product.region}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-amber-500 text-amber-500" />)}
                    <span className="text-xs text-gray-400 font-medium ml-2">(48 Reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.notes.map((note) => (
                      <span key={note} className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded text-gray-500 uppercase tracking-tighter">
                        {note}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-amber-900">${product.price.toFixed(2)}</span>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-amber-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1550825488-17306e3f30c2"
                  alt="Kenyan coffee harvesting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden border-8 border-stone-900 shadow-2xl hidden md:block">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1607945610157-80d15752e761"
                  alt="Brewing coffee"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Our Roots</span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">The Journey from <br /> Kenya to the World</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                Founded in Nairobi, our mission started with a simple question: Why do the best beans often never reach the person who cares most?
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                We work directly with 12 cooperatives across Mount Kenya region. By cutting out middle-men, we ensure that farmers receive 35% higher income than traditional auction systems, while you get the freshest roast possible.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <div className="text-3xl font-black text-amber-500 mb-1">12+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Partner Farms</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-amber-500 mb-1">85+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Cup Scores</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Ready for the perfect cup?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">
            Join 10,000+ coffee enthusiasts who start their day with authentic Kenyan beans.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white hover:bg-gray-100 text-amber-900 px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
}
