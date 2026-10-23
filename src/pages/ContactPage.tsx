import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'commande_speciale',
    salon: 'casablanca',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Votre demande a été transmise à notre conciergerie privée.');
  };

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-16 px-6 text-zinc-100">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-mono block">
            Service Privilège 7j/7
          </span>
          <h1 className="text-4xl md:text-5xl font-editorial font-light text-white">
            La Conciergerie Privée
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed font-sans">
            Nos maîtres de maison sont à votre entière disposition pour une commande spéciale, une gravure personnalisée ou pour convenir d'un rendez-vous privé dans nos salons.
          </p>
        </div>

        {/* Salons Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#121218] border border-white/10 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Salons Privés Casablanca
            </span>
            <h3 className="text-lg font-editorial text-white">Boulevard d'Anfa</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              142, Boulevard d'Anfa, Quartier Gauthier, Casablanca.
            </p>
            <div className="text-xs font-mono text-zinc-300 pt-2 border-t border-white/5 space-y-1">
              <div>Tél : +212 5 22 20 40 80</div>
              <div className="text-zinc-500">Du Lundi au Samedi · 10h - 20h</div>
            </div>
          </div>

          <div className="p-6 bg-[#121218] border border-white/10 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Atelier & Salons Marrakech
            </span>
            <h3 className="text-lg font-editorial text-white">Quartier Hivernage</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Avenue Echouhada, Hivernage & Majorelle, Marrakech.
            </p>
            <div className="text-xs font-mono text-zinc-300 pt-2 border-t border-white/5 space-y-1">
              <div>Tél : +212 5 24 43 12 90</div>
              <div className="text-zinc-500">7j/7 sur rendez-vous privilégié</div>
            </div>
          </div>

          <div className="p-6 bg-[#121218] border border-white/10 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Salons Parisiens
            </span>
            <h3 className="text-lg font-editorial text-white">Place Vendôme</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              18, Place Vendôme, 75001 Paris, France.
            </p>
            <div className="text-xs font-mono text-zinc-300 pt-2 border-t border-white/5 space-y-1">
              <div>Tél : +33 1 42 68 00 12</div>
              <div className="text-zinc-500">Du Mardi au Samedi · 11h - 19h</div>
            </div>
          </div>
        </div>

        {/* Form and WhatsApp Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#121218] border border-white/10 p-8 md:p-12">
          
          {/* Left Column: Direct WhatsApp Connection */}
          <div className="lg:col-span-5 space-y-6 lg:border-r lg:border-white/10 lg:pr-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Canal Instantané
            </span>
            <h2 className="text-2xl md:text-3xl font-editorial text-white">
              Échangez en Direct avec un Conseiller
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
              Pour une réponse immédiate, l'organisation d'une livraison express personnalisée le jour même à Casablanca ou un conseil olfactif confidentiel.
            </p>

            <a
              href="https://wa.me/212600000000?text=Bonjour,%20je%20souhaite%20un%20conseil%20privilégié%20avec%20la%20Conciergerie%20Lumière"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Ouvrir WhatsApp Concierge</span>
            </a>

            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Délai de réponse moyen : Moins de 15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Service bilingue Français / Arabe / Anglais</span>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment & Bespoke Request Form */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Formulaire Confidentiel
            </span>
            <h2 className="text-2xl md:text-3xl font-editorial text-white">
              Demande Privée
            </h2>

            {submitted ? (
              <div className="p-8 bg-[#181824] border border-[#D4AF37]/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto" />
                <h3 className="text-xl font-editorial text-white">Demande Transmise</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Votre conseiller privé Maison Lumière prendra attache avec vous dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-mono text-[#D4AF37] underline cursor-pointer"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Yasmine Benali"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 px-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+212 6 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 px-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Type de service</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="commande_speciale">Pièce sur-mesure ou Édition Spéciale</option>
                      <option value="rdv_salon">Rendez-vous privé en salon</option>
                      <option value="gravure">Gravure personnalisée de flacon</option>
                      <option value="mariage">Cadeaux de prestige & Cérémonies</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-300 block mb-1">Salon privilégié</label>
                    <select
                      value={formData.salon}
                      onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="casablanca">Casablanca (Boulevard d'Anfa)</option>
                      <option value="marrakech">Marrakech (Hivernage)</option>
                      <option value="paris">Paris (Place Vendôme)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Détails de votre souhait *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Précisez la date souhaitée, la pièce désirée ou toute attention particulière..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmettre ma Demande Privée</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
