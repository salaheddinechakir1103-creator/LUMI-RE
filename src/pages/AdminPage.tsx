import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, OrderStatus } from '../types';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Edit3, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Check, 
  X, 
  AlertCircle,
  Truck,
  Tag
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    updateOrderStatus, 
    updateProductStock, 
    updateProductPrice, 
    addNewProduct, 
    deleteProduct, 
    resetToDefaultData,
    navigateTo 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'kpi' | 'orders' | 'products' | 'discounts'>('kpi');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceValue, setTempPriceValue] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    subtitle: '',
    category: 'parfumerie' as ProductCategory,
    priceMAD: 2500,
    stockCount: 15,
    description: '',
    origin: 'Marrakech & Grasse'
  });

  // KPI Calculations
  const totalRevenueMAD = orders.reduce((acc, o) => acc + o.totalMAD, 0);
  const totalOrdersCount = orders.length;
  const averageOrderValueMAD = totalOrdersCount > 0 ? Math.round(totalRevenueMAD / totalOrdersCount) : 0;
  const lowStockProducts = products.filter(p => p.stockCount <= 5);

  const handleSaveStock = (prodId: string) => {
    updateProductStock(prodId, Number(tempStockValue));
    setEditingStockId(null);
  };

  const handleSavePrice = (prodId: string) => {
    updateProductPrice(prodId, Number(tempPriceValue));
    setEditingPriceId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: Product = {
      id: `lum-custom-${Date.now()}`,
      slug: newProd.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: newProd.name,
      subtitle: newProd.subtitle || 'Création d’Atelier',
      category: newProd.category,
      categoryLabel: newProd.category === 'parfumerie' ? 'Haute Parfumerie' : 'Maroquinerie d’Exception',
      priceMAD: Number(newProd.priceMAD),
      rating: 5.0,
      reviewsCount: 1,
      image: '/src/assets/images/product_perfume_elixir_1792768475631.jpg',
      galleryImages: ['/src/assets/images/product_perfume_elixir_1792768475631.jpg'],
      description: newProd.description || 'Création façonnée sur mesure dans nos ateliers.',
      details: {
        origin: newProd.origin,
      },
      variants: [
        { id: 'v-std', name: 'Format Standard', type: 'volume', value: 'Standard', priceModifierMAD: 0 }
      ],
      inStock: Number(newProd.stockCount) > 0,
      stockCount: Number(newProd.stockCount),
      isNew: true,
      tags: ['Nouvelle Création', 'Atelier']
    };

    addNewProduct(productToAdd);
    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      subtitle: '',
      category: 'parfumerie',
      priceMAD: 2500,
      stockCount: 15,
      description: '',
      origin: 'Marrakech & Grasse'
    });
  };

  return (
    <div className="w-full bg-[#0D0D11] min-h-screen py-10 px-6 text-zinc-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
              <span>Maison Lumière</span>
              <span>·</span>
              <span>Espace Administration & Atelier</span>
            </div>
            <h1 className="text-3xl font-editorial text-white mt-1">
              Console de Pilotage Commercial
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaultData}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Réinitialiser les commandes et stocks par défaut"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Réinitialiser Données Démo</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#D4AF37] hover:bg-[#AA820A] text-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Création</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('kpi')}
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'kpi' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-zinc-400 hover:text-white bg-white/5'
            }`}
          >
            Vue d'Ensemble & KPI
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-zinc-400 hover:text-white bg-white/5'
            }`}
          >
            Gestion des Commandes ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-zinc-400 hover:text-white bg-white/5'
            }`}
          >
            Inventaire & Stocks ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'discounts' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-zinc-400 hover:text-white bg-white/5'
            }`}
          >
            Codes Privilège
          </button>
        </div>

        {/* TAB 1: KPI & OVERVIEW */}
        {activeTab === 'kpi' && (
          <div className="space-y-8">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
              <div className="p-6 bg-[#121218] border border-white/10">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                  Chiffre d'Affaires Réalisé
                </span>
                <div className="text-2xl font-bold text-[#D4AF37] tabular-nums">
                  {totalRevenueMAD.toLocaleString('fr-FR')} MAD
                </div>
                <div className="text-[11px] text-zinc-500 mt-2">
                  Commandes confirmées & en cours
                </div>
              </div>

              <div className="p-6 bg-[#121218] border border-white/10">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                  Commandes Totales
                </span>
                <div className="text-2xl font-bold text-white tabular-nums">
                  {totalOrdersCount}
                </div>
                <div className="text-[11px] text-zinc-500 mt-2">
                  Livraisons Casa, Rabat & Marrakech
                </div>
              </div>

              <div className="p-6 bg-[#121218] border border-white/10">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                  Panier Moyen
                </span>
                <div className="text-2xl font-bold text-white tabular-nums">
                  {averageOrderValueMAD.toLocaleString('fr-FR')} MAD
                </div>
                <div className="text-[11px] text-zinc-500 mt-2">
                  Haute joaillerie & parfumerie
                </div>
              </div>

              <div className="p-6 bg-[#121218] border border-white/10">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                  Alertes Stock Faible (≤ 5)
                </span>
                <div className={`text-2xl font-bold tabular-nums ${lowStockProducts.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {lowStockProducts.length} références
                </div>
                <div className="text-[11px] text-zinc-500 mt-2">
                  Nécessite réapprovisionnement atelier
                </div>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-[#121218] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-editorial text-white">Dernières Commandes Passées</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-mono text-[#D4AF37] hover:underline"
                >
                  Voir toutes les commandes →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-white/10 text-zinc-400">
                    <tr>
                      <th className="py-2.5">Suivi N°</th>
                      <th className="py-2.5">Client</th>
                      <th className="py-2.5">Destination</th>
                      <th className="py-2.5">Articles</th>
                      <th className="py-2.5">Montant</th>
                      <th className="py-2.5">Statut Actuel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 text-[#D4AF37] font-semibold">{o.trackingNumber}</td>
                        <td className="py-3 text-white">{o.customer.fullName}</td>
                        <td className="py-3 text-zinc-400">{o.customer.city}</td>
                        <td className="py-3 text-zinc-300">{o.items.length} article(s)</td>
                        <td className="py-3 text-white tabular-nums font-semibold">{o.totalMAD.toLocaleString('fr-FR')} MAD</td>
                        <td className="py-3">
                          <span className="text-[10px] uppercase px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-[#121218] border border-white/10 p-6 space-y-6">
            <div>
              <h3 className="text-xl font-editorial text-white">Gestion Opérationnelle des Commandes</h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Modifiez l'état d'avancement pour actualiser en temps réel le suivi client.
              </p>
            </div>

            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="p-5 bg-black/40 border border-white/10 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-mono text-[#D4AF37] font-bold">
                          {order.trackingNumber}
                        </span>
                        <span className="text-xs text-zinc-400">·</span>
                        <span className="text-xs text-white font-serif">{order.customer.fullName}</span>
                        <span className="text-xs text-zinc-400 font-mono">({order.customer.phone})</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {order.customer.city} — {order.customer.address}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 font-mono">Changer l'état :</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-zinc-900 border border-white/15 text-xs font-mono text-[#D4AF37] px-3 py-1.5 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                      >
                        <option value="validee">Validée (En attente)</option>
                        <option value="atelier">En Atelier (Préparation)</option>
                        <option value="expediee">Expédiée (Coursier)</option>
                        <option value="en_livraison">En Cours de Livraison</option>
                        <option value="livree">Livrée & Réglée</option>
                        <option value="annulee">Annulée</option>
                      </select>
                    </div>
                  </div>

                  {/* Items and Total */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-4">
                    <div className="text-zinc-300">
                      {order.items.map(i => `${i.product.name} (${i.selectedVariant.name} x${i.quantity})`).join(', ')}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-zinc-500 mr-2">Total à encaisser :</span>
                      <span className="text-white font-bold">{order.totalMAD.toLocaleString('fr-FR')} MAD</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="bg-[#121218] border border-white/10 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-editorial text-white">Inventaire des Créations ({products.length})</h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Édition directe des stocks et des tarifs en Dirhams Marocains (MAD).
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                + Ajouter une Référence
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-white/10 text-zinc-400">
                  <tr>
                    <th className="py-3">Visuel</th>
                    <th className="py-3">Nom & Catégorie</th>
                    <th className="py-3">Prix Actuel (MAD)</th>
                    <th className="py-3">Stock Actuel</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 w-14">
                        <img src={p.image} alt={p.name} className="w-10 h-12 object-cover border border-white/10" />
                      </td>
                      <td className="py-3">
                        <div className="text-white font-serif text-sm">{p.name}</div>
                        <div className="text-zinc-500 text-[11px]">{p.categoryLabel}</div>
                      </td>
                      <td className="py-3">
                        {editingPriceId === p.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={tempPriceValue}
                              onChange={(e) => setTempPriceValue(Number(e.target.value))}
                              className="w-24 bg-black border border-[#D4AF37] px-2 py-1 text-xs text-white"
                            />
                            <button
                              onClick={() => handleSavePrice(p.id)}
                              className="p-1 bg-[#D4AF37] text-black"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => { setEditingPriceId(p.id); setTempPriceValue(p.priceMAD); }}
                            className="text-[#D4AF37] font-semibold cursor-pointer hover:underline flex items-center gap-1"
                            title="Cliquer pour modifier le prix"
                          >
                            <span>{p.priceMAD.toLocaleString('fr-FR')} MAD</span>
                            <Edit3 className="w-3 h-3 text-zinc-500" />
                          </div>
                        )}
                      </td>
                      <td className="py-3">
                        {editingStockId === p.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={tempStockValue}
                              onChange={(e) => setTempStockValue(Number(e.target.value))}
                              className="w-20 bg-black border border-[#D4AF37] px-2 py-1 text-xs text-white"
                            />
                            <button
                              onClick={() => handleSaveStock(p.id)}
                              className="p-1 bg-[#D4AF37] text-black"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => { setEditingStockId(p.id); setTempStockValue(p.stockCount); }}
                            className={`cursor-pointer hover:underline flex items-center gap-1 ${
                              p.stockCount <= 5 ? 'text-amber-400 font-bold' : 'text-zinc-300'
                            }`}
                            title="Cliquer pour ajuster le stock"
                          >
                            <span>{p.stockCount} unités</span>
                            <Edit3 className="w-3 h-3 text-zinc-500" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Supprimer la référence"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: DISCOUNT CODES */}
        {activeTab === 'discounts' && (
          <div className="bg-[#121218] border border-white/10 p-6 space-y-6 font-mono text-xs">
            <div>
              <h3 className="text-xl font-editorial text-white">Codes Privilège & Campagnes VIP</h3>
              <p className="text-zinc-400 mt-1">Codes actifs utilisables immédiatement dans le panier.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#D4AF37]">LUMIERE10</span>
                  <span className="text-[10px] text-emerald-400 uppercase">Actif</span>
                </div>
                <p className="text-white">10% de réduction immédiate</p>
                <p className="text-zinc-500 text-[11px]">Dépense minimum : 1 000 MAD</p>
              </div>

              <div className="p-5 bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#D4AF37]">BIENVENUE</span>
                  <span className="text-[10px] text-emerald-400 uppercase">Actif</span>
                </div>
                <p className="text-white">250 MAD offerts pour première acquisition</p>
                <p className="text-zinc-500 text-[11px]">Dépense minimum : 1 500 MAD</p>
              </div>

              <div className="p-5 bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#D4AF37]">VIP2026</span>
                  <span className="text-[10px] text-emerald-400 uppercase">Actif</span>
                </div>
                <p className="text-white">15% de réduction exclusive Salon VIP</p>
                <p className="text-zinc-500 text-[11px]">Dépense minimum : 3 000 MAD</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-[#121218] border border-white/15 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-editorial text-white">Ajouter une Pièce d'Artisanat</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-zinc-400 block mb-1">Nom de la Création *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Brume d'Or de l'Atlas"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Catégorie *</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                      className="w-full bg-black/50 border border-white/15 px-3 py-2 text-white"
                    >
                      <option value="parfumerie">Haute Parfumerie</option>
                      <option value="maroquinerie">Maroquinerie</option>
                      <option value="horlogerie">Horlogerie</option>
                      <option value="couture">Couture</option>
                      <option value="maison">Maison</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Prix (MAD) *</label>
                    <input
                      type="number"
                      required
                      value={newProd.priceMAD}
                      onChange={(e) => setNewProd({ ...newProd, priceMAD: Number(e.target.value) })}
                      className="w-full bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Stock Initial</label>
                    <input
                      type="number"
                      required
                      value={newProd.stockCount}
                      onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                      className="w-full bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1">Origine / Atelier</label>
                    <input
                      type="text"
                      value={newProd.origin}
                      onChange={(e) => setNewProd({ ...newProd, origin: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Description Sommaire</label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 px-3 py-2 text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 bg-white/10 text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] text-black font-semibold uppercase"
                  >
                    Créer la Référence
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
