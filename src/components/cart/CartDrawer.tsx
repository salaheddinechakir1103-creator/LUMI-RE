import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD_MAD } from '../../data/moroccanCities';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotalMAD,
    cartShippingFeeMAD,
    cartDiscountMAD,
    cartTotalMAD,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    navigateTo
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const res = applyDiscountCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_MAD - cartSubtotalMAD);
  const freeShippingPercent = Math.min(100, Math.round((cartSubtotalMAD / FREE_SHIPPING_THRESHOLD_MAD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121218] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-lg font-editorial tracking-wide">
                Votre Panier d'Objets ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Threshold Progress */}
          <div className="bg-[#181822] px-6 py-3 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
              <span className="text-zinc-300">
                {remainingForFreeShipping > 0
                  ? `Plus que ${remainingForFreeShipping.toLocaleString('fr-FR')} MAD pour la livraison offerte`
                  : 'Félicitations ! Livraison offerte au Maroc'}
              </span>
              <span className="text-[#D4AF37] font-semibold">{freeShippingPercent}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-[#D4AF37] transition-all duration-300"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-4 stroke-[1]" />
                <p className="text-base font-editorial text-zinc-300 mb-2">Votre panier est encore vide.</p>
                <p className="text-xs text-zinc-500 mb-6 max-w-xs mx-auto">
                  Parcourez nos flacons de haute parfumerie et nos créations d'exception.
                </p>
                <button
                  onClick={() => { setIsCartOpen(false); navigateTo('boutique'); }}
                  className="px-6 py-2.5 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#AA820A] transition-colors cursor-pointer"
                >
                  Découvrir les Pièces
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemUnitPrice = item.product.priceMAD + (item.selectedVariant.priceModifierMAD || 0);
                const itemTotal = itemUnitPrice * item.quantity;

                return (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-white/5">
                    {/* Image */}
                    <div className="w-20 h-24 bg-zinc-900 border border-white/10 shrink-0 overflow-hidden">
                      <img
                        src={item.product.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = item.product.galleryImages[0] || ''; }}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-medium text-white font-serif">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                          {item.selectedVariant.name}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/10 bg-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-xs font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xs text-[#D4AF37] font-mono font-medium">
                            {itemTotal.toLocaleString('fr-FR')} MAD
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-zinc-500 font-mono">
                              {itemUnitPrice.toLocaleString('fr-FR')} MAD / unité
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#0E0E14] border-t border-white/10 space-y-4">
              
              {/* Promo Code Form */}
              <div>
                {appliedDiscount ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="font-mono text-[#D4AF37]">{appliedDiscount.code} (-{appliedDiscount.amountMAD} MAD)</span>
                    </div>
                    <button
                      onClick={removeDiscountCode}
                      className="text-zinc-400 hover:text-red-400 text-[11px] uppercase cursor-pointer"
                    >
                      Retirer
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Code privilège (ex: LUMIERE10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-black/50 border border-white/15 px-3 py-1.5 text-xs text-white uppercase placeholder:normal-case placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Appliquer
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono border-t border-white/5 pt-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Sous-total</span>
                  <span className="text-white">{cartSubtotalMAD.toLocaleString('fr-FR')} MAD</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-[#D4AF37]">
                    <span>Privilège ({appliedDiscount.code})</span>
                    <span>-{appliedDiscount.amountMAD.toLocaleString('fr-FR')} MAD</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Livraison estimée</span>
                  <span className="text-white">
                    {cartShippingFeeMAD === 0 ? 'Offerte' : `${cartShippingFeeMAD} MAD`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span className="uppercase font-sans tracking-wider">Total</span>
                  <span className="text-[#D4AF37] text-base">{cartTotalMAD.toLocaleString('fr-FR')} MAD</span>
                </div>
              </div>

              {/* Cash on Delivery Notice */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-white/[0.02] p-2 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Règlement à la livraison en espèces ou par chèque certifié.</span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/15"
              >
                <span>Procéder au Paiement</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
