import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ProductVariant } from '../types';
import { INITIAL_PRODUCTS, DISCOUNT_CODES } from '../data/products';
import { MOROCCAN_CITIES, FREE_SHIPPING_THRESHOLD_MAD } from '../data/moroccanCities';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  activePage: string;
  selectedProductId: string | null;
  activeCollectionCategory: string | null;
  appliedDiscount: { code: string; amountMAD: number; description: string } | null;
  selectedCityId: string;
  isCartOpen: boolean;
  toasts: Toast[];
  
  // Actions
  navigateTo: (page: string, productId?: string, collectionCat?: string) => void;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  setSelectedCityId: (cityId: string) => void;
  setIsCartOpen: (open: boolean) => void;
  placeOrder: (customerData: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPriceMAD: number) => void;
  addNewProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  resetToDefaultData: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Computations
  cartSubtotalMAD: number;
  cartShippingFeeMAD: number;
  cartDiscountMAD: number;
  cartTotalMAD: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEMO_ORDERS: Order[] = [
  {
    id: 'ord-01',
    trackingNumber: 'LUM-84912',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    customer: {
      fullName: 'Kenza Benjelloun',
      phone: '+212 6 61 24 88 90',
      email: 'kenza.b@luxuryliving.ma',
      city: 'Casablanca',
      address: 'Résidence Les Palmiers, Bd d’Anfa, Gauthier',
      notes: 'Déposer à la conciergerie privée'
    },
    items: [
      {
        id: 'lum-perf-01-v-100ml',
        product: INITIAL_PRODUCTS[0],
        selectedVariant: INITIAL_PRODUCTS[0].variants[1],
        quantity: 1
      }
    ],
    subtotalMAD: 2450,
    shippingFeeMAD: 0,
    discountMAD: 0,
    totalMAD: 2450,
    paymentMethod: 'cash_on_delivery',
    status: 'en_livraison',
    timeline: [
      { status: 'validee', title: 'Commande confirmée', description: 'Commande acceptée par la conciergerie Lumière', timestamp: 'Hier, 10:15', completed: true },
      { status: 'atelier', title: 'Préparation en atelier', description: 'Flacon gravé et emballage satiné artisanal', timestamp: 'Hier, 15:30', completed: true },
      { status: 'expediee', title: 'Remise au coursier VIP', description: 'Colis scellé à la cire et pris en charge', timestamp: 'Ce matin, 08:45', completed: true },
      { status: 'en_livraison', title: 'En cours de livraison', description: 'Le coursier est en route vers Bd d’Anfa', timestamp: 'Ce matin, 11:20', completed: true },
      { status: 'livree', title: 'Livraison finale', description: 'Signature et remise en main propre', timestamp: 'Estimé vers 14:00', completed: false }
    ]
  },
  {
    id: 'ord-02',
    trackingNumber: 'LUM-92305',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    customer: {
      fullName: 'Mehdi El Alami',
      phone: '+212 6 62 10 33 44',
      email: 'm.elalami@prestige.ma',
      city: 'Rabat - Salé',
      address: 'Avenue Mohammed VI, Souissi, Rabat',
      notes: 'Appeler 15 min avant'
    },
    items: [
      {
        id: 'lum-maroq-01-v-black-gold',
        product: INITIAL_PRODUCTS[5],
        selectedVariant: INITIAL_PRODUCTS[5].variants[0],
        quantity: 1
      }
    ],
    subtotalMAD: 8900,
    shippingFeeMAD: 0,
    discountMAD: 890,
    discountCode: 'LUMIERE10',
    totalMAD: 8010,
    paymentMethod: 'cash_on_delivery',
    status: 'atelier',
    timeline: [
      { status: 'validee', title: 'Commande confirmée', description: 'Vérification du maître sellier', timestamp: 'Hier, 22:30', completed: true },
      { status: 'atelier', title: 'Préparation en atelier', description: 'Contrôle qualité du cuir et finitions dorées', timestamp: 'Ce matin, 09:00', completed: true },
      { status: 'expediee', title: 'Expédition Express Rabat', description: 'En attente de prise en charge', timestamp: 'Aujourd’hui', completed: false },
      { status: 'en_livraison', title: 'En cours de livraison', description: 'Livraison sécurisée', timestamp: 'Demain', completed: false },
      { status: 'livree', title: 'Remise au destinataire', description: 'Paiement à la livraison', timestamp: 'Demain', completed: false }
    ]
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_wishlist_v1');
      return saved ? JSON.parse(saved) : ['lum-perf-01', 'lum-maroq-01'];
    } catch {
      return ['lum-perf-01', 'lum-maroq-01'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lumiere_orders_v1');
      return saved ? JSON.parse(saved) : DEMO_ORDERS;
    } catch {
      return DEMO_ORDERS;
    }
  });

  const [activePage, setActivePage] = useState<string>('accueil');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('lum-perf-01');
  const [activeCollectionCategory, setActiveCollectionCategory] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amountMAD: number; description: string } | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string>('casa');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lumiere_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lumiere_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumiere_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumiere_orders_v1', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: string, productId?: string, collectionCat?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(page);
    if (productId) setSelectedProductId(productId);
    if (collectionCat !== undefined) setActiveCollectionCategory(collectionCat);
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const chosenVariant = variant || product.variants[0] || {
      id: 'default',
      name: 'Standard',
      type: 'volume',
      value: 'Standard'
    };

    const itemId = `${product.id}-${chosenVariant.id}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, {
          id: itemId,
          product,
          selectedVariant: chosenVariant,
          quantity
        }];
      }
    });

    showToast(`« ${product.name} » ajouté à votre panier`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Article retiré du panier', 'info');
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(prod ? `« ${prod.name} » retiré de vos favoris` : 'Retiré des favoris', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(prod ? `« ${prod.name} » ajouté à vos favoris` : 'Ajouté aux favoris');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculations
  const cartSubtotalMAD = cart.reduce((total, item) => {
    const modifier = item.selectedVariant.priceModifierMAD || 0;
    const unitPrice = item.product.priceMAD + modifier;
    return total + (unitPrice * item.quantity);
  }, 0);

  const currentCity = MOROCCAN_CITIES.find(c => c.id === selectedCityId) || MOROCCAN_CITIES[0];
  const isFreeShipping = cartSubtotalMAD >= FREE_SHIPPING_THRESHOLD_MAD || cartSubtotalMAD === 0;
  const cartShippingFeeMAD = isFreeShipping ? 0 : currentCity.deliveryFeeMAD;

  const cartDiscountMAD = appliedDiscount ? appliedDiscount.amountMAD : 0;
  const cartTotalMAD = Math.max(0, cartSubtotalMAD - cartDiscountMAD + cartShippingFeeMAD);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyDiscountCode = (codeStr: string) => {
    const trimmed = codeStr.trim().toUpperCase();
    const found = DISCOUNT_CODES.find(c => c.code === trimmed);

    if (!found) {
      return { success: false, message: 'Code privilège invalide ou expiré.' };
    }

    if (cartSubtotalMAD < found.minSpendMAD) {
      return { 
        success: false, 
        message: `Montant minimum requis de ${found.minSpendMAD.toLocaleString('fr-FR')} MAD pour ce code.` 
      };
    }

    let calculatedDiscount = 0;
    if (found.percentage) {
      calculatedDiscount = Math.round((cartSubtotalMAD * found.percentage) / 100);
    } else if (found.fixedMAD) {
      calculatedDiscount = found.fixedMAD;
    }

    setAppliedDiscount({
      code: found.code,
      amountMAD: calculatedDiscount,
      description: found.description
    });

    showToast(`Code « ${found.code} » appliqué : -${calculatedDiscount} MAD`);
    return { success: true, message: `Code ${found.code} appliqué avec succès !` };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    showToast('Code de réduction retiré', 'info');
  };

  const placeOrder = (customerData: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    notes?: string;
  }): Order => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = `LUM-${randomCode}`;
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      trackingNumber,
      createdAt: now.toISOString(),
      customer: customerData,
      items: [...cart],
      subtotalMAD: cartSubtotalMAD,
      shippingFeeMAD: cartShippingFeeMAD,
      discountMAD: cartDiscountMAD,
      discountCode: appliedDiscount?.code,
      totalMAD: cartTotalMAD,
      paymentMethod: 'cash_on_delivery',
      status: 'validee',
      timeline: [
        {
          status: 'validee',
          title: 'Commande confirmée',
          description: 'Votre commande a été enregistrée avec succès. Notre atelier prépare votre écrin.',
          timestamp: `Aujourd’hui à ${timeString}`,
          completed: true
        },
        {
          status: 'atelier',
          title: 'Préparation en atelier',
          description: 'Contrôle minutieux, emballage cadeau signature et cachet de cire.',
          timestamp: 'En cours',
          completed: false
        },
        {
          status: 'expediee',
          title: 'Expédition Express',
          description: `Prise en charge par notre coursier vers ${customerData.city}.`,
          timestamp: 'À venir',
          completed: false
        },
        {
          status: 'en_livraison',
          title: 'En cours de livraison',
          description: 'Le livreur vous contactera par téléphone avant son passage.',
          timestamp: 'À venir',
          completed: false
        },
        {
          status: 'livree',
          title: 'Livraison & Paiement',
          description: `Remise du colis et règlement de ${cartTotalMAD.toLocaleString('fr-FR')} MAD en espèces.`,
          timestamp: 'À venir',
          completed: false
        }
      ]
    };

    // Update stock counts
    setProducts(prevProds => {
      return prevProds.map(prod => {
        const cartItemForProd = cart.find(ci => ci.product.id === prod.id);
        if (cartItemForProd) {
          const nextStock = Math.max(0, prod.stockCount - cartItemForProd.quantity);
          return {
            ...prod,
            stockCount: nextStock,
            inStock: nextStock > 0
          };
        }
        return prod;
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedDiscount(null);
    showToast(`Commande ${trackingNumber} validée avec succès !`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, nextStatus: Order['status']) => {
    setOrders(prev => {
      return prev.map(order => {
        if (order.id !== orderId) return order;

        const updatedTimeline = order.timeline.map(event => {
          if (event.status === nextStatus) {
            return { ...event, completed: true, timestamp: 'À l’instant' };
          }
          return event;
        });

        return {
          ...order,
          status: nextStatus,
          timeline: updatedTimeline
        };
      });
    });
    showToast(`Statut de la commande mis à jour : ${nextStatus}`);
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          stockCount: newStock,
          inStock: newStock > 0
        };
      }
      return p;
    }));
    showToast('Stock mis à jour avec succès');
  };

  const updateProductPrice = (productId: string, newPriceMAD: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          priceMAD: newPriceMAD
        };
      }
      return p;
    }));
    showToast('Prix mis à jour');
  };

  const addNewProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Nouveau produit « ${newProd.name} » ajouté au catalogue !`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Produit retiré du catalogue', 'info');
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(DEMO_ORDERS);
    localStorage.removeItem('lumiere_products_v1');
    localStorage.removeItem('lumiere_orders_v1');
    showToast('Données de démonstration réinitialisées');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        activePage,
        selectedProductId,
        activeCollectionCategory,
        appliedDiscount,
        selectedCityId,
        isCartOpen,
        toasts,
        navigateTo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyDiscountCode,
        removeDiscountCode,
        setSelectedCityId,
        setIsCartOpen,
        placeOrder,
        updateOrderStatus,
        updateProductStock,
        updateProductPrice,
        addNewProduct,
        deleteProduct,
        resetToDefaultData,
        showToast,
        removeToast,
        cartSubtotalMAD,
        cartShippingFeeMAD,
        cartDiscountMAD,
        cartTotalMAD,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
