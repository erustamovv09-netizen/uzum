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

function translateText(text: string): string {
  if (!text) return text;
  let t = text;

  // Regex rules for general translations of words
  const replacements: [RegExp, string][] = [
    // Phrases
    [/\bpower bank\b/gi, "tashqi akkumulyator (power bank)"],
    [/\bpowerbank\b/gi, "tashqi akkumulyator (power bank)"],
    [/\bsunglasses\b/gi, "quyosh ko'zoynaklari"],
    [/\bsun glasses\b/gi, "quyosh ko'zoynaklari"],
    [/\bglass frame\b/gi, "ko'zoynak ramkasi"],
    [/\bt-shirt\b/gi, "futbolka"],
    [/\btennis racket\b/gi, "tennis raketkasi"],
    [/\bsports shoes\b/gi, "sport poyabzali"],
    [/\brunning shoes\b/gi, "yugurish poyabzali"],
    [/\bcasual shoes\b/gi, "kundalik poyabzal"],
    [/\bhigh heels\b/gi, "poshnali tufli"],
    [/\bleather sneakers\b/gi, "charm krossovkalar"],
    [/\bslip-on\b/gi, "slipon poyabzali"],
    [/\bcat food\b/gi, "mushuklar uchun ozuqa"],
    [/\bdog food\b/gi, "kuchuklar uchun ozuqa"],
    [/\bcooking oil\b/gi, "o'simlik yog'i"],
    [/\bchicken breast\b/gi, "tovuq filesi"],
    [/\bfish steak\b/gi, "baliq filesi (steyk)"],
    [/\boil filter\b/gi, "moy filtri"],
    [/\bwiper blades\b/gi, "oyna tozalagichlar (dvorniklar)"],
    [/\bcar holder\b/gi, "avtomobil ushlagichi"],
    [/\bmotorcycle helmet\b/gi, "mototsikl kaski (shlemi)"],
    
    // Nouns
    [/\bsmartphone\b/gi, "smartfon"],
    [/\bphone\b/gi, "telefon"],
    [/\blayout\b/gi, "maketi"],
    [/\blaptops\b/gi, "noutbuklar"],
    [/\blaptop\b/gi, "noutbuk"],
    [/\bcomputer\b/gi, "kompyuter"],
    [/\bwatches\b/gi, "soatlar"],
    [/\bwatch\b/gi, "soat"],
    [/\bsmartwatch\b/gi, "aqlli soat"],
    [/\bheadphones\b/gi, "quloqchinlar"],
    [/\bearphones\b/gi, "quloqchinlar"],
    [/\bheadset\b/gi, "quloqchinlar"],
    [/\bspeaker\b/gi, "kolonka (dinamik)"],
    [/\bmouse\b/gi, "sichqoncha"],
    [/\bkeyboard\b/gi, "klaviatura"],
    [/\bcamera\b/gi, "kamera"],
    [/\blens\b/gi, "obyektiv"],
    [/\btripod\b/gi, "shtativ"],
    [/\bbag\b/gi, "sumka"],
    [/\bbackpack\b/gi, "ryukzak"],
    [/\bhandbag\b/gi, "qo'l sumkasi"],
    [/\bpurse\b/gi, "hamyon (sumka)"],
    [/\bjewelry\b/gi, "taqinchoq"],
    [/\bnecklace\b/gi, "marjon"],
    [/\bring\b/gi, "uzuk"],
    [/\bbracelet\b/gi, "bilaguzuk"],
    [/\bearrings\b/gi, "ziraklar"],
    
    // Clothing
    [/\bshirt\b/gi, "ko'ylak"],
    [/\bdress\b/gi, "ko'ylak (libos)"],
    [/\bpants\b/gi, "shim"],
    [/\btrousers\b/gi, "shim"],
    [/\bjeans\b/gi, "jinsi shim"],
    [/\bjacket\b/gi, "kurtka"],
    [/\bcoat\b/gi, "palto"],
    [/\bsweater\b/gi, "sviter"],
    [/\bsocks\b/gi, "paypoqlar"],
    [/\bshoes\b/gi, "poyabzal"],
    [/\bsneakers\b/gi, "krossovkalar"],
    [/\bboots\b/gi, "etiklar"],
    [/\bsandals\b/gi, "sandallar"],
    [/\bhoodie\b/gi, "xudi (kofta)"],
    
    // Home/Furniture
    [/\bbed\b/gi, "karavot"],
    [/\bsofa\b/gi, "divan"],
    [/\bchair\b/gi, "stul"],
    [/\btable\b/gi, "stol"],
    [/\bcabinet\b/gi, "shkaf"],
    [/\bwardrobe\b/gi, "shkaf (garderob)"],
    [/\blamp\b/gi, "lampa (chiroq)"],
    [/\bmirror\b/gi, "ko'zgu"],
    [/\bpillow\b/gi, "yostiq"],
    [/\bcushion\b/gi, "yostiqcha"],
    [/\brug\b/gi, "gilam"],
    
    // Auto
    [/\bcar\b/gi, "avtomobil"],
    [/\bmotorcycle\b/gi, "mototsikl"],
    [/\btires\b/gi, "shinalar"],
    [/\btyre\b/gi, "shina"],
    [/\bkey\b/gi, "kalit"],
    [/\bengine\b/gi, "motor (dvigatel)"],
    
    // Groceries
    [/\bbanana\b/gi, "banan"],
    [/\blemon\b/gi, "limon"],
    [/\bgrape\b/gi, "uzum"],
    [/\bkiwi\b/gi, "kivi"],
    [/\bpineapple\b/gi, "ananas"],
    [/\btomato\b/gi, "pomidor"],
    [/\bonion\b/gi, "piyoz"],
    [/\bgarlic\b/gi, "sarimsoq"],
    [/\bcarrot\b/gi, "sabzi"],
    [/\bcheese\b/gi, "pishloq"],
    [/\bbutter\b/gi, "sariyog'"],
    [/\byogurt\b/gi, "yogurt"],
    [/\byoghurt\b/gi, "yogurt"],
    [/\bjuice\b/gi, "sharbat"],
    [/\btea\b/gi, "choy"],
    [/\bcoffee\b/gi, "qahva"],
    [/\bchocolate\b/gi, "shokolad"],
    [/\bconfectionery\b/gi, "shirinliklar"],
    
    // Adjectives / Attributes
    [/\bmen's\b/gi, "erkaklar"],
    [/\bmens\b/gi, "erkaklar"],
    [/\bwomen's\b/gi, "ayollar"],
    [/\bwomens\b/gi, "ayollar"],
    [/\bladies\b/gi, "ayollar"],
    [/\bkids\b/gi, "bolalar"],
    [/\bchildren's\b/gi, "bolalar"],
    [/\bsports\b/gi, "sport"],
    [/\bsport\b/gi, "sport"],
    [/\bleather\b/gi, "charm"],
    [/\bwooden\b/gi, "yog'ochli"],
    [/\bwood\b/gi, "yog'och"],
    [/\bgolden\b/gi, "oltin (tilla)"],
    [/\bgold\b/gi, "oltin"],
    [/\bsilver\b/gi, "kumush"],
    [/\bsilicon\b/gi, "silikon"],
    [/\bsilicone\b/gi, "silikon"],
    [/\bglass\b/gi, "shisha (oyna)"],
    [/\bplastic\b/gi, "plastik"],
    [/\borganic\b/gi, "tabiiy"],
    [/\bwireless\b/gi, "simsiz"],
    [/\bwired\b/gi, "simli"],
    [/\bportable\b/gi, "ko'chma (portativ)"],
    [/\bwaterproof\b/gi, "suv o'tkazmaydigan"],
    [/\belectric\b/gi, "elektr"],
    [/\bdigital\b/gi, "raqamli"],
    [/\bsmart\b/gi, "aqlli"],
  ];

  for (const [regex, replacement] of replacements) {
    t = t.replace(regex, replacement);
  }

  return t;
}

function translateProductToUzbek(product: Product): Product {
  const titleDict: Record<string, string> = {
    "Essence Mascara Lash Princess": "Kipriklar uchun tush Essence Mascara",
    "Eyeshadow Palette with Mirror": "Ko'z soyalari palitrasi (ko'zguli)",
    "Powder Canister": "Kosmetik pudra idishi",
    "Red Lipstick": "Qizil lab bo'yog'i (pomada)",
    "Red Nail Polish": "Qizil tirnoq bo'yog'i (lak)",
    "Calvin Klein CK One": "Calvin Klein CK One uniseks atiri",
    "Chanel Coco Mademoiselle": "Chanel Coco Mademoiselle ayollar atiri",
    "Gucci Guilty Eau de Parfum": "Gucci Guilty Eau de Parfum atiri",
    "Perfume Oil": "Konsentrlangan atir moyi",
    "Brown Perfume": "Premium jigarrang atir",
    "Dior Fahrenheit": "Dior Fahrenheit erkaklar atiri",
    "Annibale Colombo Bed": "Annibale Colombo hashamatli karavot",
    "Annibale Colombo Sofa": "Annibale Colombo hashamatli charm divan",
    "Bedside Table": "Karavot yonidagi tumba (stol)",
    "Knoll Saarinen Executive Chair": "Knoll Saarinen ofis stuli",
    "Wooden Banister": "Yog'och panjara (zina tutqichi)",
    "Apple": "Olma",
    "Beef Jerky": "Quritilgan mol go'shti (gazak)",
    "Cat Food": "Mushuklar uchun ozuqa",
    "Chicken Breast": "Tovuq filesi",
    "Cooking Oil": "O'simlik yog'i",
    "Cucumber": "Bodring",
    "Dog Food": "Kuchuklar uchun ozuqa",
    "Eggs": "Tuxum",
    "Fish Steak": "Baliq filesi (steyk)",
    "Honey Jar": "Tabiiy asal",
    "Ice Cream": "Muzqaymoq",
    "Milk": "Sut",
    "Orange": "Apelsin",
    "Potato": "Kartoshka",
    "Red Bull": "Red Bull",
    "Rice": "Guruch",
    "Soft Drinks": "Coca-Cola",
    "Strawberry": "Qulupnay",
    "Water": "Toza suv",
    "iPhone 5s": "Apple iPhone 5s smartfoni",
    "iPhone 6": "Apple iPhone 6 smartfoni",
    "iPhone 13 Pro": "Apple iPhone 13 Pro 256GB",
    "iPhone X": "Apple iPhone X 64GB",
    "MacBook Pro": "Apple MacBook Pro noutbuki",
  };

  const descDict: Record<string, string> = {
    "The Essence Mascara Lash Princess is a popular mascara known for its volume and lengthening effects.": "Essence Mascara Lash Princess - bu hajmi va uzaytiruvchi effektlari bilan mashhur bo'lgan ommabop kiprik tushi.",
    "The Eyeshadow Palette with Mirror offers a variety of eyeshadow shades for creating different eye looks.": "Ko'zgu bilan jihozlangan ko'z soyalari palitrasi turli xil ko'rinishlarni yaratish uchun ko'p rangli soyalarni taqdim etadi.",
    "The Powder Canister is a finely milled cosmetic powder designed for setting makeup and reducing shine.": "Pudra idishi - bu bo'yanishni mustahkamlash va ortiqcha porlashni kamaytirish uchun mo'ljallangan nozik maydalangan kosmetik pudra.",
    "The Red Lipstick is a classic red lip makeup product that adds vibrant color and definition to the lips.": "Qizil lab bo'yog'i (pomada) - bu lablarga yorqin rang va jozibadorlik beruvchi klassik lab bo'yanish mahsulotidir.",
    "The Red Nail Polish is a vibrant red nail lacquer designed for adding color and shine to the nails.": "Qizil tirnoq bo'yog'i - tirnoqlarga go'zallik, rang va porlash berish uchun mo'lanishiga javob beradigan tirnoq bo'yog'idir.",
    "Calvin Klein CK One is a classic unisex fragrance known for its clean and fresh scent notes.": "Calvin Klein CK One - o'zining toza va yangi iforlari bilan tanilgan klassik uniseks atiridir.",
    "Chanel Coco Mademoiselle is a sophisticated and feminine fragrance with floral and oriental notes.": "Chanel Coco Mademoiselle - bu gulli va sharqona notalarga ega nozik hamda nafis ayollar atiri.",
    "Gucci Guilty Eau de Parfum is a bold and charismatic fragrance designed for modern individuals.": "Gucci Guilty Eau de Parfum - zamonaviy insonlar uchun mo'ljallangan jasur va xarizmatik ifor.",
    "Perfume Oil is a concentrated fragrance oil that provides a long-lasting and personal scent experience.": "Atir moyi - bu uzoq vaqt saqlanib turuvchi va yoqimli hid beruvchi konsentrlangan ifor moyidir.",
    "Brown Perfume is a rich and warm fragrance, offering a blend of woody and spicy notes.": "Jigarrang atir - yog'ochli va achchiq notalarning aralashmasini taqdim etuvchi boy va iliq ifordir.",
    "Dior Fahrenheit is a classic men's fragrance featuring a unique blend of floral, woody, and leather notes.": "Dior Fahrenheit - gulli, yog'ochli va charm notalarning noyob aralashmasidan iborat klassik erkaklar atiri.",
    "The Annibale Colombo Bed is a luxurious and elegant bed designed with high-quality materials.": "Annibale Colombo Bed - yuqori sifatli materiallardan tayyorlangan hashamatli va nafis karavot.",
    "The Annibale Colombo Sofa is a high-end luxury sofa featuring premium leather upholstery and classic design.": "Annibale Colombo Sofa - premium charm qoplamasi va klassik dizaynga ega hashamatli va qimmatbaho divan.",
    "The Bedside Table is a functional bedside cabinet designed to complement bedroom furniture.": "Karavot yonidagi tumba - yotoqxona mebellarini to'ldirish uchun mo'ljallangan funksional shkafcha.",
    "The Knoll Saarinen Executive Chair is a premium office chair designed for comfort and modern aesthetic.": "Knoll Saarinen Executive Chair - qulaylik va zamonaviy estetika uchun mo'ljallangan yuqori sifatli ofis stuli.",
    "The Wooden Banister is a handcrafted wooden stair railing designed for safety and style.": "Yog'och panjara - xavfsizlik va go'zal uslub uchun mo'ljallangan, qo'lda yasalgan yog'och zina tutqichi.",
    "Fresh green apples, crisp and juicy.": "Shirin va suvli olma.",
    "Beef Jerky is a high-protein snack made from dried lean beef.": "Quritilgan toza mol go'shtidan tayyorlangan yuqori oqsilli gazak.",
    "Cat Food is a nutritious and balanced food designed for adult cats.": "Mushuklar uchun to'yimli va muvozanatli ozuqa.",
    "Chicken Breast is a lean and healthy source of protein.": "Tovuq filesi - toza va sog'lom oqsil manbai.",
    "Cooking Oil is a versatile vegetable oil designed for cooking and frying.": "Pishirish va qovurish uchun mo'ljallangan o'simlik moyi.",
    "Fresh green cucumbers, crisp and refreshing.": "Sarxil va shirin bodring.",
    "Dog Food is a premium dry kibble designed for adult dogs.": "Katta yoshdagi itlar uchun premium quruq ozuqa.",
    "Fresh chicken eggs, high-quality and farm-fresh.": "Sifatli, toza va to'yimli tuxumlar.",
    "Fresh fish steak, perfect for grilling or baking.": "Baliq filesi - qovurish yoki pechda pishirish uchun mo'ljallangan steyk.",
    "Pure organic honey, gathered from natural wildflowers.": "Yovvoyi gullardan yig'ilgan shifobaxsh toza asal.",
    "Delicious chocolate ice cream, rich and creamy.": "Mazali va shirin qaymoqli muzqaymoq.",
    "Fresh whole milk, high-quality and pasteurized.": "Yangi va sifatli pasterizatsiyalangan sut.",
    "Sweet and juicy oranges, packed with Vitamin C.": "S vitaminiga boy shirin va suvli apelsinlar.",
    "Fresh organic potatoes, perfect for mashing or roasting.": "Sarxil kartoshkalar.",
    "Red Bull is a popular energy drink designed to boost energy and mental performance.": "Red Bull - energiya va faollikni oshiruvchi ichimlik.",
    "Premium white rice, perfect for local plov.": "Milliy palov pishirish uchun oq guruch.",
    "Carbonated soft drinks, refreshing and classic.": "Salqin gazlangan ichimliklar.",
    "Fresh sweet strawberries, perfect for desserts.": "Sarxil va shirin qulupnaylar.",
    "Pure spring water, natural and refreshing.": "Tabiiy, toza va shirin suv.",
  };

  let title = titleDict[product.title] || product.title;
  let description = descDict[product.description] || product.description;

  // Fallback dynamic replacements if still in English
  if (title === product.title) {
    title = translateText(title);
  }
  if (description === product.description) {
    description = translateText(description);
  }

  return {
    ...product,
    title,
    description
  };
}

function adjustProductPrice(product: Product): Product {
  let adjusted = { ...product };
  if (product.category === 'groceries') {
    // 10x cheaper for groceries to match local Uzbek market pricing (e.g. 2,000 - 5,000 UZS)
    adjusted.price = product.price * 0.1;
  } else if (product.category === 'beauty' || product.category === 'skincare' || product.category === 'fragrances') {
    // 3x cheaper for beauty/cosmetics
    adjusted.price = product.price * 0.3;
  } else {
    // 2x cheaper for all other items to match competitive local market prices
    adjusted.price = product.price * 0.5;
  }
  return translateProductToUzbek(adjusted);
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
    thumbnail: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro.jpg",
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro.jpg"
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
    thumbnail: "/redmi-13c.png",
    images: [
      "/redmi-13c.png"
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
    thumbnail: "/xiaomi-14-ultra.png",
    images: [
      "/xiaomi-14-ultra.png"
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

export const MOCK_CLOTHING_PRODUCTS: Product[] = [
  {
    id: 99101,
    title: "Ayollar zamonaviy shifon ko'ylagi",
    description: "Yozgi yengil shifon ko'ylak, bejirim dizayn va yuqori sifatli mato. Kundalik kiyish va tadbirlar uchun juda mos keladi.",
    price: 50,
    discountPercentage: 10,
    rating: 4.8,
    stock: 50,
    brand: "Zara",
    category: "womens-dresses",
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 99102,
    title: "Klassik ayollar kostyum-shimi",
    description: "Ayollar uchun zamonaviy klassik kostyum va shim to'plami. Sifatli mato, qulay bichim va ofis hamda maxsus kunlar uchun ajoyib tanlov.",
    price: 90,
    discountPercentage: 15,
    rating: 4.9,
    stock: 35,
    brand: "Mango",
    category: "womens-dresses",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 99103,
    title: "Yumshoq trikotaj kardigan",
    description: "Bahorgi va kuzgi mavsum uchun qulay trikotaj kardigan. Kundalik kiyimlar bilan juda chiroyli mos tushadi.",
    price: 36,
    discountPercentage: 5,
    rating: 4.7,
    stock: 65,
    brand: "H&M",
    category: "tops",
    thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 99104,
    title: "Zamonaviy ayollar bluzkasi",
    description: "Yengil va bejirim ayollar bluzkasi. Har qanday yubka yoki shim bilan chiroyli ko'rinadi.",
    price: 28,
    discountPercentage: 8,
    rating: 4.6,
    stock: 80,
    brand: "Zara",
    category: "tops",
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 99201,
    title: "Erkaklar klassik kostyum-shimi",
    description: "To'ylar, rasmiy uchrashuvlar va tadbirlar uchun sifatli erkaklar kostyum to'plami. Premium material, mukammal bichim.",
    price: 180,
    discountPercentage: 12,
    rating: 4.95,
    stock: 20,
    brand: "Billionaire",
    category: "mens-shirts",
    thumbnail: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 99202,
    title: "Klassik paxtali oq ko'ylak",
    description: "100% tabiiy paxtadan tayyorlangan klassik erkaklar ko'ylagi. Nafas oladigan yumshoq mato, qulay dizayn.",
    price: 40,
    discountPercentage: 10,
    rating: 4.8,
    stock: 90,
    brand: "Zara Men",
    category: "mens-shirts",
    thumbnail: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 99203,
    title: "Zamonaviy zig'ir (linen) ko'ylak",
    description: "Yoz kunlari uchun salqin va yengil zig'ir tolasidan tikilgan ko'ylak. Kundalik kiyishga juda qulay.",
    price: 38,
    discountPercentage: 7,
    rating: 4.75,
    stock: 75,
    brand: "Massimo Dutti",
    category: "mens-shirts",
    thumbnail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop"]
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
      const mocks = [
        ...MOCK_REDMI_PRODUCTS.map(adjustProductPrice),
        ...MOCK_CLOTHING_PRODUCTS.map(adjustProductPrice)
      ];
      products = [...mocks, ...products];
    }
    
    return {
      ...data,
      products: products.slice(0, params?.limit || products.length),
      total: data.total + MOCK_REDMI_PRODUCTS.length + MOCK_CLOTHING_PRODUCTS.length,
    };
  },

  getById: async (id: number) => {
    const mockProduct = MOCK_REDMI_PRODUCTS.find(p => p.id === id) || MOCK_CLOTHING_PRODUCTS.find(p => p.id === id);
    if (mockProduct) {
      return adjustProductPrice(mockProduct);
    }
    const product = await apiFetch<Product>(`/products/${id}`);
    return adjustProductPrice(product);
  },

  getByCategory: async (category: string, params?: { limit?: number; skip?: number }) => {
    if (category === 'clothing') {
      const limit = params?.limit || 20;
      const skip = params?.skip || 0;
      
      const mockClothes = MOCK_CLOTHING_PRODUCTS.map(adjustProductPrice);
      
      const categoriesToFetch = ['mens-shirts', 'womens-dresses', 'tops'];
      let apiClothes: Product[] = [];
      try {
        const responses = await Promise.all(
          categoriesToFetch.map(cat => 
            apiFetch<PaginatedProducts>(`/products/category/${cat}?limit=30`)
          )
        );
        for (const res of responses) {
          if (res && res.products) {
            apiClothes = [...apiClothes, ...res.products.map(adjustProductPrice)];
          }
        }
      } catch (err) {
        console.error('Error fetching clothing categories:', err);
      }
      
      const combined = [
        ...mockClothes,
        ...apiClothes.filter(ap => !mockClothes.some(mc => mc.id === ap.id))
      ];
      
      return {
        products: combined.slice(skip, skip + limit),
        total: combined.length,
        skip,
        limit,
      };
    }

    if (category === 'automotive' || category === 'vehicle') {
      const limit = params?.limit || 20;
      const skip = params?.skip || 0;
      
      const categoriesToFetch = ['vehicle', 'motorcycle'];
      try {
        const responses = await Promise.all(
          categoriesToFetch.map(cat => 
            apiFetch<PaginatedProducts>(`/products/category/${cat}?limit=15`)
          )
        );
        
        let allProducts: Product[] = [];
        for (const res of responses) {
          if (res && res.products) {
            allProducts = [...allProducts, ...res.products];
          }
        }
        
        const productsMapped = allProducts.map(adjustProductPrice);
        
        return {
          products: productsMapped.slice(skip, skip + limit),
          total: productsMapped.length,
          skip,
          limit,
        };
      } catch (err) {
        console.error('Error fetching vehicle categories:', err);
        return {
          products: [],
          total: 0,
          skip,
          limit,
        };
      }
    }

    if (category === 'accessories') {
      const limit = params?.limit || 20;
      const skip = params?.skip || 0;
      
      const categoriesToFetch = ['sunglasses', 'womens-bags', 'womens-jewellery', 'mens-watches', 'womens-watches'];
      try {
        const responses = await Promise.all(
          categoriesToFetch.map(cat => 
            apiFetch<PaginatedProducts>(`/products/category/${cat}?limit=15`)
          )
        );
        
        let allProducts: Product[] = [];
        for (const res of responses) {
          if (res && res.products) {
            allProducts = [...allProducts, ...res.products];
          }
        }
        
        const productsMapped = allProducts.map(adjustProductPrice);
        
        return {
          products: productsMapped.slice(skip, skip + limit),
          total: productsMapped.length,
          skip,
          limit,
        };
      } catch (err) {
        console.error('Error fetching accessories categories:', err);
        return {
          products: [],
          total: 0,
          skip,
          limit,
        };
      }
    }

    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.skip) query.set('skip', String(params.skip));
    const qs = query.toString();
    const data = await apiFetch<PaginatedProducts>(`/products/category/${category}${qs ? `?${qs}` : ''}`);
    
    let products = data.products.map(adjustProductPrice);
    if (category === 'smartphones') {
      const mockSmartphones = MOCK_REDMI_PRODUCTS.filter(p => p.category === 'smartphones').map(adjustProductPrice);
      products = [...mockSmartphones, ...products];
    } else if (category === 'mens-shirts' || category === 'womens-dresses' || category === 'tops') {
      const mockClothes = MOCK_CLOTHING_PRODUCTS.filter(p => p.category === category).map(adjustProductPrice);
      products = [...mockClothes, ...products];
    }
    
    const additionalMocksLength = category === 'smartphones'
      ? MOCK_REDMI_PRODUCTS.filter(p => p.category === 'smartphones').length
      : (category === 'mens-shirts' || category === 'womens-dresses' || category === 'tops')
      ? MOCK_CLOTHING_PRODUCTS.filter(p => p.category === category).length
      : 0;

    return {
      ...data,
      products,
      total: data.total + additionalMocksLength,
    };
  },

  search: async (q: string, params?: { limit?: number }) => {
    const cleanQ = q.toLowerCase().trim();
    
    const matchedRedmi = MOCK_REDMI_PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(cleanQ) || 
      p.description.toLowerCase().includes(cleanQ) ||
      cleanQ.includes('redmi') || cleanQ.includes('xiaomi') || cleanQ.includes('mi')
    );
    
    const matchedClothing = MOCK_CLOTHING_PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(cleanQ) ||
      p.description.toLowerCase().includes(cleanQ) ||
      cleanQ.includes('kiyim') || cleanQ.includes('ko\'ylak') || cleanQ.includes('kostyum') || cleanQ.includes('bluzka') || cleanQ.includes('kardigan') || cleanQ.includes('futbolka') || cleanQ.includes('shirt') || cleanQ.includes('dress')
    );

    const matchedMocks = [...matchedRedmi, ...matchedClothing];

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

    const isRedmiSearch = cleanQ.includes('redmi') || cleanQ.includes('xiaomi') || cleanQ.includes('mi');
    const isClothingSearch = cleanQ.includes('kiyim') || cleanQ.includes('ko\'ylak') || cleanQ.includes('kostyum') || cleanQ.includes('dress') || cleanQ.includes('shirt') || cleanQ.includes('tops');
    
    let finalProducts = combinedProducts;
    if (isRedmiSearch) {
      finalProducts = combinedProducts.filter(p => p.brand.toLowerCase() === 'xiaomi' || p.title.toLowerCase().includes('xiaomi') || p.title.toLowerCase().includes('redmi'));
    } else if (isClothingSearch) {
      finalProducts = combinedProducts.filter(p => p.category === 'mens-shirts' || p.category === 'womens-dresses' || p.category === 'tops');
    }

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
      'clothing': 'Kiyim-kechak',
      'accessories': 'Aksessuarlar',
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
      'clothing': 'Одежда',
      'accessories': 'Аксессуары',
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
    'clothing': '👕',
    'accessories': '🕶️',
  };
  return icons[slug] || '📦';
}
