import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      showToast('Votre inscription aux invitations privées de la Maison est confirmée.');
      setEmailInput('');
    }
  };

  return (
    <footer className="w-full bg-[#08080B] border-t border-white/10 text-zinc-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Address Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-editorial font-light tracking-[0.25em] text-white">
              LUMIÈRE
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
              Maison de haute parfumerie et d’objets d’artisanat d’art, façonnés entre les ateliers de Grasse, Paris et les salons privés de Casablanca et Marrakech.
            </p>
            <div className="text-[11px] font-mono text-zinc-500 space-y-0.5 pt-2">
              <div>Salons Casablanca : 142 Bd d'Anfa, Gauthier</div>
              <div>Ateliers Marrakech : Hivernage & Majorelle</div>
            </div>
          </div>

          {/* Nav: Collections */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Créations
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => navigateTo('boutique', undefined, 'parfumerie')} className="hover:text-white transition-colors cursor-pointer">
                  Haute Parfumerie
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('boutique', undefined, 'maroquinerie')} className="hover:text-white transition-colors cursor-pointer">
                  Maroquinerie d'Exception
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('boutique', undefined, 'horlogerie')} className="hover:text-white transition-colors cursor-pointer">
                  Haute Horlogerie
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('boutique', undefined, 'couture')} className="hover:text-white transition-colors cursor-pointer">
                  Couture & Soie
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('boutique', undefined, 'maison')} className="hover:text-white transition-colors cursor-pointer">
                  Objets de Maison
                </button>
              </li>
            </ul>
          </div>

          {/* Nav: Services & Maison */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              La Maison
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => navigateTo('a_propos')} className="hover:text-white transition-colors cursor-pointer">
                  L'Histoire & Les Ateliers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections')} className="hover:text-white transition-colors cursor-pointer">
                  Lookbook Éditorial
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('suivi')} className="hover:text-white transition-colors cursor-pointer">
                  Suivi de Commande Privilège
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Conciergerie & Salons VIP
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Administration Atelier
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Invitation Privée */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
              Cercle Privilège
            </span>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Recevez en avant-première nos invitations aux salons privés et lancements d'éditions numérotées.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono py-2">
                <Check className="w-4 h-4" />
                <span>Invitation confirmée.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="votre.email@domaine.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  S'inscrire au Cercle
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} LUMIÈRE STORE SARL · Tous droits réservés. Casablanca & Paris.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Paiement à la livraison (Cash on Delivery)</span>
            <span>·</span>
            <span>Édition Démonstration</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
