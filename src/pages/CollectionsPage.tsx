import fixedImage0 from '../assets/images/product_perfume_elixir_1792768475631.jpg';
import fixedImage1 from '../assets/images/collection_leather_goods_1792768477250.jpg';
import fixedImage2 from '../assets/images/collection_haute_horlogerie_1792768477398.jpg';
import fixedImage3 from '../assets/images/collection_haute_couture_1792768476829.jpg';
import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { navigateTo } = useStore();

  const collectionStories = [
    {
      id: 'parfumerie',
      title: 'Haute Parfumerie d’Orient',
      kicker: 'Collection Signature',
      quote: '« Une composition olfactive n’est pas un parfum, c’est un sanctuaire émotionnel. »',
      image: fixedImage0,
      description: "Distillée entre Grasse et les contreforts de l'Atlas, cette collection rassemble des extraits absolus rares dosés à plus de 30%. Flacons de cristal lourd facettés à la main et bouchons en laiton massif.",
      highlights: ['Élixir de Lumière', 'Ambre Noir Souverain', 'Bois Sacré d’Atlas', 'Rose du Crépuscule']
    },
    {
      id: 'maroquinerie',
      title: 'Maroquinerie d’Exception',
      kicker: 'L’Art de la Sellerie',
      quote: '« Le cuir ne vieillit pas, il acquiert la patine des destins nobles. »',
      image: fixedImage1,
      description: "Des sacs et bagages d'apparat confectionnés en cuir de veau pleine fleur grainé, tanné aux écorces végétales et assemblés au point sellier traditionnel avec des fermoirs sculptés comme des bijoux.",
      highlights: ['Sac Talisman Noir', 'Cabas Royal Palace', 'Besace Soirée Fermoir Or']
    },
    {
      id: 'horlogerie',
      title: 'Haute Horlogerie & Éclat',
      kicker: 'Micromécanique & Or 18k',
      quote: '« Maîtriser le temps à travers l’or et le saphir. »',
      image: fixedImage2,
      description: "Chronomètres à tourbillon squeletté, boîtiers en titane sablé et joncs d'or 18 carats brossés à la main. Chaque garde-temps est numéroté et assemblé sur commande spéciale.",
      highlights: ['Chronographe Squelette Titane', 'Jonc Rayon de Lumière', 'Bague Émeraude d’Atlas']
    },
    {
      id: 'couture',
      title: 'Couture & Soie Pure',
      kicker: 'Silhouettes Architecturales',
      quote: '« La coupe parfaite se suffit à elle-même, libre de tout artifice. »',
      image: fixedImage3,
      description: "Manteaux en pur cachemire double-face cousus main, robes drapées en crêpe de soie italienne et smokings de gala aux lignes nettes et épurées.",
      highlights: ['Manteau Cachemire Noir', 'Robe Drapée Soie Dorée', 'Smoking Soirée']
    }
  ];

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-16 px-6 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-mono block">
            Édition Limitée · Les Collections
          </span>
          <h1 className="text-4xl md:text-6xl font-editorial font-light tracking-wide text-white">
            Objets & Manifestes
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            Quatre univers artistiques pensés comme des dialogues intemporels entre rigueur formelle, sensualité des matières et prestige des savoir-faire rares.
          </p>
        </div>

        {/* Collections Storytelling Rows */}
        <div className="space-y-24">
          {collectionStories.map((col, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div 
                key={col.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Asset (7 cols) */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="group relative aspect-[16/10] bg-zinc-900 border border-white/10 overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.82]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-sm md:text-base font-editorial italic text-amber-100">
                        {col.quote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prose & Action (5 cols) */}
                <div className={`lg:col-span-5 space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block">
                    {col.kicker}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-editorial text-white">
                    {col.title}
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">
                    {col.description}
                  </p>

                  {/* Highlights list */}
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider block mb-2">
                      Pièces emblématiques :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {col.highlights.map((h, idx) => (
                        <span key={idx} className="text-xs text-zinc-300 font-mono bg-white/5 px-2.5 py-1 border border-white/5">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => navigateTo('boutique', undefined, col.id)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <span>Explorer la Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
