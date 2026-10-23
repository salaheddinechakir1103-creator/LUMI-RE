import { MoroccanCity } from '../types';

export const MOROCCAN_CITIES: MoroccanCity[] = [
  { id: 'casa', name: 'Casablanca', region: 'Casablanca-Settat', deliveryFeeMAD: 35, estimatedHours: '24h (Même jour si commande avant 13h)' },
  { id: 'rabat', name: 'Rabat - Salé', region: 'Rabat-Salé-Kénitra', deliveryFeeMAD: 45, estimatedHours: '24h' },
  { id: 'marrakech', name: 'Marrakech', region: 'Marrakech-Safi', deliveryFeeMAD: 45, estimatedHours: '24h' },
  { id: 'tanger', name: 'Tanger', region: 'Tanger-Tétouan-Al Hoceïma', deliveryFeeMAD: 55, estimatedHours: '24-48h' },
  { id: 'fes', name: 'Fès', region: 'Fès-Meknès', deliveryFeeMAD: 55, estimatedHours: '24-48h' },
  { id: 'agadir', name: 'Agadir', region: 'Souss-Massa', deliveryFeeMAD: 60, estimatedHours: '48h' },
  { id: 'meknes', name: 'Meknès', region: 'Fès-Meknès', deliveryFeeMAD: 55, estimatedHours: '24-48h' },
  { id: 'oujda', name: 'Oujda', region: "L'Oriental", deliveryFeeMAD: 70, estimatedHours: '48-72h' },
  { id: 'tetouan', name: 'Tétouan', region: 'Tanger-Tétouan-Al Hoceïma', deliveryFeeMAD: 60, estimatedHours: '48h' },
  { id: 'essaouira', name: 'Essaouira', region: 'Marrakech-Safi', deliveryFeeMAD: 60, estimatedHours: '48h' },
  { id: 'kenitra', name: 'Kénitra', region: 'Rabat-Salé-Kénitra', deliveryFeeMAD: 45, estimatedHours: '24h' },
  { id: 'eljadida', name: 'El Jadida', region: 'Casablanca-Settat', deliveryFeeMAD: 45, estimatedHours: '24h' },
];

export const FREE_SHIPPING_THRESHOLD_MAD = 1500;
