import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductCategory } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, X, Heart, Rotate3d, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, wishlist, activeCollectionCategory } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCollectionCategory || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(55000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Toutes les Créations' },
    { id: 'parfumerie', label: 'Haute Parfumerie' },
    { id: 'maroquinerie', label: "Maroquinerie d'Exception" },
    { id: 'horlogerie', label: 'Haute Horlogerie & Joaillerie' },
    { id: 'couture', label: 'Couture & Soie' },
    { id: 'maison', label: 'Objets de Maison' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesSub && !matchesDesc && !matchesTags) return false;
      }

      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price
      if (product.priceMAD > maxPrice) {
        return false;
      }

      // Stock
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // Wishlist
      if (onlyWishlist && !wishlist.includes(product.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceMAD - b.priceMAD;
      if (sortBy === 'price-desc') return b.priceMAD - a.priceMAD;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, sortBy, maxPrice, onlyInStock, onlyWishlist, wishlist]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
    setMaxPrice(55000);
    setOnlyInStock(false);
    setOnlyWishlist(false);
  };

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#D4AF37] mb-2">
            Maison Lumière · Catalogue Général
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-editorial text-white">
                Objets & Pièces Rares
              </h1>
              <p className="text-xs text-zinc-400 mt-2 font-mono">
                {filteredProducts.length} pièces sélectionnées selon nos standards d'excellence
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Rechercher par nom, matière..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 space-y-4">
          
          {/* Category Tabs (Clean button controls, zero pill sandwiches) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#121218] border border-white/10 text-xs font-mono">
            
            {/* Sorting */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-zinc-400 uppercase">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black/40 text-white border border-white/10 px-3 py-1.5 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="featured">Sélection Signature</option>
                <option value="price-asc">Prix : Croissant</option>
                <option value="price-desc">Prix : Décroissant</option>
                <option value="rating">Mieux Notés</option>
                <option value="newest">Nouveautés</option>
              </select>
            </div>

            {/* Quick Toggles */}
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#D4AF37]"
                />
                <span>En stock uniquement</span>
              </label>

              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={(e) => setOnlyWishlist(e.target.checked)}
                  className="accent-[#D4AF37]"
                />
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#D4AF37] fill-current" />
                  <span>Favoris ({wishlist.length})</span>
                </span>
              </label>

              {(searchQuery || selectedCategory !== 'all' || onlyInStock || onlyWishlist || maxPrice < 55000) && (
                <button
                  onClick={resetFilters}
                  className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Grid Columns Switcher */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setGridCols(3)}
                className={`px-2 py-1 transition-colors ${
                  gridCols === 3 ? 'bg-[#D4AF37] text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
                title="3 Colonnes"
              >
                3
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`px-2 py-1 transition-colors ${
                  gridCols === 4 ? 'bg-[#D4AF37] text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
                title="4 Colonnes"
              >
                4
              </button>
            </div>

          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#121218] border border-white/10 p-8">
            <Search className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-xl font-editorial text-white mb-2">
              Aucune création ne correspond à vos critères
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Veuillez ajuster vos filtres ou réinitialiser votre recherche.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#AA820A] transition-colors cursor-pointer"
            >
              Afficher Tout le Catalogue
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${
            gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          } gap-6`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
