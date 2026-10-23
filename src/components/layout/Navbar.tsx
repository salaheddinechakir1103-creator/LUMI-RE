import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Heart, Shield, Search, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartCount, 
    cartSubtotalMAD, 
    wishlist, 
    setIsCartOpen 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('boutique');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="w-full bg-[#08080B] text-zinc-400 border-b border-white/5 py-1.5 px-4 text-center text-[11px] tracking-widest uppercase font-mono flex items-center justify-center gap-4">
        <span>Livraison d'exception offerte au Maroc dès 1 500 MAD</span>
        <span className="hidden md:inline text-zinc-600">·</span>
        <span className="hidden md:inline text-[#D4AF37]">Paiement sécurisé à la livraison (Cash on Delivery)</span>
      </div>

      {/* Top Bar Contract (Zone 1 - Zone 2 - Zone 3) */}
      <header className="sticky top-0 z-40 w-full bg-[#0D0D11]/90 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => navigateTo('accueil')}
            className="text-2xl md:text-3xl font-editorial font-light tracking-[0.25em] text-white whitespace-nowrap shrink-0 hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
          >
            LUMIÈRE
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-zinc-300">
            <button
              onClick={() => navigateTo('accueil')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                activePage === 'accueil' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => navigateTo('boutique')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                activePage === 'boutique' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Boutique
            </button>
            <button
              onClick={() => navigateTo('collections')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                activePage === 'collections' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => navigateTo('a_propos')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                activePage === 'a_propos' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Maison
            </button>
            <button
              onClick={() => navigateTo('suivi')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                activePage === 'suivi' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Suivi
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`whitespace-nowrap shrink-0 hover:text-white transition-colors cursor-pointer ${
                activePage === 'contact' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              Conciergerie
            </button>
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Rechercher une pièce"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('boutique')}
              className="relative p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Favoris"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Panier ({cartCount})</span>
              <span className="sm:hidden">({cartCount})</span>
            </button>

            {/* Admin Console Quick Link */}
            <button
              onClick={() => navigateTo('admin')}
              className={`p-2 transition-colors cursor-pointer ${
                activePage === 'admin' ? 'text-[#D4AF37] bg-white/10' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Tableau de bord administration"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Quick Search Drawer */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-[#121218] px-6 py-4">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <input
                type="text"
                placeholder="Rechercher un parfum, un sac, une montre, de la soie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-zinc-500 font-sans"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#D4AF37] text-black text-xs uppercase tracking-wider font-semibold cursor-pointer shrink-0"
              >
                Explorer
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0D11] border-b border-white/10 px-6 py-6 space-y-4">
            <div className="flex flex-col gap-3 text-sm uppercase tracking-widest font-medium text-zinc-300">
              <button
                onClick={() => { navigateTo('accueil'); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-white border-b border-white/5"
              >
                Accueil
              </button>
              <button
                onClick={() => { navigateTo('boutique'); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-white border-b border-white/5"
              >
                Boutique & Objets
              </button>
              <button
                onClick={() => { navigateTo('collections'); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-white border-b border-white/5"
              >
                Collections Éditoriales
              </button>
              <button
                onClick={() => { navigateTo('a_propos'); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-white border-b border-white/5"
              >
                La Maison & Ateliers
              </button>
              <button
                onClick={() => { navigateTo('suivi'); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-white border-b border-white/5"
              >
                Suivi de Commande
              </button>
              <button
                onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                className="text-left py-2 hover:text-white border-b border-white/5"
              >
                Conciergerie & Boutiques
              </button>
              <button
                onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
                className="text-left py-2 text-[#D4AF37]"
              >
                Espace Administration
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
