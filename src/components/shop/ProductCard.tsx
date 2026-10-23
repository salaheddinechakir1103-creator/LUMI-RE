import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Rotate3d } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { navigateTo, addToCart, isInWishlist, toggleWishlist } = useStore();
  const isWished = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('fiche_produit', product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0], 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="lumi-product-card group relative flex flex-col bg-[#121218] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Visual Image Showcase (65-75% of card height) */}
      <div className="relative aspect-[4/5] w-full bg-[#16161F] overflow-hidden">
        <img
          src={product.image}
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = product.galleryImages[0] || ''; }}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle Tag (At most 1 quiet text label, no pill sandwich) */}
        {product.isNew ? (
          <span className="absolute top-3 left-3 text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] bg-black/60 px-2 py-1 backdrop-blur-sm border border-[#D4AF37]/30">
            Nouveauté
          </span>
        ) : product.has3DModel ? (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-amber-200 bg-black/60 px-2 py-1 backdrop-blur-sm border border-white/10">
            <Rotate3d className="w-3 h-3 text-[#D4AF37]" />
            Modèle 3D
          </span>
        ) : null}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-none transition-colors backdrop-blur-md cursor-pointer ${
            isWished 
              ? 'bg-[#D4AF37] text-black' 
              : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/80'
          }`}
          title={isWished ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ajout Rapide</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('fiche_produit', product.id);
            }}
            className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Consulter la fiche complète"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clean Metadata Container */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-[#121218]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
            {product.categoryLabel}
          </span>
          <h3 className="text-base font-editorial text-white group-hover:text-amber-200 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Rating (Tabular figures) */}
        <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-mono font-medium text-white tabular-nums">
              {product.priceMAD.toLocaleString('fr-FR')} MAD
            </span>
            {product.originalPriceMAD && (
              <span className="text-xs font-mono text-zinc-500 line-through tabular-nums">
                {product.originalPriceMAD.toLocaleString('fr-FR')} MAD
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            ★ {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
};
