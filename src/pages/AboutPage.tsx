import fixedImage0 from '../assets/images/hero_editorial_lumiere_1792768475045.jpg';
import React from 'react';
import { useStore } from '../context/StoreContext';
import { Compass, Sparkles, Award, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-16 px-6 text-zinc-100">
      <div className="max-w-5xl mx-auto space-y-20">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-mono block">
            Maison Fondée en 2021 · Paris & Marrakech
          </span>
          <h1 className="text-4xl md:text-6xl font-editorial font-light tracking-wide text-white">
            La Poétique des Objets
          </h1>
          <p className="text-base text-zinc-300 font-light leading-relaxed font-sans">
            Maison Lumière célèbre la rencontre entre l'esprit des Lumières françaises et la splendeur millénaire des arts décoratifs marocains.
          </p>
        </div>

        {/* Large Editorial Photograph */}
        <div className="relative aspect-[16/9] bg-zinc-900 border border-white/10 overflow-hidden">
          <img
            src={fixedImage0}
            alt="L’Atelier Maison Lumière"
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest block mb-1">
              Sanctuaire Créatif
            </span>
            <p className="text-lg md:text-xl font-editorial text-white max-w-xl">
              « Là où la lumière dorée de Marrakech rencontre la précision des ateliers parisiens. »
            </p>
          </div>
        </div>

        {/* The 3 Pillars of Maison Lumière */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#121218] border border-white/10 space-y-3">
            <Compass className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="text-xl font-editorial text-white">Deux Terres d'Élection</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
              Notre laboratoire de création olfactive opère à Grasse pour la distillation des absolus, tandis que nos maîtres doreurs, selliers et ciseleurs travaillent dans notre atelier confidentiel de Marrakech.
            </p>
          </div>

          <div className="p-6 bg-[#121218] border border-white/10 space-y-3">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="text-xl font-editorial text-white">L'Exigence Absolue</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
              Nos extraits de parfum sont formulés à plus de 30% de concentration pure, garantissant un sillage d'une persistance et d'une noblesse inoubliables.
            </p>
          </div>

          <div className="p-6 bg-[#121218] border border-white/10 space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="text-xl font-editorial text-white">Artisanat Éthique</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
              Nous soutenons directement les coopératives féminines de la vallée de l'Ourika pour la cueillette manuelle des fleurs d'oranger et le bois de cèdre certifié de l'Atlas.
            </p>
          </div>
        </div>

        {/* Narrative Chapter */}
        <div className="bg-[#14141C] border border-white/10 p-8 md:p-12 space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
            Philosophie des Objets de Désir
          </span>
          <h2 className="text-2xl md:text-4xl font-editorial text-white">
            Pourquoi « Lumière » ?
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-zinc-300 font-light font-sans leading-relaxed">
            <p>
              La lumière est à la fois l'onde invisible qui révèle la beauté des formes et la chaleur solaire qui exalte le parfum des fleurs. Dans le cristal de nos flacons, elle se diffracte en faisceaux chatoyants ; sur le laiton moleté de nos bouchons, elle s'accroche avec douceur.
            </p>
            <p>
              Posséder une pièce Maison Lumière, c'est s'offrir un fragment d'éternité, un objet conçu pour traverser les générations sans jamais perdre son éclat.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigateTo('boutique')}
              className="px-7 py-3 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Explorer les Créations
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
