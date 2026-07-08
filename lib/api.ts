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

function adjustProductPrice(product: Product): Product {
  if (product.category === 'groceries') {
    // 10x cheaper for groceries to match local Uzbek market pricing (e.g. 2,000 - 5,000 UZS)
    return { ...product, price: product.price * 0.1 };
  }
  if (product.category === 'beauty' || product.category === 'skincare' || product.category === 'fragrances') {
    // 3x cheaper for beauty/cosmetics
    return { ...product, price: product.price * 0.3 };
  }
  // 2x cheaper for all other items to match competitive local market prices
  return { ...product, price: product.price * 0.5 };
}

export const MOCK_REDMI_PRODUCTS: Product[] = [
  {
    id: 99001,
    title: "Xiaomi Redmi Note 13 Pro",
    description: "Xiaomi Redmi Note 13 Pro 8/256 GB smartfoni. 200 MP ultra-tiniq kamera, 120Hz AMOLED ekran, 5000 mAh batareya va 67W tezkor quvvatlash.",
    price: 350,
    discountPercentage: 12.5,
    rating: 4.85,
    stock: 45,
    brand: "Xiaomi",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 99002,
    title: "Xiaomi Redmi 13C",
    description: "Xiaomi Redmi 13C 4/128 GB. Katta 6.74 dyuymli 90Hz displey, 50 MP asosiy kamera, 5000 mAh batareya va zamonaviy dizayn.",
    price: 180,
    discountPercentage: 8,
    rating: 4.65,
    stock: 85,
    brand: "Xiaomi",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 99003,
    title: "Xiaomi 14 Ultra",
    description: "Flagman smartfon Xiaomi 14 Ultra 16/512 GB. Professional Leica optikasi, Snapdragon 8 Gen 3 protsessori, 120W ultra tezkor quvvatlash va simsiz quvvatlash.",
    price: 1400,
    discountPercentage: 5,
    rating: 4.98,
    stock: 12,
    brand: "Xiaomi",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 99004,
    title: "Xiaomi Redmi Buds 5 Pro",
    description: "Faol shovqinni bekor qiluvchi (ANC) simsiz quloqchinlar. 38 soatgacha batareya quvvati, Hi-Res audio va qulay dizayn.",
    price: 90,
    discountPercentage: 15,
    rating: 4.78,
    stock: 150,
    brand: "Xiaomi",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 99005,
    title: "Xiaomi Redmi Watch 4",
    description: "Aqlli soat Redmi Watch 4. 1.97 dyuymli AMOLED ekran, GPS, qon kislorodi (SpO2) o'lchagich, 20 kungacha batareya quvvati.",
    price: 120,
    discountPercentage: 10,
    rating: 4.7,
    stock: 90,
    brand: "Xiaomi",
    category: "smartphones",
    thumbnail: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ]
  }
];

function translateSearchQuery(q: string): string {
  const query = q.toLowerCase().trim();
  const dictionary: Record<string, string> = {
    'telefon': 'phone',
    'telefonlar': 'phone',
    'smartfon': 'smartphone',
    'smartfonlar': 'smartphone',
    'телефон': 'phone',
    'телефоны': 'phone',
    'смартфон': 'smartphone',
    'смартфоны': 'smartphone',
    'noutbuk': 'laptop',
    'noutbuklar': 'laptop',
    'kompyuter': 'laptop',
    'kompyuterlar': 'laptop',
    'ноутбук': 'laptop',
    'ноутбуки': 'laptop',
    'компьютер': 'laptop',
    'компьютеры': 'laptop',
    'olma': 'apple',
    'яблоко': 'apple',
    'яблоки': 'apple',
    'sut': 'milk',
    'молоко': 'milk',
    'non': 'bread',
    'хлеб': 'bread',
    'oziq': 'grocery',
    'oziq-ovqat': 'grocery',
    'продукты': 'grocery',
    'еда': 'grocery',
    'avto': 'automotive',
    'avtomobil': 'automotive',
    'mashina': 'automotive',
    'авто': 'automotive',
    'машина': 'automotive',
    'kiyim': 'clothing',
    'kiyimlar': 'clothing',
    'ko\'ylak': 'dress',
    'ko\'ylaklar': 'dress',
    'одежда': 'clothing',
    'платье': 'dress',
    'платья': 'dress',
    'poyabzal': 'shoes',
    'tufli': 'shoes',
    'krossovka': 'sneaker',
    'krossovkalar': 'sneaker',
    'обувь': 'shoes',
    'туфли': 'shoes',
    'кроссовки': 'sneaker',
    'mebel': 'furniture',
    'mebellar': 'furniture',
    'stol': 'table',
    'stul': 'chair',
    'мебель': 'furniture',
    'стол': 'table',
    'стул': 'chair',
    'soat': 'watch',
    'soatlar': 'watch',
    'часы': 'watch',
    'ko\'zoynak': 'sunglasses',
    'ochki': 'sunglasses',
    'очки': 'sunglasses',
    'sumka': 'bag',
    'sumkalar': 'bag',
    'сумка': 'bag',
    'сумки': 'bag',
    'atir': 'fragrance',
    'duxi': 'fragrance',
    'parfumeriya': 'fragrance',
    'парфюм': 'fragrance',
    'духи': 'fragrance',
    'kosmetika': 'beauty',
    'pomada': 'lipstick',
    'косметика': 'beauty',
    'помада': 'lipstick',
    'redmi': 'phone',
    'xiaomi': 'phone',
    'mi': 'phone',
  };

  if (dictionary[query]) return dictionary[query];

  for (const [key, val] of Object.entries(dictionary)) {
    if (query.includes(key) || key.includes(query)) {
      return val;
    }
  }

  return q;
}

