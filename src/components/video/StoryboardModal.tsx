import React from 'react';
import { X, Film, Copy, Check, Sparkles, Video, Aperture, Layers } from 'lucide-react';

interface StoryboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryboardModal: React.FC<StoryboardModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const masterPrompt = `Commercial ultra-luxe 8K photoréaliste pour le parfum « ÉLIXIR DE LUMIÈRE » de la Maison Lumière.
Format : 16:9 4K UHD, 60fps, Seamless Loop.
Rendu : Cinema 4D Octane / Unreal Engine 5.4 Lumen / Runway Gen-3 Alpha.

Plan d'ouverture en macro extrême sur un flacon géométrique en cristal épais facetté, posé sur un socle de pierre de travertin brut au cœur d'une galerie d'arcades ocre au soleil couchant. La lumière rasante traverse le jus ambré d'or liquide, projetant des caustiques cristallines spectaculaires sur la pierre.

Mouvement de caméra : Dolly avant lent combiné à un travelling circulaire à 24mm anamorphique.
La caméra s'élève avec fluidité vers le bouchon octogonal en laiton massif brossé champagne, révélant la gravure au laser « LUMIÈRE PARIS ».
En arrière-plan, un voile de soie champagne ondule au gré d'une brise saharienne feutrée.
Une micro-brume de parfum se vaporise dans les airs au ralenti (120fps), chaque micro-gouttelette scintillant comme une constellation d'or dans le rayon de lumière volumétrique.
Étalonnage : Tons chauds impériaux, noirs profonds, contraste velouté, grain pellicule 35mm argentique délicat.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const storyboardShots = [
    {
      shot: 'Plan 01',
      title: 'Macro Caustiques & Cristal (00:00 - 00:03)',
      lens: 'Arri Master Macro 100mm f/2.0',
      description: 'Lumière rasante traversant les biseaux du verre cristal. Les rayons dorés illuminent le cœur ambré du parfum qui tourbillonne lentement.',
      lighting: 'Soleil couchant direct + panneau de diffusion soyeux à 45°'
    },
    {
      shot: 'Plan 02',
      title: 'Élévation & Bouchon Laiton Brossé (00:03 - 00:06)',
      lens: 'Anamorphic 50mm T1.9',
      description: 'Travelling ascendant sur le col moleté et le bouchon octogonal lourd. Les reflets métalliques brossés glissent avec une précision de haute joaillerie.',
      lighting: 'Rim light froide 5600K créant un liséré d’argent en contre-jour'
    },
    {
      shot: 'Plan 03',
      title: 'Vaporisation Céleste & Particules (00:06 - 00:09)',
      lens: 'Cooke Anamorphic /i 65mm',
      description: 'Ralenti 120 fps. Le diffuseur libère une nuée de micro-gouttelettes dorées flottant en apesanteur dans un rai de lumière volumétrique.',
      lighting: 'Spot découpe focalisé à 8000 lumens avec fumée d’ambiance invisible'
    },
    {
      shot: 'Plan 04',
      title: 'L’Égérie & Le Drapé de Soie (00:09 - 00:12)',
      lens: 'Leica Summilux-C 35mm',
      description: 'Silhouette couture vêtue d’une robe en soie champagne traversant les arches de pierre calcaire, le regard tourné vers l’horizon.',
      lighting: 'Lumière naturelle filtrée par des claustras monumentaux'
    },
    {
      shot: 'Plan 05',
      title: 'Composition Héroïque & Sceau (00:12 - 00:15)',
      lens: 'Arri Signature Prime 40mm',
      description: 'Le flacon en lévitation subtile au centre du cadre, entouré d’un éclat crépusculaire. Le sceau d’or « LUMIÈRE » s’illumine délicatement.',
      lighting: 'Key light 3200K chaude + Fill light zénithale'
    },
    {
      shot: 'Plan 06',
      title: 'Transition Loop Parfaite (00:15 - 00:16)',
      lens: 'Arri Master Macro 100mm',
      description: 'Focalisation douce revenant sur les caustiques du cristal pour raccorder de façon invisible avec la première image.',
      lighting: 'Raccord colorimétrique au pixel près pour boucle infinie'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121218] border border-white/15 p-6 md:p-8 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                Dossier de Production Audiovisuelle
              </span>
              <h3 className="text-2xl font-editorial text-white">
                Fiche Technique du Film Cinématique 3D
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Asset Slot Status */}
        <div className="mb-6 p-4 bg-black/50 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <div className="text-xs font-mono text-zinc-200">
                Emplacement Fichier : <code className="text-[#D4AF37]">/public/videos/hero.mp4</code>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Prêt pour intégration immédiate de rendu MP4 / WebM Ultra HD 60fps
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono uppercase px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 whitespace-nowrap">
            Slot Actif & Prêt
          </span>
        </div>

        {/* Master Prompt Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Prompt IA & Pipeline de Rendu 3D (Sora / Runway / Unreal Engine 5.4)
            </span>
            <button
              onClick={copyPrompt}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#D4AF37] hover:text-white bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copié dans le presse-papier !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-black/60 border border-white/10 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {masterPrompt}
          </pre>
        </div>

        {/* Shot by Shot Storyboard */}
        <div>
          <h4 className="text-sm uppercase font-mono tracking-wider text-zinc-300 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            Storyboard & Découpage Technique Plan par Plan
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storyboardShots.map((item, idx) => (
              <div key={idx} className="p-4 bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">{item.shot}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{item.lens}</span>
                </div>
                <h5 className="text-sm font-medium text-white mb-1.5">{item.title}</h5>
                <p className="text-xs text-zinc-400 leading-relaxed mb-2.5">{item.description}</p>
                <div className="text-[10px] text-zinc-400 pt-2 border-t border-white/5 flex items-center gap-1">
                  <Aperture className="w-3 h-3 text-[#D4AF37]" />
                  <span>Éclairage : {item.lighting}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#D4AF37] text-black font-medium text-xs tracking-wider uppercase hover:bg-[#AA820A] transition-colors cursor-pointer"
          >
            Fermer le Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
