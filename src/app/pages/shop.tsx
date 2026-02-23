import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, SlidersHorizontal, Grid, List, Check, Star, Coffee } from "lucide-react";
import { KENYAN_COFFEES, CoffeeProduct } from "../data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

export function Shop() {
  const [search, setSearch] = useState("");
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const regions = useMemo(() => Array.from(new Set(KENYAN_COFFEES.map(c => c.region))), []);
  const roasts = ["Light", "Medium", "Dark"];

  const filteredProducts = useMemo(() => {
    return KENYAN_COFFEES.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.region.toLowerCase().includes(search.toLowerCase());
      const matchesRoast = !selectedRoast || p.roastLevel === selectedRoast;
      const matchesRegion = !selectedRegion || p.region === selectedRegion;
      return matchesSearch && matchesRoast && matchesRegion;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });
  }, [search, selectedRoast, selectedRegion, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Shop Header */}
      <section className="bg-amber-900 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-black mb-4">The Coffee Shop</h1>
            <p className="text-xl text-amber-200/80 leading-relaxed font-medium">
              Explore our hand-picked selection of specialty Kenyan coffees. From the berry-like acidity of Nyeri to the citrus notes of Embu.
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar & Filters */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by region or name..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-medium transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-bold text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Sort:</span>
              <select
                className="bg-transparent focus:outline-none text-gray-900 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center space-x-4">
              <Grid size={18} className="text-amber-600 cursor-pointer" />
              <List size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-40 h-fit">
            <div className="space-y-6">
              <h3 className="text-lg font-black text-amber-950 uppercase tracking-widest border-b border-amber-100 pb-2">Roast Level</h3>
              <div className="space-y-3">
                {roasts.map(roast => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(selectedRoast === roast ? null : roast)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all ${
                      selectedRoast === roast
                        ? "bg-amber-900 border-amber-900 text-white shadow-lg"
                        : "bg-white border-gray-100 text-gray-600 hover:border-amber-200"
                    }`}
                  >
                    <span className="font-bold">{roast} Roast</span>
                    {selectedRoast === roast && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-black text-amber-950 uppercase tracking-widest border-b border-amber-100 pb-2">Region</h3>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedRegion === region
                        ? "bg-amber-100 text-amber-900 ring-2 ring-amber-900"
                        : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-amber-900 rounded-2xl text-white space-y-4">
              <h4 className="font-bold">Member Perks</h4>
              <p className="text-sm text-amber-200/80 leading-relaxed">Save 15% on your first order when you subscribe to our Coffee Club.</p>
              <button className="w-full bg-amber-600 hover:bg-amber-500 py-3 rounded-lg font-bold text-sm transition-colors">
                Learn More
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                    >
                      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] bg-gray-100 overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {product.process}
                          </span>
                        </div>
                      </Link>
                      <div className="p-8 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xs font-black text-amber-600 uppercase tracking-widest mb-1">{product.region}</div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors">
                              {product.name}
                            </h3>
                          </div>
                          <span className="text-2xl font-black text-amber-950">${product.price.toFixed(2)}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {product.notes.map((note) => (
                            <span key={note} className="text-[10px] font-bold bg-gray-50 px-2 py-1 rounded text-gray-500 uppercase tracking-tighter">
                              {note}
                            </span>
                          ))}
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                          <div className="flex items-center space-x-1 text-amber-500">
                            <Star size={14} className="fill-current" />
                            <span className="text-xs font-bold text-gray-900">4.9</span>
                          </div>
                          <Link
                            to={`/product/${product.id}`}
                            className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-amber-900 transition-colors"
                          >
                            Select Bag
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 space-y-4 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                  <Coffee size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">No matching coffee found</h3>
                <p className="text-gray-500 max-w-sm">Try adjusting your filters or search terms to discover other great beans.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedRoast(null);
                    setSelectedRegion(null);
                  }}
                  className="text-amber-700 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
