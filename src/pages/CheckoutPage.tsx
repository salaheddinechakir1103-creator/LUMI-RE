import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MOROCCAN_CITIES } from '../data/moroccanCities';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle,
  Lock,
  ShoppingBag
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotalMAD, 
    cartShippingFeeMAD, 
    cartDiscountMAD, 
    cartTotalMAD, 
    appliedDiscount,
    selectedCityId,
    setSelectedCityId,
    placeOrder,
    navigateTo 
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    postalCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const selectedCity = MOROCCAN_CITIES.find(c => c.id === selectedCityId) || MOROCCAN_CITIES[0];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityId(e.target.value);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Veuillez saisir votre nom complet.';
    if (!formData.phone.trim()) {
      errs.phone = 'Le numéro de téléphone est obligatoire pour le livreur.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Veuillez entrer un numéro de téléphone valide.';
    }
    if (!formData.address.trim()) errs.address = 'L’adresse de livraison est requise.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || 'client@lumiere.ma',
        city: selectedCity.name,
        address: formData.address,
        notes: formData.notes
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF8E7', '#E5C158']
        });
      } catch {}

      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 800);
  };

  // If order was just placed, display instant confirmation
  if (completedOrder) {
    const waText = encodeURIComponent(
      `*COMMANDE MAISON LUMIÈRE N° ${completedOrder.trackingNumber}*\n` +
      `Client : ${completedOrder.customer.fullName}\n` +
      `Téléphone : ${completedOrder.customer.phone}\n` +
      `Ville : ${completedOrder.customer.city}\n` +
      `Adresse : ${completedOrder.customer.address}\n\n` +
      `*Articles :*\n` +
      completedOrder.items.map((i: any) => `- ${i.product.name} (${i.selectedVariant.name}) x${i.quantity} : ${(i.product.priceMAD + (i.selectedVariant.priceModifierMAD || 0)) * i.quantity} MAD`).join('\n') +
      `\n\n*Total à régler à la livraison : ${completedOrder.totalMAD.toLocaleString('fr-FR')} MAD*\n` +
      `Merci de confirmer la prise en charge.`
    );

    return (
      <div className="w-full bg-[#0D0D11] min-h-screen py-16 px-6 text-zinc-100">
        <div className="max-w-2xl mx-auto bg-[#121218] border border-[#D4AF37]/40 p-8 md:p-12 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase font-mono tracking-[0.3em] text-[#D4AF37] block">
            Confirmation Immédiate · Maison Lumière
          </span>

          <h1 className="text-3xl md:text-4xl font-editorial text-white">
            Votre Commande est Enregistrée
          </h1>

          <div className="p-4 bg-black/50 border border-white/10 font-mono text-sm max-w-sm mx-auto">
            <span className="text-zinc-400 block text-xs">Numéro de Suivi Privilège :</span>
            <span className="text-xl text-[#D4AF37] font-bold tracking-widest">{completedOrder.trackingNumber}</span>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
            Notre atelier à Casablanca prépare actuellement votre précieux écrin scellé à la cire. 
            Le coursier vous contactera par téléphone pour convenir de l'heure exacte de livraison.
          </p>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 text-left space-y-1">
            <p className="font-semibold uppercase tracking-wider">Mode Démonstration :</p>
            <p>Paiement Cash on Delivery (Paiement à la livraison) simulé avec succès. Aucun débit bancaire réel.</p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('suivi')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              Suivre l'Acheminement en Direct
            </button>

            <a
              href={`https://wa.me/212600000000?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-200 border border-emerald-500/30 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Envoyer sur WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('boutique')}
              className="text-xs text-zinc-400 hover:text-white underline font-mono cursor-pointer"
            >
              Retourner aux créations de la boutique
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#0D0D11] min-h-screen py-24 px-6 text-center text-zinc-100">
        <div className="max-w-md mx-auto space-y-4">
          <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
          <h2 className="text-2xl font-editorial text-white">Votre panier est vide</h2>
          <p className="text-xs text-zinc-400">
            Veuillez choisir un objet de désir avant de procéder au règlement.
          </p>
          <button
            onClick={() => navigateTo('boutique')}
            className="px-6 py-3 bg-[#D4AF37] text-black text-xs uppercase tracking-widest font-semibold cursor-pointer"
          >
            Explorer la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-12 px-6 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs font-mono">
          <button
            onClick={() => navigateTo('boutique')}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Poursuivre mes acquisitions</span>
          </button>
          <div className="flex items-center gap-2 text-zinc-400">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Protocole de Commande Sécurisé</span>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="mb-8 p-4 bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed font-sans">
            <strong className="text-amber-300 uppercase tracking-wide block mb-0.5">Démonstration E-Commerce Luxe & Cash on Delivery</strong>
            Cette plateforme est un démonstrateur d'exception. Le règlement s'effectue selon le mode Cash on Delivery (Paiement en espèces lors de la remise en main propre). Aucune coordonnée bancaire réelle n'est sollicitée.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form: Delivery & Contact Information (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact Info */}
            <div className="bg-[#121218] border border-white/10 p-6 space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
                01. Coordonnées du Destinataire
              </span>
              <h2 className="text-xl font-editorial text-white">
                Informations Personnelles
              </h2>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Kenza Benjelloun"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">
                      Numéro de Téléphone Portable *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+212 6 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">
                      Adresse Email (Pour confirmation)
                    </label>
                    <input
                      type="email"
                      placeholder="votre.email@domaine.ma"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination in Morocco */}
            <div className="bg-[#121218] border border-white/10 p-6 space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
                02. Lieu d'Expédition au Maroc
              </span>
              <h2 className="text-xl font-editorial text-white">
                Adresse de Livraison Privée
              </h2>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">
                    Ville de Résidence *
                  </label>
                  <select
                    value={selectedCityId}
                    onChange={handleCityChange}
                    className="w-full bg-black/40 border border-white/15 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name} — {city.estimatedHours}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">
                    Adresse Complète (Rue, Quartier, Résidence) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Résidence Les Palmiers, Bd d'Anfa, Étage 4"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">
                    Instructions Spéciales pour le Coursier (Optionnel)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ex: Déposer à la conciergerie ou appeler 15 min avant l'arrivée"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-[#121218] border border-white/10 p-6 space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
                03. Modalité de Règlement
              </span>
              <h2 className="text-xl font-editorial text-white">
                Paiement à la Livraison (Cash on Delivery)
              </h2>

              <div className="p-4 bg-white/[0.03] border border-[#D4AF37]/50 flex items-start gap-4">
                <Banknote className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
                <div className="text-xs space-y-1">
                  <span className="text-white font-semibold uppercase tracking-wider block">
                    Paiement en Espèces lors de la Remise en Main Propre
                  </span>
                  <p className="text-zinc-400 leading-relaxed font-sans">
                    Vous ne réglez votre commande qu'après réception et inspection de l'emballage cacheté à la cire.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Confirmation CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121218] border border-white/10 p-6 space-y-6 lg:sticky lg:top-28">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-editorial text-white">
                  Récapitulatif de Commande ({cart.length})
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemUnitPrice = item.product.priceMAD + (item.selectedVariant.priceModifierMAD || 0);
                  const itemTotal = itemUnitPrice * item.quantity;

                  return (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="w-14 h-16 bg-zinc-900 border border-white/10 shrink-0 overflow-hidden">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-white font-medium line-clamp-1">{item.product.name}</div>
                          <div className="text-zinc-400 font-mono text-[11px]">{item.selectedVariant.name} x{item.quantity}</div>
                        </div>
                        <div className="text-[#D4AF37] font-mono font-medium">
                          {itemTotal.toLocaleString('fr-FR')} MAD
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Sous-total</span>
                  <span className="text-white">{cartSubtotalMAD.toLocaleString('fr-FR')} MAD</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-[#D4AF37]">
                    <span>Code ({appliedDiscount.code})</span>
                    <span>-{appliedDiscount.amountMAD.toLocaleString('fr-FR')} MAD</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Livraison vers {selectedCity.name}</span>
                  <span className="text-white">
                    {cartShippingFeeMAD === 0 ? 'Offerte' : `${cartShippingFeeMAD} MAD`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-3 border-t border-white/10">
                  <span className="font-sans uppercase tracking-wider">Total à Régler</span>
                  <span className="text-[#D4AF37] text-lg">{cartTotalMAD.toLocaleString('fr-FR')} MAD</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/15 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Validation de la Commande...' : 'Confirmer la Commande · Paiement à la Livraison'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-zinc-500 font-mono">
                Livraison garantie en 24 à 48h selon la ville sélectionnée.
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
