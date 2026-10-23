import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Printer, 
  Share2,
  FileText
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, navigateTo } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order>(orders[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = orders.find(o => o.trackingNumber.toUpperCase() === query);
    if (found) {
      setActiveOrder(found);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'validee':
        return { label: 'Confirmée en Atelier', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30' };
      case 'atelier':
        return { label: 'Façonnage & Emballage', color: 'text-amber-200 bg-amber-500/15 border-amber-500/40' };
      case 'expediee':
        return { label: 'Remise au Coursier VIP', color: 'text-blue-300 bg-blue-500/10 border-blue-500/30' };
      case 'en_livraison':
        return { label: 'En Cours d’Acheminement', color: 'text-[#D4AF37] bg-[#D4AF37]/15 border-[#D4AF37]/40' };
      case 'livree':
        return { label: 'Livrée & Réglée', color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' };
      default:
        return { label: 'En Traitement', color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20' };
    }
  };

  const statusBadge = getStatusBadge(activeOrder?.status || 'validee');

  const waText = activeOrder ? encodeURIComponent(
    `*SUIVI COMMANDE MAISON LUMIÈRE N° ${activeOrder.trackingNumber}*\n` +
    `Client : ${activeOrder.customer.fullName}\n` +
    `Statut actuel : ${activeOrder.status.toUpperCase()}\n` +
    `Ville : ${activeOrder.customer.city}\n` +
    `Montant à régler : ${activeOrder.totalMAD.toLocaleString('fr-FR')} MAD\n\n` +
    `Pouvez-vous me confirmer le créneau de passage du coursier ?`
  ) : '';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-12 px-6 text-zinc-100">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#D4AF37] mb-2 block">
            Service Suivi Privilège · Maison Lumière
          </span>
          <h1 className="text-3xl md:text-5xl font-editorial text-white">
            Suivi d'Acheminement Sécurisé
          </h1>
          <p className="text-xs text-zinc-400 mt-2 font-mono">
            Consultez en temps réel chaque étape de préparation et d'expédition de vos objets de désir.
          </p>
        </div>

        {/* Tracking Code Search Input & Quick Chips */}
        <div className="bg-[#121218] border border-white/10 p-6 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Entrez votre numéro de suivi (ex: LUM-84912, LUM-92305)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-black/50 border border-white/15 pl-10 pr-4 py-3 text-xs uppercase font-mono text-white placeholder:normal-case placeholder:text-zinc-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#AA820A] transition-colors cursor-pointer shrink-0"
            >
              Rechercher
            </button>
          </form>

          {/* Quick Select Demo Orders */}
          <div className="flex items-center gap-2 pt-2 text-xs font-mono text-zinc-400 flex-wrap">
            <span className="text-zinc-500">Commandes récentes en démonstration :</span>
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveOrder(o)}
                className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
                  activeOrder?.id === o.id
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                    : 'border-white/10 hover:border-white/20 text-zinc-300'
                }`}
              >
                {o.trackingNumber} ({o.customer.city})
              </button>
            ))}
          </div>
        </div>

        {/* Active Order Card */}
        {activeOrder ? (
          <div className="bg-[#121218] border border-white/10 p-6 md:p-8 space-y-8">
            
            {/* Order Meta Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl font-mono text-white font-bold tracking-wider">
                    {activeOrder.trackingNumber}
                  </span>
                  <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 border ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  Enregistrée le {new Date(activeOrder.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/212600000000?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-200 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Conciergerie</span>
                </a>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer le Reçu</span>
                </button>
              </div>
            </div>

            {/* Visual Timeline */}
            <div>
              <h3 className="text-sm uppercase font-mono tracking-wider text-[#D4AF37] mb-6">
                Chronologie d'Acheminement
              </h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
                {activeOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border z-10 ${
                      step.completed
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#121218] text-zinc-600 border-white/20'
                    }`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 bg-white/[0.02] border border-white/5 p-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-sm font-medium text-white font-serif">{step.title}</h4>
                        <span className="text-[11px] font-mono text-[#D4AF37]">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient and Delivery Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="space-y-2 p-4 bg-black/40 border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Destinataire & Contact
                </span>
                <p className="text-white font-sans text-sm font-medium">{activeOrder.customer.fullName}</p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{activeOrder.customer.phone}</span>
                </p>
                <p className="text-zinc-400">{activeOrder.customer.email}</p>
              </div>

              <div className="space-y-2 p-4 bg-black/40 border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                  Adresse & Modalité
                </span>
                <p className="text-white font-sans flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{activeOrder.customer.city}</span>
                </p>
                <p className="text-zinc-400">{activeOrder.customer.address}</p>
                <p className="text-amber-200/90 text-[11px] pt-1">
                  Règlement : Cash on Delivery ({activeOrder.totalMAD.toLocaleString('fr-FR')} MAD)
                </p>
              </div>
            </div>

            {/* Items Summary in Receipt Format */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-sm uppercase font-mono tracking-wider text-zinc-300 mb-4">
                Articles Composant la Commande
              </h3>
              
              <div className="space-y-3">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-12 object-cover border border-white/10" />
                      <div>
                        <div className="text-white font-serif text-sm">{item.product.name}</div>
                        <div className="text-zinc-400 text-[11px]">{item.selectedVariant.name} · Quantité : {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-right text-[#D4AF37] font-medium">
                      {((item.product.priceMAD + (item.selectedVariant.priceModifierMAD || 0)) * item.quantity).toLocaleString('fr-FR')} MAD
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="mt-4 p-4 bg-black/60 border border-white/10 flex justify-between items-center font-mono">
                <span className="text-xs uppercase text-zinc-400">Total à Régler au Livreur :</span>
                <span className="text-lg text-[#D4AF37] font-bold">
                  {activeOrder.totalMAD.toLocaleString('fr-FR')} MAD
                </span>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-16 bg-[#121218] border border-white/10 p-6">
            <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-white font-editorial text-lg">Aucune commande trouvée</p>
            <p className="text-xs text-zinc-400 mt-1">Veuillez vérifier votre numéro de suivi.</p>
          </div>
        )}

      </div>
    </div>
  );
};
