import lumiAsset0 from '../assets/images/product_perfume_elixir_1792768475631.jpg';
import lumiAsset1 from '../assets/images/hero_editorial_lumiere_1792768475045.jpg';
import lumiAsset2 from '../assets/images/collection_leather_goods_1792768477250.jpg';
import lumiAsset3 from '../assets/images/collection_haute_horlogerie_1792768477398.jpg';
import lumiAsset4 from '../assets/images/collection_haute_couture_1792768476829.jpg';
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. FLAGSHIP HERO 3D PERFUME
  {
    id: 'lum-perf-01',
    slug: 'elixir-de-lumiere',
    name: 'Élixir de Lumière',
    subtitle: 'Extrait de Parfum Absolu 100ml',
    category: 'parfumerie',
    categoryLabel: 'Haute Parfumerie',
    priceMAD: 2450,
    originalPriceMAD: 2800,
    rating: 4.95,
    reviewsCount: 142,
    image: lumiAsset0,
    galleryImages: [
      lumiAsset0,
      lumiAsset1,
    ],
    description: "Le chef-d'œuvre olfactif de la Maison Lumière. Une création solaire et mystérieuse sculptée dans un flacon de cristal facetté à la main, surmonté d'un bouchon en laiton brossé lourd d'or. Une harmonie vibrante de bergamote de Calabre, de fleur d'oranger du Maroc et de vanille bourbon fumée.",
    details: {
      origin: 'Grasse & Marrakech',
      composition: 'Alcool d’origine végétale, concentré de parfum (32% absolu), huiles essentielles pures.',
      notes: {
        top: ['Bergamote royale de Calabre', 'Cardamome verte', 'Zeste de mandarine sanguine'],
        heart: ['Fleur d’oranger de l’Ourika', 'Iris précieux de Florence', 'Jasmin Sambac'],
        base: ['Ambre gris solaire', 'Oud d’Atlas', 'Vanille bourbon fumée', 'Bois de cèdre noble']
      },
      dimensions: '100ml - Flacon en cristal épais et bouchon métal plein',
      careInstructions: 'Conserver à l’abri de la lumière directe du soleil et des variations thermiques.'
    },
    variants: [
      { id: 'v-50ml', name: 'Flacon 50 ml', type: 'volume', value: '50ml', priceModifierMAD: -650 },
      { id: 'v-100ml', name: 'Flacon 100 ml (Original)', type: 'volume', value: '100ml', priceModifierMAD: 0 },
      { id: 'v-200ml', name: 'Écrin Prestige 200 ml', type: 'volume', value: '200ml', priceModifierMAD: 1200 },
      { id: 'v-gold', name: 'Bouchon Or Solaire', type: 'finish', value: 'Or Solaire' },
      { id: 'v-dark', name: 'Bouchon Noir Ruthenium', type: 'finish', value: 'Noir Ruthenium', priceModifierMAD: 150 },
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isNew: true,
    has3DModel: true,
    modelType: 'perfume',
    tags: ['Bestseller', 'Édition Signature', 'Modèle 3D']
  },

  // 2. AMBRE NOIR SOUVERAIN
  {
    id: 'lum-perf-02',
    slug: 'ambre-noir-souverain',
    name: 'Ambre Noir Souverain',
    subtitle: 'Eau de Parfum Intense',
    category: 'parfumerie',
    categoryLabel: 'Haute Parfumerie',
    priceMAD: 2200,
    rating: 4.88,
    reviewsCount: 89,
    image: lumiAsset0,
    galleryImages: [lumiAsset0],
    description: "Une plongée envoûtante dans la pénombre des palais impériaux. Les volutes d'encens sacré se mêlent à la chaleur animale d'un ambre sombre et au cuir vieilli patiné à la cire d'abeille.",
    details: {
      origin: 'Atelier de Grasse',
      composition: 'Concentré de parfum 28%, alcool biologique certifié.',
      notes: {
        top: ['Poivre noir de Madagascar', 'Encens d’Oman'],
        heart: ['Résine de myrrhe', 'Tabac blond séché', 'Rose noire'],
        base: ['Ambre noir profond', 'Cuir de Russie', 'Patchouli vieilli']
      },
      dimensions: '100ml',
      careInstructions: 'Vaporiser délicatement sur les points de pulsation.'
    },
    variants: [
      { id: 'v-50ml-amb', name: '50 ml', type: 'volume', value: '50ml', priceModifierMAD: -500 },
      { id: 'v-100ml-amb', name: '100 ml', type: 'volume', value: '100ml', priceModifierMAD: 0 },
    ],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    tags: ['Intense', 'Unisexe']
  },

  // 3. ROSE DU CRÉPUSCULE
  {
    id: 'lum-perf-03',
    slug: 'rose-du-crepuscule',
    name: 'Rose du Crépuscule',
    subtitle: 'Extrait Floral Boisé',
    category: 'parfumerie',
    categoryLabel: 'Haute Parfumerie',
    priceMAD: 2350,
    rating: 4.92,
    reviewsCount: 64,
    image: lumiAsset0,
    galleryImages: [lumiAsset0],
    description: "La rose de Kelâat M'Gouna cueillie à la rosée de l'aube, sublimée au crépuscule par des bois précieux fumés et une touche d'ambre rose luminescent.",
    details: {
      origin: 'Vallée des Roses & Paris',
      notes: {
        top: ['Poivre rose', 'Pétales de rose Centifolia'],
        heart: ['Rose de Damas', 'Framboise sauvage'],
        base: ['Musc blanc soyeux', 'Bois de santal blanc']
      }
    },
    variants: [
      { id: 'v-50ml-rose', name: '50 ml', type: 'volume', value: '50ml', priceModifierMAD: -600 },
      { id: 'v-100ml-rose', name: '100 ml', type: 'volume', value: '100ml', priceModifierMAD: 0 },
    ],
    inStock: true,
    stockCount: 15,
    tags: ['Floral', 'Romantique']
  },

  // 4. BOIS SACRÉ D'ATLAS
  {
    id: 'lum-perf-04',
    slug: 'bois-sacre-atlas',
    name: "Bois Sacré d'Atlas",
    subtitle: 'Extrait Boisé Résineux',
    category: 'parfumerie',
    categoryLabel: 'Haute Parfumerie',
    priceMAD: 2600,
    rating: 4.97,
    reviewsCount: 110,
    image: lumiAsset0,
    galleryImages: [lumiAsset0],
    description: "Un hommage majestueux aux forêts millénaires du Moyen Atlas. Le bois de cèdre majestueux s'allie au pin sylvestre et au benjoin du Siam dans une composition d'une noblesse rare.",
    details: {
      origin: 'Ifrane & Paris',
      notes: {
        top: ['Aiguilles de pin', 'Cyprès bleu'],
        heart: ['Cèdre de l’Atlas pur', 'Clou de girofle'],
        base: ['Benjoin du Siam', 'Vétiver d’Haïti', 'Mousse de chêne']
      }
    },
    variants: [
      { id: 'v-100ml-ced', name: '100 ml', type: 'volume', value: '100ml', priceModifierMAD: 0 },
    ],
    inStock: true,
    stockCount: 9,
    tags: ['Boisé', 'Signature']
  },

  // 5. NÉROLI IMPÉRIAL
  {
    id: 'lum-perf-05',
    slug: 'neroli-imperial',
    name: 'Néroli Impérial',
    subtitle: 'Eau Fraîche Royale 100ml',
    category: 'parfumerie',
    categoryLabel: 'Haute Parfumerie',
    priceMAD: 1950,
    rating: 4.85,
    reviewsCount: 42,
    image: lumiAsset0,
    galleryImages: [lumiAsset0],
    description: "Une explosion de fraîcheur aristocratique. Fleurs de bigaradier récoltées à la main sous le soleil méditerranéen, vivifiées par le pamplemousse rose et la menthe blanche.",
    details: {
      origin: 'Cap Bon & Grasse',
      notes: {
        top: ['Petit-grain bigarade', 'Pamplemousse'],
        heart: ['Néroli pur', 'Fleur d’oranger'],
        base: ['Muscs cristallins', 'Cèdre clair']
      }
    },
    variants: [
      { id: 'v-100ml-ner', name: '100 ml', type: 'volume', value: '100ml', priceModifierMAD: 0 },
    ],
    inStock: true,
    stockCount: 22,
    tags: ['Fraîcheur', 'Été']
  },

  // 6. SAC TALISMAN NOIR VEAU GRAINÉ
  {
    id: 'lum-maroq-01',
    slug: 'sac-talisman-noir',
    name: 'Sac Talisman Noir',
    subtitle: 'Veau Pleine Fleur & Laiton Brossé',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie d’Exception',
    priceMAD: 8900,
    originalPriceMAD: 9500,
    rating: 4.98,
    reviewsCount: 76,
    image: lumiAsset2,
    galleryImages: [
      lumiAsset2,
      lumiAsset1,
    ],
    description: "Façonné à la main par nos maîtres selliers dans un cuir de veau grainé noir d'une tenue remarquable. Sa signature : un fermoir architectural sculpté en laiton massif finition champagne or, symbole de protection et d'élégance intemporelle.",
    details: {
      origin: 'Ateliers de Casablanca & Florence',
      composition: '100% Cuir de veau taurillon tanné végétal, doublure agneau plongé beige.',
      dimensions: '26 cm x 18 cm x 9 cm (Bandoulière amovible réglable 110 cm)'
    },
    variants: [
      { id: 'v-black-gold', name: 'Noir Ébène & Or', type: 'color', value: 'Noir Ébène & Or' },
      { id: 'v-cognac', name: 'Cognac Impérial', type: 'color', value: 'Cognac Impérial', priceModifierMAD: 0 },
      { id: 'v-chalk', name: 'Craie Saharienne', type: 'color', value: 'Craie Saharienne', priceModifierMAD: 300 },
    ],
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isNew: true,
    tags: ['Pièce Maîtresse', 'Savoir-Faire']
  },

  // 7. CABAS ROYAL PALACE TOILE & CUIR
  {
    id: 'lum-maroq-02',
    slug: 'cabas-royal-palace',
    name: 'Cabas Royal Palace',
    subtitle: 'Toile de Lin Épaisse & Cuir Fauve',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie d’Exception',
    priceMAD: 6400,
    rating: 4.91,
    reviewsCount: 53,
    image: lumiAsset2,
    galleryImages: [lumiAsset2],
    description: "Le compagnon idéal des voyages et journées d'escapade. Toile jacquard sergée de lin et coton imperméabilisée, ornée de brides en cuir sellerie teinté dans la masse et coutures point sellier.",
    details: {
      origin: 'Marrakech',
      composition: 'Toile 70% lin 30% coton, garnitures cuir végétal.',
      dimensions: '42 cm x 32 cm x 16 cm'
    },
    variants: [
      { id: 'v-cabas-naturel', name: 'Lin Naturel & Fauve', type: 'color', value: 'Lin & Fauve' },
      { id: 'v-cabas-noir', name: 'Toile Noire & Cuir Noir', type: 'color', value: 'Total Black' },
    ],
    inStock: true,
    stockCount: 11,
    tags: ['Voyage', 'Weekend']
  },

  // 8. BESACE SOIRÉE FERMOIR OR
  {
    id: 'lum-maroq-03',
    slug: 'besace-soiree-or',
    name: 'Besace Soirée Fermoir Or',
    subtitle: 'Cuir Lisse Satiné & Chaîne Gourmette',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie d’Exception',
    priceMAD: 5800,
    rating: 4.89,
    reviewsCount: 38,
    image: lumiAsset2,
    galleryImages: [lumiAsset2],
    description: "Pochette sculpturale conçue pour illuminer les réceptions nocturnes. Fermoir graphique à ressort dissimulé et chaîne bijou amovible polie miroir.",
    details: {
      origin: 'Casablanca',
      composition: 'Cuir box lisse verni mat, pièces métalliques dorées à l’or fin.',
      dimensions: '22 cm x 14 cm x 5 cm'
    },
    variants: [
      { id: 'v-noir-lisse', name: 'Noir Minuit', type: 'color', value: 'Noir Minuit' },
      { id: 'v-bordeaux', name: 'Bordeaux Impérial', type: 'color', value: 'Bordeaux Impérial' },
    ],
    inStock: true,
    stockCount: 8,
    tags: ['Soirée', 'Élégance']
  },

  // 9. PORTEFEUILLE COMPACT CROCO REHAUSSÉ
  {
    id: 'lum-maroq-04',
    slug: 'portefeuille-compact-croco',
    name: 'Portefeuille Compact Écrin',
    subtitle: 'Cuir Embossé Crocodile & Zip Doré',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie d’Exception',
    priceMAD: 2200,
    rating: 4.82,
    reviewsCount: 61,
    image: lumiAsset2,
    galleryImages: [lumiAsset2],
    description: "Une ergonomie parfaite qui se glisse dans chaque poche ou sac. Cuir texturé résistant aux éraflures avec 8 fentes cartes et compartiment zippé.",
    details: {
      origin: 'Ateliers Lumière',
      dimensions: '11 cm x 9 cm x 2 cm'
    },
    variants: [
      { id: 'v-port-noir', name: 'Noir Profond', type: 'color', value: 'Noir' },
      { id: 'v-port-vert', name: 'Vert Forêt', type: 'color', value: 'Vert Forêt' },
    ],
    inStock: true,
    stockCount: 25,
    tags: ['Accessoire', 'Cadeau']
  },

  // 10. CHRONOGRAPHE SQUELETTE TITANE & OR ROSE
  {
    id: 'lum-horl-01',
    slug: 'chronographe-squelette-titane',
    name: 'Chronographe Squelette Tourbillon',
    subtitle: 'Calibre Automatique Manufacturé 42mm',
    category: 'horlogerie',
    categoryLabel: 'Haute Horlogerie',
    priceMAD: 48500,
    originalPriceMAD: 52000,
    rating: 5.0,
    reviewsCount: 29,
    image: lumiAsset3,
    galleryImages: [
      lumiAsset3,
    ],
    description: "Une prouesse micromécanique célébrant l'avant-garde horlogère. Boîtier bi-matière en titane grade 5 sablé et lunette en or rose 18 carats. Cadran squeletté laissant admirer les rouages du tourbillon volant battant à 28'800 alternances par heure.",
    details: {
      origin: 'Genève & Paris',
      composition: 'Boîtier titane grade 5, lunette or rose 750/1000, verre saphir double antireflet.',
      dimensions: 'Diamètre 42 mm, Épaisseur 11.8 mm, Étanchéité 50m (5 ATM)',
      careInstructions: 'Révision conseillée tous les 4 ans dans nos salons agréés.'
    },
    variants: [
      { id: 'v-bracelet-alligator', name: 'Bracelet Cuir Alligator Anthracite', type: 'finish', value: 'Alligator Anthracite' },
      { id: 'v-bracelet-titane', name: 'Bracelet Titane Maillons Intégrés', type: 'finish', value: 'Titane Intégré', priceModifierMAD: 4500 },
    ],
    inStock: true,
    stockCount: 3,
    isFeatured: true,
    tags: ['Haute Horlogerie', 'Édition Limitée']
  },

  // 11. BRACELET JONC RAYON DE LUMIÈRE
  {
    id: 'lum-horl-02',
    slug: 'bracelet-jonc-rayon-lumiere',
    name: 'Jonc Rayon de Lumière',
    subtitle: 'Or Jaune 18k Brossé & Diamants Noirs',
    category: 'horlogerie',
    categoryLabel: 'Joaillerie & Horlogerie',
    priceMAD: 14200,
    rating: 4.96,
    reviewsCount: 47,
    image: lumiAsset3,
    galleryImages: [lumiAsset3],
    description: "Un ruban d'or brossé artisanalement, serti de 12 diamants noirs taille brillant évoquant les constellations célestes du désert de Merzouga.",
    details: {
      origin: 'Ateliers de Joaillerie Paris',
      composition: 'Or 18 carats (750 millièmes), 12 diamants taille brillant (0.48 ct au total).',
      dimensions: 'Taille ajustable (Circonférence 16 à 18 cm)'
    },
    variants: [
      { id: 'v-jonc-or-jaune', name: 'Or Jaune 18k', type: 'color', value: 'Or Jaune' },
      { id: 'v-jonc-or-blanc', name: 'Or Blanc 18k', type: 'color', value: 'Or Blanc', priceModifierMAD: 800 },
    ],
    inStock: true,
    stockCount: 7,
    tags: ['Joaillerie', 'Diamants']
  },

  // 12. BAGUE SOLITAIRE ÉMERAUDE DE L'ATLAS
  {
    id: 'lum-horl-03',
    slug: 'bague-emeraude-atlas',
    name: "Solitaire Émeraude d'Atlas",
    subtitle: 'Émeraude Ovale 2.4ct & Platine 950',
    category: 'horlogerie',
    categoryLabel: 'Joaillerie & Horlogerie',
    priceMAD: 29500,
    rating: 4.97,
    reviewsCount: 22,
    image: lumiAsset3,
    galleryImages: [lumiAsset3],
    description: "Une émeraude naturelle d'un vert profond hypnotisant, montée sur un corps de bague en platine pur à double griffes effilées.",
    details: {
      origin: 'Paris',
      composition: 'Platine 950/1000, Émeraude naturelle non traitée 2.40 carats, certificat gemmologique fourni.'
    },
    variants: [
      { id: 'v-taille-52', name: 'Taille 52', type: 'size', value: '52' },
      { id: 'v-taille-54', name: 'Taille 54', type: 'size', value: '54' },
      { id: 'v-taille-56', name: 'Taille 56', type: 'size', value: '56' },
    ],
    inStock: true,
    stockCount: 2,
    tags: ['Pièce Unique', 'Prestige']
  },

  // 13. COLLIER RAS-DU-COU SOLEIL D'OR
  {
    id: 'lum-horl-04',
    slug: 'collier-soleil-dor',
    name: 'Collier Soleil d’Or',
    subtitle: 'Maille Forçat & Médaille Martelée',
    category: 'horlogerie',
    categoryLabel: 'Joaillerie & Horlogerie',
    priceMAD: 9800,
    rating: 4.88,
    reviewsCount: 35,
    image: lumiAsset3,
    galleryImages: [lumiAsset3],
    description: "Une médaille d'or texturée à la main selon la technique ancestrale du martelage, capturant chaque éclat de lumière avec une douceur organique.",
    details: {
      origin: 'Casablanca',
      composition: 'Or 18 carats (750/1000), longueur chaîne 42 cm.'
    },
    variants: [
      { id: 'v-col-or', name: 'Or Jaune Brossé', type: 'color', value: 'Or Jaune' },
    ],
    inStock: true,
    stockCount: 10,
    tags: ['Intemporel']
  },

  // 14. MANTEAU ARCHITECTURAL EN CACHEMIRE NOIR
  {
    id: 'lum-cout-01',
    slug: 'manteau-architectural-cachemire',
    name: 'Manteau Architectural en Cachemire',
    subtitle: 'Double Face Pur Cachemire & Lignes Épurées',
    category: 'couture',
    categoryLabel: 'Haute Couture',
    priceMAD: 16800,
    originalPriceMAD: 18500,
    rating: 4.97,
    reviewsCount: 54,
    image: lumiAsset4,
    galleryImages: [
      lumiAsset4,
      lumiAsset1,
    ],
    description: "La pureté sculpturale incarnée. Confectionné dans un tissu double face 100% pur cachemire de Mongolie, cousu main sans doublure pour un tombé vaporeux et une douceur sans égale. Col tailleur minimaliste et boutonnage invisible.",
    details: {
      origin: 'Ateliers de Paris',
      composition: '100% Pur Cachemire double-face, boutons corne véritable.',
      careInstructions: 'Nettoyage à sec spécialisé chez un maître teinturier.'
    },
    variants: [
      { id: 'v-sz-36', name: 'Taille 36 (FR)', type: 'size', value: '36' },
      { id: 'v-sz-38', name: 'Taille 38 (FR)', type: 'size', value: '38' },
      { id: 'v-sz-40', name: 'Taille 40 (FR)', type: 'size', value: '40' },
      { id: 'v-sz-42', name: 'Taille 42 (FR)', type: 'size', value: '42' },
    ],
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isNew: true,
    tags: ['Couture', 'Cachemire Noble']
  },

  // 15. ROBE DRAPÉE EN SOIE DORÉE
  {
    id: 'lum-cout-02',
    slug: 'robe-drapee-soie-doree',
    name: 'Robe Drapée en Soie Dorée',
    subtitle: 'Crêpe de Soie Lourde & Corsage Structuré',
    category: 'couture',
    categoryLabel: 'Haute Couture',
    priceMAD: 14500,
    rating: 4.99,
    reviewsCount: 68,
    image: lumiAsset1,
    galleryImages: [
      lumiAsset1,
      lumiAsset4,
    ],
    description: "Une silhouette de déesse contemporaine. Drapé sculptural réalisé à la main sur mannequin en crêpe de soie italienne champagne doré, avec traîne fluide asymétrique et taille marquée par un corset baleiné invisible.",
    details: {
      origin: 'Paris & Marrakech',
      composition: '100% Crêpe de Chine de soie naturelle 40 mommes.',
      careInstructions: 'Pressing de luxe uniquement.'
    },
    variants: [
      { id: 'v-robe-36', name: 'Taille 36', type: 'size', value: '36' },
      { id: 'v-robe-38', name: 'Taille 38', type: 'size', value: '38' },
      { id: 'v-robe-40', name: 'Taille 40', type: 'size', value: '40' },
    ],
    inStock: true,
    stockCount: 4,
    isFeatured: true,
    tags: ['Gala', 'Couture Signature']
  },

  // 16. VESTE SMOKING TAILLEUR
  {
    id: 'lum-cout-03',
    slug: 'veste-smoking-tailleur',
    name: 'Veste Smoking Tailleur Soirée',
    subtitle: 'Laine Froide Super 150 & Revers Satin',
    category: 'couture',
    categoryLabel: 'Haute Couture',
    priceMAD: 9200,
    rating: 4.90,
    reviewsCount: 31,
    image: lumiAsset4,
    galleryImages: [lumiAsset4],
    description: "L'allure androgyne absolue. Veste tailleur croisée aux épaules nettes, confectionnée en drap de laine vierge et parements en satin duchesse.",
    details: {
      origin: 'Paris',
      composition: '100% Laine Super 150s, doublure en sergé de soie.',
    },
    variants: [
      { id: 'v-smok-38', name: 'Taille 38', type: 'size', value: '38' },
      { id: 'v-smok-40', name: 'Taille 40', type: 'size', value: '40' },
      { id: 'v-smok-42', name: 'Taille 42', type: 'size', value: '42' },
    ],
    inStock: true,
    stockCount: 8,
    tags: ['Smoking', 'Iconique']
  },

  // 17. CHEMISE EN SOIE NATURELLE VOLUTE
  {
    id: 'lum-cout-04',
    slug: 'chemise-soie-volute',
    name: 'Chemise en Soie Volute',
    subtitle: 'Satin de Soie Crème & Col Lavallière',
    category: 'couture',
    categoryLabel: 'Haute Couture',
    priceMAD: 4900,
    rating: 4.86,
    reviewsCount: 45,
    image: lumiAsset4,
    galleryImages: [lumiAsset4],
    description: "Élégance fluide pour le jour et le soir. Satin de soie lavé offrant un toucher soyeux mat, poignets mousquetaires et ruban amovible.",
    details: {
      origin: 'Casablanca',
      composition: '100% Soie de mûrier.'
    },
    variants: [
      { id: 'v-chem-s', name: 'Taille S', type: 'size', value: 'S' },
      { id: 'v-chem-m', name: 'Taille M', type: 'size', value: 'M' },
      { id: 'v-chem-l', name: 'Taille L', type: 'size', value: 'L' },
    ],
    inStock: true,
    stockCount: 14,
    tags: ['Soie Pure']
  },

  // 18. BOUGIE SCULPTURALE CIRE VÉGÉTALE 500G
  {
    id: 'lum-mais-01',
    slug: 'bougie-sculpturale-500g',
    name: 'Bougie Sculpturale Cire Végétale',
    subtitle: 'Céramique Noire Mate & Notes Oud Solaire',
    category: 'maison',
    categoryLabel: 'Objets de Maison',
    priceMAD: 1250,
    rating: 4.93,
    reviewsCount: 112,
    image: lumiAsset0,
    galleryImages: [lumiAsset0],
    description: "Coulée à la main dans un pot en grès émaillé noir mat fabriqué par nos céramistes à Safi. Trois mèches en coton pur pour 80 heures de combustion embaumant votre intérieur d'effluves d'ambre chaud et de bois de santal.",
    details: {
      origin: 'Safi & Grasse',
      composition: '100% Cire de soja et coco sans OGM, parfums de Grasse sans phtalates.',
      dimensions: '500g - Diamètre 13 cm x Hauteur 11 cm - Durée 80h'
    },
    variants: [
      { id: 'v-boug-oud', name: 'Parfum Oud Solaire', type: 'finish', value: 'Oud Solaire' },
      { id: 'v-boug-fig', name: 'Parfum Figue Sauvage & Cèdre', type: 'finish', value: 'Figue & Cèdre' },
    ],
    inStock: true,
    stockCount: 30,
    tags: ['Maison', 'Artisanat']
  },

  // 19. DIFFUSEUR CÉRAMIQUE NOIRE & LAITON
  {
    id: 'lum-mais-02',
    slug: 'diffuseur-ceramique-laiton',
    name: 'Diffuseur Architectural Laiton',
    subtitle: 'Nébulisation à Froid & Écrin Laiton Brossé',
    category: 'maison',
    categoryLabel: 'Objets de Maison',
    priceMAD: 2800,
    rating: 4.95,
    reviewsCount: 34,
    image: lumiAsset2,
    galleryImages: [lumiAsset2],
    description: "Une pièce de design contemporain qui purifie et parfume l'atmosphère sans eau ni chaleur, préservant l'intégrité des huiles essentielles les plus nobles.",
    details: {
      origin: 'Casablanca',
      dimensions: 'Hauteur 24 cm, socle 10 cm'
    },
    variants: [
      { id: 'v-diff-or', name: 'Laiton Or Doré', type: 'color', value: 'Laiton Or' },
      { id: 'v-diff-noir', name: 'Laiton Patiné Noir', type: 'color', value: 'Noir Patiné' },
    ],
    inStock: true,
    stockCount: 16,
    tags: ['Design', 'Bien-être']
  },

  // 20. COFFRET DÉGUSTATION THÉ PRÉCIEUX
  {
    id: 'lum-mais-03',
    slug: 'coffret-the-precieux',
    name: 'Coffret Grand Cru Thé de l’Atlas',
    subtitle: 'Boîtes Laquées & Sélection Rares Récoltes',
    category: 'maison',
    categoryLabel: 'Objets de Maison',
    priceMAD: 1650,
    rating: 4.88,
    reviewsCount: 52,
    image: lumiAsset0,
    galleryImages: [lumiAsset0],
    description: "Quatre thés d'exception sélectionnés auprès de micro-plantations : Thé Blanc Jasmin Impérial, Menthe Nanah Sauvage des montagnes, Oolong Ambré et Thé Noir Rose & Safran de Taliouine.",
    details: {
      origin: 'Maroc & Asie',
      composition: '4 boîtes hermétiques de 60g, cuillère mesure en laiton martelé.'
    },
    variants: [
      { id: 'v-the-standard', name: 'Coffret 4 Thés', type: 'volume', value: '4x60g' },
    ],
    inStock: true,
    stockCount: 20,
    tags: ['Gastronomie', 'Cadeau']
  },

  // 21. COUPE EN MARBRE NOIR POLI
  {
    id: 'lum-mais-04',
    slug: 'coupe-marbre-noir-poli',
    name: 'Coupe Sculpturale en Marbre Marquina',
    subtitle: 'Marbre Noir Massif Taillé dans la Masse',
    category: 'maison',
    categoryLabel: 'Objets de Maison',
    priceMAD: 3200,
    rating: 4.96,
    reviewsCount: 19,
    image: lumiAsset2,
    galleryImages: [lumiAsset2],
    description: "Chaque pièce est unique, révélant les veinures blanches naturelles du marbre noir espagnol Marquina. Finition polie satinée à la main.",
    details: {
      origin: 'Ateliers de Marrakech',
      dimensions: 'Diamètre 30 cm x Hauteur 8 cm, Poids 4.2 kg'
    },
    variants: [
      { id: 'v-marbre-unique', name: 'Marbre Nero Marquina', type: 'color', value: 'Noir Veiné' },
    ],
    inStock: true,
    stockCount: 7,
    tags: ['Art de la Table', 'Sculpture']
  },

  // 22. GANTS EN AGNEAU PLONGÉ & CACHEMIRE
  {
    id: 'lum-maroq-05',
    slug: 'gants-agneau-plonge',
    name: 'Gants en Agneau Plongé Doublés Cachemire',
    subtitle: 'Cuir Ultra Souple & Finition Clous Dorés',
    category: 'maroquinerie',
    categoryLabel: 'Maroquinerie d’Exception',
    priceMAD: 1850,
    rating: 4.89,
    reviewsCount: 28,
    image: lumiAsset2,
    galleryImages: [lumiAsset2],
    description: "Une seconde peau protectrice. Cuir d'agneau pleine fleur d'une souplesse incomparable avec doublure tricotée en 100% pur cachemire écru.",
    details: {
      origin: 'Casablanca',
      composition: 'Cuir d’agneau nappa, doublure 100% cachemire.'
    },
    variants: [
      { id: 'v-gant-7', name: 'Taille 7', type: 'size', value: '7' },
      { id: 'v-gant-75', name: 'Taille 7.5', type: 'size', value: '7.5' },
      { id: 'v-gant-8', name: 'Taille 8', type: 'size', value: '8' },
    ],
    inStock: true,
    stockCount: 18,
    tags: ['Accessoire Hiver']
  },

  // 23. ÉTOLE EN TWILL DE SOIE IMPRIMÉE
  {
    id: 'lum-cout-05',
    slug: 'etole-twill-soie-lumieres',
    name: 'Étole en Twill de Soie « Constellation »',
    subtitle: 'Carré 90x90cm Roulotté Main',
    category: 'couture',
    categoryLabel: 'Haute Couture',
    priceMAD: 2900,
    rating: 4.94,
    reviewsCount: 41,
    image: lumiAsset1,
    galleryImages: [lumiAsset1],
    description: "Dessinée à la plume dans nos ateliers parisiens, représentant les zelliges géométriques fusionnés aux constellations du ciel saharien. Roulotté à la française confectionné à la main.",
    details: {
      origin: 'Lyon & Paris',
      composition: '100% Soie de mûrier 16 mommes.',
      dimensions: '90 cm x 90 cm'
    },
    variants: [
      { id: 'v-soie-nuit', name: 'Bleu Nuit & Or', type: 'color', value: 'Bleu Nuit & Or' },
      { id: 'v-soie-sable', name: 'Sable Doré & Ébène', type: 'color', value: 'Sable & Ébène' },
    ],
    inStock: true,
    stockCount: 22,
    tags: ['Soie', 'Cadeau Idéal']
  },

  // 24. COFFRET DÉCOUVERTE EXTRAITS DE PARFUM
  {
    id: 'lum-perf-06',
    slug: 'coffret-decouverte-extraits',
    name: 'Coffret Découverte 5 Extraits Absolus',
    subtitle: '5 x 10ml en Vaporisateurs Sac Cuir',
    category: 'parfumerie',
    categoryLabel: 'Haute Parfumerie',
    priceMAD: 1800,
    originalPriceMAD: 2100,
    rating: 4.98,
    reviewsCount: 189,
    image: lumiAsset0,
    galleryImages: [
      lumiAsset0,
      lumiAsset2
    ],
    description: "L'initiation idéale à l'univers olfactif de Lumière Store. Contient nos 5 fragrances phares (Élixir de Lumière, Ambre Noir, Rose du Crépuscule, Bois Sacré, Néroli Impérial) présentées dans des étuis en cuir véritable rechargeables.",
    details: {
      origin: 'Grasse & Casablanca',
      dimensions: '5 vaporisateurs nomades de 10ml avec étuis cuir.'
    },
    variants: [
      { id: 'v-coff-cuir-noir', name: 'Étuis Cuir Noir Ébène', type: 'color', value: 'Noir Ébène' },
      { id: 'v-coff-cuir-fauve', name: 'Étuis Cuir Fauve', type: 'color', value: 'Cuir Fauve' },
    ],
    inStock: true,
    stockCount: 40,
    isFeatured: true,
    isNew: true,
    tags: ['Best-seller', 'Coffret Cadeau']
  }
];

export const DISCOUNT_CODES = [
  { code: 'LUMIERE10', percentage: 10, minSpendMAD: 1000, description: '10% de réduction sur votre commande (Dès 1 000 MAD)' },
  { code: 'BIENVENUE', fixedMAD: 250, minSpendMAD: 1500, description: '250 MAD offerts pour votre première acquisition (Dès 1 500 MAD)' },
  { code: 'VIP2026', percentage: 15, minSpendMAD: 3000, description: 'Privilège VIP : 15% de réduction exclusive (Dès 3 000 MAD)' }
];
