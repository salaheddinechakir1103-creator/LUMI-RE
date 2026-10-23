export type ProductCategory = 
  | 'parfumerie' 
  | 'maroquinerie' 
  | 'horlogerie' 
  | 'couture' 
  | 'maison';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'volume' | 'color' | 'size' | 'finish';
  value: string;
  priceModifierMAD?: number;
  stock?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  priceMAD: number;
  originalPriceMAD?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  details: {
    origin: string;
    composition?: string;
    notes?: {
      top: string[];
      heart: string[];
      base: string[];
    };
    dimensions?: string;
    careInstructions?: string;
  };
  variants: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  has3DModel?: boolean;
  modelType?: 'perfume' | 'bottle' | 'leather';
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id including variant
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface MoroccanCity {
  id: string;
  name: string;
  region: string;
  deliveryFeeMAD: number;
  estimatedHours: string;
}

export type OrderStatus = 'validee' | 'atelier' | 'expediee' | 'en_livraison' | 'livree' | 'annulee';

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  trackingNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    postalCode?: string;
    notes?: string;
  };
  items: CartItem[];
  subtotalMAD: number;
  shippingFeeMAD: number;
  discountMAD: number;
  discountCode?: string;
  totalMAD: number;
  paymentMethod: 'cash_on_delivery' | 'demo_card';
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
}

export interface DiscountCode {
  code: string;
  percentage?: number;
  fixedMAD?: number;
  minSpendMAD: number;
  description: string;
}