// Products API
export const productsApi = {
  getAll: async (params?: { limit?: number; skip?: number; category?: string }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.skip) query.set('skip', String(params.skip));
    const qs = query.toString();
    const data = await apiFetch<PaginatedProducts>(`/products${qs ? `?${qs}` : ''}`);
    
    let products = data.products.map(adjustProductPrice);
    if (!params?.skip || params.skip === 0) {
      const mocks = MOCK_REDMI_PRODUCTS.map(adjustProductPrice);
      products = [...mocks, ...products];
    }
    
    return {
      ...data,
      products: products.slice(0, params?.limit || products.length),
      total: data.total + MOCK_REDMI_PRODUCTS.length,
    };
  },

  getById: async (id: number) => {
    const mockProduct = MOCK_REDMI_PRODUCTS.find(p => p.id === id);
    if (mockProduct) {
      return adjustProductPrice(mockProduct);
    }
    const product = await apiFetch<Product>(`/products/${id}`);
    return adjustProductPrice(product);
  },

  getByCategory: async (category: string, params?: { limit?: number; skip?: number }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.skip) query.set('skip', String(params.skip));
    const qs = query.toString();
    const data = await apiFetch<PaginatedProducts>(`/products/category/${category}${qs ? `?${qs}` : ''}`);
    
    let products = data.products.map(adjustProductPrice);
    if (category === 'smartphones') {
      const mockSmartphones = MOCK_REDMI_PRODUCTS.filter(p => p.category === 'smartphones').map(adjustProductPrice);
      products = [...mockSmartphones, ...products];
    }
    
    return {
      ...data,
      products,
      total: data.total + (category === 'smartphones' ? MOCK_REDMI_PRODUCTS.filter(p => p.category === 'smartphones').length : 0),
    };
  },

  search: async (q: string, params?: { limit?: number }) => {
    const cleanQ = q.toLowerCase().trim();
    const matchedMocks = MOCK_REDMI_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(cleanQ) || 
      p.description.toLowerCase().includes(cleanQ) ||
      cleanQ.includes('redmi') || cleanQ.includes('xiaomi') || cleanQ.includes('mi')
    );

    const translatedQuery = translateSearchQuery(q);
    const query = new URLSearchParams({ q: translatedQuery });
    if (params?.limit) query.set('limit', String(params.limit));
    
    let apiData: SearchResult = { products: [], total: 0 };
    try {
      apiData = await apiFetch<SearchResult>(`/products/search?${query.toString()}`);
    } catch (e) {
      console.error(e);
    }

    const combinedProducts = [
      ...matchedMocks.map(adjustProductPrice),
      ...apiData.products.map(adjustProductPrice).filter(p => !matchedMocks.some(m => m.id === p.id))
    ];

    const finalProducts = (cleanQ.includes('redmi') || cleanQ.includes('xiaomi') || cleanQ.includes('mi')) 
      ? combinedProducts.filter(p => p.brand.toLowerCase() === 'xiaomi' || p.title.toLowerCase().includes('xiaomi') || p.title.toLowerCase().includes('redmi'))
      : combinedProducts;

    const results = finalProducts.length > 0 ? finalProducts : combinedProducts;

    return {
      ...apiData,
      products: results.slice(0, params?.limit || 30),
      total: results.length,
    };
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
