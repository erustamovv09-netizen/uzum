// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

// Types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
  token?: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface Order {
  id: number;
  products: CartItemData[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartItemData {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

// Helper to get auth token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('uzum_token');
}

// Generic fetch wrapper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Products API
export const productsApi = {
  getAll: (params?: { limit?: number; skip?: number; category?: string }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.skip) query.set('skip', String(params.skip));
    const qs = query.toString();
    return apiFetch<PaginatedProducts>(`/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number) => apiFetch<Product>(`/products/${id}`),

  getByCategory: (category: string, params?: { limit?: number; skip?: number }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.skip) query.set('skip', String(params.skip));
    const qs = query.toString();
    return apiFetch<PaginatedProducts>(`/products/category/${category}${qs ? `?${qs}` : ''}`);
  },

  search: (q: string, params?: { limit?: number }) => {
    const query = new URLSearchParams({ q });
    if (params?.limit) query.set('limit', String(params.limit));
    return apiFetch<SearchResult>(`/products/search?${query.toString()}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: () => apiFetch<Category[]>('/products/categories'),
};

// Auth API
export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    }),

  getProfile: () => apiFetch<User>('/auth/me'),
};

// Cart API
export const cartApi = {
  getByUser: (userId: number) => apiFetch<Order>(`/carts/user/${userId}`),

  addToCart: (userId: number, products: { id: number; quantity: number }[]) =>
    apiFetch<Order>('/carts/add', {
      method: 'POST',
      body: JSON.stringify({ userId, products }),
    }),
};

// Orders API (uses carts endpoint as substitute)
export const ordersApi = {
  getByUser: (userId: number) => apiFetch<{ carts: Order[] }>(`/carts/user/${userId}`),
};

// Utility functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(price * 12700)) + ' so\'m';
}

export function formatPriceUSD(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getDiscountedPrice(price: number, discountPercentage: number): number {
  return price * (1 - discountPercentage / 100);
}

export function getCategoryLabel(slug: string, lang: 'uz' | 'ru' = 'uz'): string {
  const labels: Record<'uz' | 'ru', Record<string, string>> = {
    uz: {
      'smartphones': 'Smartfonlar',
      'laptops': 'Noutbuklar',
      'fragrances': 'Parfyumeriya',
      'skincare': 'Terini parvarish',
      'groceries': 'Oziq-ovqat',
      'home-decoration': 'Uy bezaklari',
      'furniture': 'Mebel',
      'tops': 'Kofta va ko\'ylaklar',
      'womens-dresses': 'Ayollar ko\'ylagi',
      'womens-shoes': 'Ayollar poyabzali',
      'mens-shirts': 'Erkaklar ko\'ylagi',
      'mens-shoes': 'Erkaklar poyabzali',
      'mens-watches': 'Erkaklar soati',
      'womens-watches': 'Ayollar soati',
      'womens-bags': 'Ayollar sumkasi',
      'womens-jewellery': 'Zargarlik buyumlari',
      'sunglasses': 'Quyosh ko\'zoynaklari',
      'automotive': 'Avtomobil',
      'motorcycle': 'Mototsikl',
      'lighting': 'Yoritish',
      'beauty': 'Go\'zallik',
      'sports-accessories': 'Sport aksessuarlari',
      'tablets': 'Planshetlar',
      'vehicle': 'Avtomobil',
      'kitchen-accessories': 'Oshxona aksessuarlari',
    },
    ru: {
      'smartphones': 'Смартфоны',
      'laptops': 'Ноутбуки',
      'fragrances': 'Парфюмерия',
      'skincare': 'Уход за кожей',
      'groceries': 'Продукты питания',
      'home-decoration': 'Декор для дома',
      'furniture': 'Мебель',
      'tops': 'Топы и блузки',
      'womens-dresses': 'Женские платья',
      'womens-shoes': 'Женская обувь',
      'mens-shirts': 'Мужские рубашки',
      'mens-shoes': 'Мужская обувь',
      'mens-watches': 'Мужские часы',
      'womens-watches': 'Женские часы',
      'womens-bags': 'Женские сумки',
      'womens-jewellery': 'Ювелирные изделия',
      'sunglasses': 'Солнцезащитные очки',
      'automotive': 'Автотовары',
      'motorcycle': 'Мотоциклы',
      'lighting': 'Освещение',
      'beauty': 'Красота',
      'sports-accessories': 'Спортивные аксессуары',
      'tablets': 'Планшеты',
      'vehicle': 'Автомобили',
      'kitchen-accessories': 'Кухонные принадлежности',
    }
  };
  return labels[lang]?.[slug] || labels['uz']?.[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    'smartphones': '📱',
    'laptops': '💻',
    'fragrances': '🌸',
    'skincare': '✨',
    'groceries': '🛒',
    'home-decoration': '🏠',
    'furniture': '🛋️',
    'tops': '👕',
    'womens-dresses': '👗',
    'womens-shoes': '👠',
    'mens-shirts': '👔',
    'mens-shoes': '👞',
    'mens-watches': '⌚',
    'womens-watches': '⌚',
    'womens-bags': '👜',
    'womens-jewellery': '💍',
    'sunglasses': '🕶️',
    'automotive': '🚗',
    'motorcycle': '🏍️',
    'lighting': '💡',
    'beauty': '💄',
    'sports-accessories': '⚽',
    'tablets': '📲',
    'vehicle': '🚙',
    'kitchen-accessories': '🍳',
  };
  return icons[slug] || '📦';
}
