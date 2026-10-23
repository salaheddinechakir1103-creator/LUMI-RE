import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductViewer360 } from '../components/3d/ProductViewer360';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductVariant } from '../types';
import { 
  Heart, 
  ShoppingBag, 
  Rotate3d, 
  Image as ImageIcon, 
  Truck, 
  ShieldCheck, 
  Check, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Share2,
  Droplets,
  Clock
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    navigateTo,
    showToast 
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeMedia, setActiveMedia] = useState<'photo' | '3d'>('photo');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('notes');
  const [isAddedAnimating, setIsAddedAnimating] = useState<boolean>(false);

  const isWished = isInWishlist(product.id);

  // Price calculation with selected variant
  const unitPriceMAD = product.priceMAD + (selectedVariant.priceModifierMAD || 0);
  const totalPriceMAD = unitPriceMAD * quantity;

  const handleAddToCart = () => {
    setIsAddedAnimating(true);
    addToCart(product, selectedVariant, quantity);
    setTimeout(() => {
      setIsAddedAnimating(false);
    }, 1200);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Lien de la création copié dans le presse-papier !');
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-8 px-6 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs font-mono">
          <button
            onClick={() => navigateTo('boutique')}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au catalogue</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-zinc-500">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-zinc-400">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-[#D4AF37]">{product.name}</span>
          </div>
          <button
            onClick={handleShare}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Partager cette création"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Contiguous PDP Grid (Gallery Left / Contiguous Purchase Module Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Showcase & 360 Viewer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Toggle Switch (Studio Photo vs 3D 360) */}
            <div className="flex items-center justify-between p-1 bg-[#14141C] border border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 pl-2">
                Mode de Visualisation :
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveMedia('photo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    activeMedia === 'photo'
                      ? 'bg-[#D4AF37] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Studio Photo</span>
                </button>
                <button
                  onClick={() => setActiveMedia('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    activeMedia === '3d'
                      ? 'bg-[#D4AF37] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>Vue 360° 3D</span>
                </button>
              </div>
            </div>

            {/* Active Display Stage */}
            <div className="relative bg-[#121218] border border-white/10 overflow-hidden">
              {activeMedia === 'photo' ? (
                <div className="aspect-[4/5] w-full flex items-center justify-center bg-black/40">
                  <img
                    src={product.galleryImages[selectedImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                </div>
              ) : (
                <ProductViewer360 productId={product.id} />
              )}
            </div>

            {/* Thumbnail Gallery (When in Photo mode) */}
            {activeMedia === 'photo' && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 bg-zinc-900 border shrink-0 overflow-hidden cursor-pointer transition-all ${
                      selectedImageIndex === idx ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Craftsmanship Highlights */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#14141C] border border-white/10 text-center font-mono">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Origine</span>
                <span className="text-xs text-white font-medium">{product.details.origin}</span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Certificat</span>
                <span className="text-xs text-[#D4AF37] font-medium">Scellé à la Cire</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Disponibilité</span>
                <span className="text-xs text-emerald-400 font-medium">
                  {product.inStock ? `${product.stockCount} en stock` : 'Sur commande'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37] mb-2 uppercase tracking-widest">
                <span>{product.categoryLabel}</span>
                <span>Réf. {product.id.toUpperCase()}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-editorial font-light text-white leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-zinc-400 mt-1 font-sans">
                {product.subtitle}
              </p>
            </div>

            {/* Price display with Tabular numerals */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-white/10">
              <span className="text-2xl md:text-3xl font-mono text-white tabular-nums font-semibold">
                {unitPriceMAD.toLocaleString('fr-FR')} MAD
              </span>
              {product.originalPriceMAD && (
                <span className="text-base font-mono text-zinc-500 line-through tabular-nums">
                  {product.originalPriceMAD.toLocaleString('fr-FR')} MAD
                </span>
              )}
              <span className="text-xs text-zinc-400 font-mono">TTC (Paiement à la livraison)</span>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light font-sans">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  Sélectionner une déclinaison :
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        selectedVariant.id === v.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <div className="text-xs font-medium font-sans">{v.name}</div>
                      {v.priceModifierMAD ? (
                        <div className="text-[10px] font-mono text-[#D4AF37] mt-0.5">
                          {v.priceModifierMAD > 0 ? `+${v.priceModifierMAD} MAD` : `${v.priceModifierMAD} MAD`}
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono text-zinc-500 mt-0.5">Inclus</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Buy Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/15 bg-white/5 h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 h-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-mono text-white tabular-nums font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 h-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 bg-[#D4AF37] hover:bg-[#AA820A] text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/10 ${
                    isAddedAnimating ? 'scale-[0.98] bg-emerald-400' : ''
                  }`}
                >
                  {isAddedAnimating ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au Panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acquérir · {totalPriceMAD.toLocaleString('fr-FR')} MAD</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-12 w-12 flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                    isWished 
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-black' 
                      : 'border-white/15 bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={isWished ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Express COD Moroccan Guarantee Badge */}
              <div className="p-3 bg-[#181822] border border-white/10 flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                  <span className="text-white font-medium block">Expédition sécurisée au Maroc</span>
                  Livraison 24h Casablanca, Rabat et Marrakech. Règlement en espèces à la livraison (Cash on Delivery) après inspection de l'écrin.
                </div>
              </div>
            </div>

            {/* Accordions for Olfactory Notes & Details */}
            <div className="border-t border-white/10 pt-4 divide-y divide-white/5">
              
              {/* Accordion 1: Olfactory Pyramid or Composition */}
              {product.details.notes && (
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'notes' ? null : 'notes')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Pyramide Olfactive Absolue
                    </span>
                    {openAccordion === 'notes' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'notes' && (
                    <div className="pb-4 space-y-3 text-xs text-zinc-300 font-sans">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#D4AF37] block">Notes de Tête :</span>
                        <span>{product.details.notes.top.join(' · ')}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#D4AF37] block">Notes de Cœur :</span>
                        <span>{product.details.notes.heart.join(' · ')}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#D4AF37] block">Notes de Fond :</span>
                        <span>{product.details.notes.base.join(' · ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 2: Materials & Dimensions */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span>Composition & Spécifications</span>
                  {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-4 space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
                    {product.details.composition && (
                      <p><strong className="text-white">Matières :</strong> {product.details.composition}</p>
                    )}
                    {product.details.dimensions && (
                      <p><strong className="text-white">Dimensions :</strong> {product.details.dimensions}</p>
                    )}
                    {product.details.careInstructions && (
                      <p><strong className="text-white">Entretien :</strong> {product.details.careInstructions}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-mono tracking-wider text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span>Livraison au Maroc & Retours</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 space-y-2 text-xs text-zinc-400 font-sans leading-relaxed">
                    <p>
                      Toutes nos créations sont expédiées sous pli scellé et sécurisé.
                    </p>
                    <p>
                      Livraison offerte dès 1 500 MAD d'achat partout au Maroc. Échange sous 14 jours si le sceau de cire n'a pas été rompu.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Creations Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
                  Compléments d'Harmonie
                </span>
                <h3 className="text-2xl md:text-3xl font-editorial text-white">
                  Vous Aimerez Aussi
                </h3>
              </div>
              <button
                onClick={() => navigateTo('boutique')}
                className="text-xs uppercase font-mono text-[#D4AF37] hover:text-white"
              >
                Tout le catalogue →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
