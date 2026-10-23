import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CinematicHeroExperience } from '../components/video/CinematicHeroExperience';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductCategory } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  Clock, 
  Compass, 
  ChevronRight,
  Eye
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | ProductCategory>('all');

  const featuredProducts = products.filter(p => p.isFeatured);
  const filteredProducts = selectedFilter === 'all'
    ? featuredProducts.slice(0, 8)
    : products.filter(p => p.category === selectedFilter).slice(0, 8);

  const collections = [
    {
      id: 'parfumerie',
      title: 'Haute Parfumerie',
      subtitle: 'Extraits absolus distillés à Grasse et Marrakech',
      image: '/src/assets/images/product_perfume_elixir_1792768475631.jpg',
      count: '6 Créations'
    },
    {
      id: 'maroquinerie',
      title: "Maroquinerie d'Exception",
      subtitle: 'Veau grainé pleine fleur et fermoirs sculptés à la main',
      image: '/src/assets/images/collection_leather_goods_1792768477250.jpg',
      count: '5 Pièces Maîtresses'
    },
    {
      id: 'horlogerie',
      title: 'Haute Horlogerie & Joaillerie',
      subtitle: 'Calibres squelette tourbillon et or 18 carats brossé',
      image: '/src/assets/images/collection_haute_horlogerie_1792768477398.jpg',
      count: '4 Garde-Temps'
    },
    {
      id: 'couture',
      title: 'Couture & Soie',
      subtitle: 'Silhouettes architecturales en cachemire et soies précieuses',
      image: '/src/assets/images/collection_haute_couture_1792768476829.jpg',
      count: '5 Pièces Rares'
    }
  ];

  return (
    <div className="w-full bg-[#0D0D11] text-zinc-100">
      
      {/* 1. Cinematic 3D / Video Hero Product Showcase */}
      <CinematicHeroExperience />

      {/* 2. Brand Trust & Moroccan Delivery Banner (Full-width clean row) */}
      <section className="border-b border-white/10 bg-[#121218] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                Livraison Express 24h
              </span>
              <span className="text-[11px] text-zinc-400">Casablanca, Rabat & Marrakech</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                Paiement à la Livraison
              </span>
              <span className="text-[11px] text-zinc-400">Règlement en espèces après vérification</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                Artisanat & Pureté
              </span>
              <span className="text-[11px] text-zinc-400">Certificats d’authenticité numérotés</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-xs font-semibold text-white block uppercase tracking-wider">
                Conciergerie Privée
              </span>
              <span className="text-[11px] text-zinc-400">Conseillers dédiés 7j/7 sur WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Collections Showcase */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">
              Chapitre I · Les Métiers d'Art
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial text-white">
              Quatre Piliers d'Excellence
            </h2>
          </div>
          <button
            onClick={() => navigateTo('collections')}
            className="mt-4 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors cursor-pointer group"
          >
            <span>Voir Toutes les Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => navigateTo('boutique', undefined, col.id)}
              className="group relative h-[420px] bg-zinc-900 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-end p-6"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75] group-hover:brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
                  {col.count}
                </span>
                <h3 className="text-xl font-editorial text-white group-hover:text-amber-200 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                  {col.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span>Explorer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Masterpieces ("Objets de Désir") */}
      <section className="py-20 px-6 bg-[#111116] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono block mb-2">
                Sélection Signature
              </span>
              <h2 className="text-3xl md:text-5xl font-editorial text-white">
                Objets de Désir
              </h2>
            </div>

            {/* Interactive Category Filter Tabs (Zero-pill discipline) */}
            <div className="mt-6 md:mt-0 flex items-center gap-1 p-1 bg-black/40 border border-white/10 overflow-x-auto">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedFilter('parfumerie')}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === 'parfumerie'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Parfumerie
              </button>
              <button
                onClick={() => setSelectedFilter('maroquinerie')}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === 'maroquinerie'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Maroquinerie
              </button>
              <button
                onClick={() => setSelectedFilter('horlogerie')}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === 'horlogerie'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Horlogerie
              </button>
              <button
                onClick={() => setSelectedFilter('couture')}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === 'couture'
                    ? 'bg-[#D4AF37] text-black font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Couture
              </button>
            </div>
          </div>

          {/* Product Grid (3 or 4 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Catalog Link */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('boutique')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              <span>Accéder à l'Intégralité du Catalogue (24 Pièces)</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Editorial Craftsmanship & Atelier Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Photo Split */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] bg-zinc-900 border border-white/10 overflow-hidden relative">
              <img
                src="/src/assets/images/hero_editorial_lumiere_1792768475045.jpg"
                alt="Atelier Maison Lumière"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute bottom-6 left-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 max-w-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block mb-1">
                  Atelier N°04 · Marrakech
                </span>
                <p className="text-xs text-zinc-300">
                  Façonnage manuel des pièces en laiton massif et polissage miroir traditionnel.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling Prose */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono block">
              Chapitre II · L'Âme de la Maison
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial text-white leading-tight">
              L'Alchimie entre Paris et la Palmeraie
            </h2>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans font-light">
              Née d'un dialogue artistique entre la haute tradition de la parfumerie parisienne et la magnificence de l'artisanat marocain, la Maison Lumière façonne des objets de désir qui transcendent les époques.
            </p>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans font-light">
              De l'extraction des fleurs de bigaradier au pied des cimes enneigées de l'Atlas au tannage végétal des cuirs les plus soyeux, chaque création exige des semaines d'attention minutieuse par nos maîtres artisans.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/10 font-mono">
              <div>
                <span className="text-2xl text-white block font-editorial">32%</span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
                  Concentration Absolue
                </span>
              </div>
              <div>
                <span className="text-2xl text-white block font-editorial">100%</span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
                  Artisanat d’Origine
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('a_propos')}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors cursor-pointer font-semibold"
              >
                <span>Découvrir l'Histoire de la Maison</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Private Concierge & VIP Appointment Teaser */}
      <section className="bg-gradient-to-r from-[#14141C] via-[#1A1A24] to-[#14141C] border-t border-white/10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono block">
            Service Privilège
          </span>
          <h2 className="text-3xl md:text-4xl font-editorial text-white">
            Une Expérience d’Acquisition Sur-Mesure
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Pour toute demande de pièce sur-mesure, de flacon monogrammé à l'or fin ou pour organiser une présentation privée dans nos salons de Casablanca ou Marrakech.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="px-7 py-3 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Solliciter la Conciergerie
            </button>
            <a
              href="https://wa.me/212600000000?text=Bonjour,%20je%20souhaite%20des%20renseignements%20sur%20les%20créations%20Maison%20Lumière"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-medium uppercase tracking-widest transition-colors"
            >
              Échanger sur WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
