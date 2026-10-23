import lumiAsset0 from '../../assets/images/product_perfume_elixir_1792768475631.jpg';
import lumiAsset1 from '../../assets/images/hero_editorial_lumiere_1792768475045.jpg';
import lumiAsset2 from '../../assets/images/collection_haute_horlogerie_1792768477398.jpg';
import lumiAsset3 from '../../assets/images/collection_leather_goods_1792768477250.jpg';
import React, { useState, useRef, useEffect } from 'react';
import { Hero3DPerfume } from '../3d/Hero3DPerfume';
import { StoryboardModal } from './StoryboardModal';
import { 
  Play, 
  Pause, 
  Rotate3d, 
  Film, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Eye, 
  Volume2, 
  VolumeX, 
  Maximize,
  Aperture,
  Compass
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CinematicHeroExperience: React.FC = () => {
  const { navigateTo, addToCart, products } = useStore();
  
  // Film 4K is ACTIVE BY DEFAULT as requested
  const [viewMode, setViewMode] = useState<'video' | '3d'>('video');
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(35);
  const [videoHasError, setVideoHasError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const flagshipProduct = products.find(p => p.id === 'lum-perf-01') || products[0];

  const handleQuickAdd = () => {
    if (flagshipProduct) {
      addToCart(flagshipProduct, flagshipProduct.variants[1], 1);
    }
  };

  // Cinematic Scenes for the 4K Editorial Commercial Simulation
  const cinematicScenes = [
    {
      title: "I. L'Écrin Solaire",
      subtitle: "Réflexions & Caustiques Cristallines",
      image: lumiAsset0,
      timecode: "00:00 - 00:04",
      lens: "Arri Master Macro 100mm"
    },
    {
      title: "II. L'Égérie & Le Drapé",
      subtitle: "Soie Dorée & Galeries de Calcaire",
      image: lumiAsset1,
      timecode: "00:04 - 00:08",
      lens: "Cooke Anamorphic 50mm"
    },
    {
      title: "III. Le Maître Horloger",
      subtitle: "Tourbillon Squeletté & Or Rose",
      image: lumiAsset2,
      timecode: "00:08 - 00:12",
      lens: "Leica Summilux-C 35mm"
    },
    {
      title: "IV. La Maroquinerie d'Apparat",
      subtitle: "Fermoir Laiton & Cuir Taurillon",
      image: lumiAsset3,
      timecode: "00:12 - 00:16",
      lens: "Arri Signature Prime 40mm"
    }
  ];

  // Auto-advance scenes and timeline progress when playing
  useEffect(() => {
    if (!isPlaying || viewMode !== 'video') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.5;
        if (next >= 100) {
          setCurrentSceneIndex((s) => (s + 1) % cinematicScenes.length);
          return 0;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isPlaying, viewMode, cinematicScenes.length]);

  // Subtle floating light caustics canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode !== 'video') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle warm caustics beams
      const grad = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(t * 0.4) * 0.2),
        canvas.height * (0.4 + Math.cos(t * 0.3) * 0.15),
        20,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.65
      );
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.16)');
      grad.addColorStop(0.5, 'rgba(212, 175, 55, 0.04)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle anamorphic horizontal flare
      ctx.fillStyle = 'rgba(255, 235, 175, 0.08)';
      const flareY = canvas.height * (0.45 + Math.sin(t * 0.2) * 0.05);
      ctx.fillRect(0, flareY - 1, canvas.width, 2);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [viewMode]);

  const activeScene = cinematicScenes[currentSceneIndex];

  return (
    <section className="lumi-mobile-hero relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between bg-[#0D0D11] border-b border-white/10 overflow-hidden select-none">
      
      {/* Visual Canvas Stage (Starts in Video mode by default!) */}
      <div className="relative w-full flex-1 min-h-[580px] lg:min-h-[720px]">
        {viewMode === 'video' ? (
          <div className="relative w-full h-[640px] md:h-[740px] lg:h-[820px] bg-black overflow-hidden flex items-center justify-center">
            
            {/* Real Video Element (tries to load /videos/hero.mp4) */}
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              poster={lumiAsset1}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onError={() => setVideoHasError(true)}
              className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 transition-transform duration-1000 ease-out z-0"
            />

            {/* Seamless 4K Cinematic Scene Animation (renders while video loads or as high-res commercial visual) */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeScene.image}
                alt={activeScene.title}
                className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.1] transition-all duration-1000 transform scale-105 animate-pulse"
                style={{ animationDuration: '8s' }}
              />
              
              {/* Volumetric caustics canvas overlay */}
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen opacity-70"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-black/35 to-black/30" />
              <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/70" />
            </div>

            {/* Top-Left Film Identification Overlay */}
            <div className="absolute top-8 left-6 md:top-10 md:left-12 z-20 pointer-events-none">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#D4AF37]">
                  Film Commercial 4K UHD · 60 FPS
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-editorial font-light text-white tracking-wide leading-tight">
                Objets de Désir
              </h1>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-300 mt-2">
                <span className="text-white font-medium">{activeScene.title}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400">{activeScene.subtitle}</span>
              </div>
            </div>

            {/* Floating Cinematic Controls Center/Bottom */}
            <div className="absolute bottom-20 left-6 right-6 md:left-12 md:right-12 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-auto">
              
              {/* Scene Indicator & Timecode */}
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 font-mono text-xs">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Mettre en pause' : 'Lecture'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="text-zinc-400">Timecode :</span>
                <span className="text-white font-semibold">{activeScene.timecode}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[11px] text-zinc-400 hidden sm:inline">{activeScene.lens}</span>
              </div>

              {/* Scene Navigation Dots */}
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-2">
                <span className="text-[10px] uppercase font-mono text-zinc-400 mr-1">Plans :</span>
                {cinematicScenes.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSceneIndex(idx);
                      setProgress(0);
                    }}
                    className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                      currentSceneIndex === idx
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'text-zinc-400 hover:text-white bg-white/5'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Direct Switcher to 3D Studio Button */}
              <button
                onClick={() => setViewMode('3d')}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#D4AF37]/20 whitespace-nowrap"
              >
                <Rotate3d className="w-4 h-4" />
                <span>Interagir en Studio 3D</span>
              </button>

            </div>

            {/* Bottom Timeline Scrubber Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-20">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-300 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>
        ) : (
          <Hero3DPerfume 
            onAddToCart={handleQuickAdd}
            onExploreCollection={() => navigateTo('boutique')}
          />
        )}

        {/* Top-Right Mode Switcher Pill */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-30 flex items-center gap-1.5 p-1 bg-black/70 backdrop-blur-md border border-white/15">
          <button
            onClick={() => setViewMode('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer ${
              viewMode === 'video'
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Film 4K (Défaut)</span>
          </button>

          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer ${
              viewMode === '3d'
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>Studio 3D</span>
          </button>

          <button
            onClick={() => setIsStoryboardOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-zinc-400 hover:text-[#D4AF37] transition-colors border-l border-white/10 cursor-pointer ml-1"
            title="Consulter le storyboard et le prompt cinématographique"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Dossier</span>
          </button>
        </div>
      </div>

      {/* Editorial Bottom Strip & Quick Action Bar */}
      <div className="relative z-10 w-full bg-[#111116] border-t border-white/10 px-6 py-6 md:px-12 md:py-7">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Brand Manifesto Statement */}
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono block mb-1">
              Manifeste Créatif · Maison Lumière
            </span>
            <p className="text-base md:text-lg font-editorial text-zinc-200 leading-snug">
              « Chaque création est une sculpture intime, façonnée entre l’exigence de la haute parfumerie parisienne et l’artisanat d’art marocain. »
            </p>
          </div>

          {/* Quick Dual Action CTA */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => navigateTo('fiche_produit', 'lum-perf-01')}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#D4AF37]" />
              <span>Découvrir l'Objet</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-2 px-7 py-3 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer shadow-lg shadow-[#D4AF37]/10"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acquérir l'Élixir · 2 450 MAD</span>
            </button>
          </div>

        </div>
      </div>

      {/* Storyboard & Production Modal */}
      <StoryboardModal 
        isOpen={isStoryboardOpen}
        onClose={() => setIsStoryboardOpen(false)}
      />
    </section>
  );
};
