'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'uz' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    // Header
    searchPlaceholder: "Mahsulotlar va turkumlar izlash",
    catalog: "Katalog",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    profile: "Profil",
    myOrders: "Buyurtmalarim",
    wishlist: "Saralangan",
    cart: "Savat",
    points: "Topshirish punktlari",
    becomeSeller: "Sotuvchi bo'lish",
    openPoint: "Topshirish punktini ochish",
    faq: "Savol-javob",
    more: "Yana",
    logout: "Chiqish",
    home: "Bosh sahifa",
    
    // Header Categories Navigation
    navGuaranteedPrices: "Arzon narxlar kafolati",
    navElectronics: "Elektronika",
    navAppliances: "Maishiy texnika",
    navGroceries: "Oziq-ovqat",
    navFurniture: "Mebel",
    navKitchen: "Oshxona buyumlari",
    navAutomotive: "Avtovizor",
    navSports: "Sport va turizm",
    navClothing: "Kiyim-kechak",
    navAccessories: "Aksessuarlar",
    
    // Dropdown Categories
    fragrances: "Parfyumeriya",
    beauty: "Go'zallik",
    skincare: "Terini parvarish qilish",
    sunglasses: "Quyosh ko'zoynaklari",
    womensBags: "Ayollar sumkalari",
    jewelry: "Zargarlik buyumlari",
    automotive: "Avtomobillar",
    lighting: "Yoritish moslamalari",
    
    // Home Page
    popular: "Mashhur",
    newProducts: "Yangi mahsulotlar",
    similarProducts: "O'xshash mahsulotlar",
    catMensClothing: "Erkaklar kiyimi",
    catKids: "Onalar va bolalar uchun",
    
    // Banners
    banner1Title: "YOZGI CHEGIRMALAR",
    banner1Sub: "30-IYUNGACHA",
    banner1Badge: "-70% GACHA",
    banner2Title: "ELEKTRONIKA",
    banner2Sub: "ENG YANGI MODELLAR",
    banner2Badge: "-50% GACHA",
    banner3Title: "OZIQ-OVQAT",
    banner3Sub: "YANGI MAHSULOTLAR",
    banner3Badge: "-30% GACHA",
    banner4Title: "ERKAKLAR MODASI",
    banner4Sub: "YANGI KOLLEKSIYA",
    banner4Badge: "-40% GACHA",
    
    // Product Card
    perMonth: "/oy",
    added: "Qo'shildi",
    inCart: "Savatda",
    toCart: "Savatga",
    
    // Product Page
    inStock: "Mavjud",
    outOfStock: "Tugagan",
    reviews: "sharhlar",
    reviewTitle: "Sharhlar",
    specs: "Xususiyatlar",
    description: "Tavsif",
    nasiyaTitle: "Uzum Nasiya",
    addToCart: "Korzinkaga qo'shish",
    inCartUpdate: "Korzinada",
    buyNow: "Hoziroq sotib olish",
    fastDelivery: "Tez yetkazib berish",
    fastDeliveryDesc: "1–3 ish kunida Toshkent bo'ylab",
    returnGuarantee: "Qaytarish kafolati",
    returnGuaranteeDesc: "14 kun ichida qaytarish imkoniyati",
    originalProduct: "Original mahsulot",
    originalProductDesc: "Faqat rasmiy sotuvchilar, soxta mahsulotlar yo'q",
    brand: "Brend",
    category: "Kategoriya",
    rating: "Reyting",
    quantity: "Miqdor",
    saving: "Tejaysiz",
    deliveryTime: "1 kun, bepul",
    deliveryDescription: "Uzum topshirish punktlarida bepul yetkazib berish. Eshikkacha kuryerlik xizmati pullik.",
    buyNowOneClick: "Bir klikda sotib olish",
    update: "Yangilash",
    stock: "Ombordagi miqdor",
    tags: "Teglar",
    pieces: "ta",
    
    // Cart Page
    cartTitle: "Korzinka",
    cartEmpty: "Korzinka bo'sh",
    cartEmptyDesc: "Xarid qilishni boshlash uchun mahsulot qo'shing!",
    gotoProducts: "Mahsulotlarga o'tish",
    clearCart: "Hammasini o'chirish",
    orderSummary: "Buyurtma xulosasi",
    productsCount: "Mahsulotlar",
    discount: "Chegirma",
    delivery: "Yetkazib berish",
    free: "Bepul",
    total: "Jami",
    nasiyaOption: "Nasiya bilan",
    checkoutBtn: "Buyurtma berish",
    continueShopping: "Xaridni davom ettirish",
    delete: "O'chirish",
    
    // Filter Sidebar & Products
    filters: "Filtrlar",
    search: "Qidiruv",
    priceRange: "Narx diapazoni",
    minRating: "Minimal reyting",
    all: "Barchasi",
    clearFilters: "Filtrlarni tozalash",
    applyPrice: "Narxni qo'llash",
    allProducts: "Barcha mahsulotlar",
    noProductsFound: "Mahsulot topilmadi",
    noProductsFoundDesc: "Filtrlarni o'zgartiring yoki boshqa narsa qidiring",
    prev: "← Oldingi",
    next: "Keyingi →",
    productNamePlaceholder: "Mahsulot nomi...",
    from: "Dan",
    to: "Gacha",
    totalCount: "Jami {count} ta mahsulot",
    
    // Sorting
    sortDefault: "Tavsiya etilgan",
    sortPriceAsc: "Narx: arzondan qimmatga",
    sortPriceDesc: "Narx: qimmatdan arzonga",
    sortRating: "Reytingi yuqori",
    sortDiscount: "Chegirma foizi",
    
    // Checkout Page
    checkoutTitle: "Buyurtma berish",
    stepDelivery: "Yetkazish",
    stepPayment: "To'lov",
    stepConfirm: "Tasdiqlash",
    orderPlacedTitle: "Buyurtma qabul qilindi!",
    orderNumber: "Buyurtma raqami",
    orderSuccessDesc: "Tez orada operator siz bilan bog'lanadi. Yetkazib berish 1-3 ish kunida amalga oshiriladi.",
    goHome: "Bosh sahifaga",
    shopNow: "Xarid qilish",
    deliveryAddress: "Yetkazib berish manzili",
    firstName: "Ism",
    lastName: "Familiya",
    phone: "Telefon raqam",
    city: "Shahar",
    address: "Manzil",
    nextBtn: "Keyingi",
    backBtn: "Ortga",
    selectPayment: "To'lov usuli",
    cardPayment: "Plastik karta",
    cashPayment: "Naqd pul",
    orderConfirmation: "Buyurtmani tasdiqlash",
    confirmOrderBtn: "Buyurtma berish",
    paymentDescCard: "Visa, Mastercard, Uzcard, Humo",
    paymentDescCash: "Yetkazib kelganda to'lash",
    paymentDescNasiya: "0% bilan 12 oyga bo'lib to'lash",
    streetAddress: "Ko'cha manzili",
    streetAddressPlaceholder: "Ko'cha, uy, kvartira raqami",
    choosePayment: "To'lov usulini tanlash",
    phonePlaceholder: "+998 90 000 00 00",
    checkoutConfirmTitle: "Buyurtmani tasdiqlang",
    
    // Login / Register
    welcomeBack: "Xush kelibsiz!",
    loginPageDesc: "Uzum Market hisobingizga kiring",
    usernameLabel: "Login yoki telefon raqam",
    usernamePlaceholder: "Loginni kiriting",
    passwordLabel: "Parol",
    passwordPlaceholder: "Parolni kiriting",
    loginError: "Login yoki parol noto'g'ri. Qayta urinib ko'ring.",
    forgotPass: "Parolni unutdingizmi?",
    loadingText: "Yuklanmoqda...",
    orText: "yoki",
    noAccount: "Hisob yo'qmi?",
    registerNow: "Ro'yxatdan o'tish",
    registerTitle: "Ro'yxatdan o'tish",
    registerDesc: "Uzum Marketda yangi hisob yarating",
    registerError: "Ro'yxatdan o'tishda xatolik yuz berdi",
    alreadyHasAccount: "Hisobingiz bormi?",
    passwordsDoNotMatch: "Parollar mos kelmaydi",
    acceptTerms: "Foydalanish shartlarini qabul qiling",
    termsText: "Foydalanish shartlari",
    andText: "va",
    privacyText: "Maxfiylik siyosati",
    agreeText: "bilan roziman",
    emailLabel: "Email",
    emailPlaceholder: "email@gmail.com",
    passwordConfirmLabel: "Parolni tasdiqlash",
    passwordConfirmPlaceholder: "Parolni qaytaring",
    min8Chars: "Kamida 8 belgi",
    
    // Orders Page
    ordersDesc: "Barcha buyurtmalar tarixi",
    noOrders: "Buyurtma yo'q",
    noOrdersDesc: "Xarid qiling va buyurtmalaringiz bu yerda ko'rinadi",
    details: "Batafsil",
    statusDelivered: "Yetkazildi",
    statusShipped: "Yo'lda",
    statusProcessing: "Jarayonda",
    statusCancelled: "Bekor qilindi",
    
    // Profile Page
    personalInfo: "Shaxsiy ma'lumotlar",
    settings: "Sozlamalar",
    edit: "Tahrirlash",
    changePassword: "Parolni o'zgartirish",
    order: "Buyurtma",
    favorite: "Sevimli",
    review: "Sharh",
    
    // Search Page
    noResultsFound: "Hech narsa topilmadi",
    enterSearchQuery: "Qidiruv so'zini kiriting.",
    noResultsForQuery: '"{query}" bo\'yicha natija yo\'q. Boshqa so\'z bilan qidiring.',
    searchTitle: "Qidiruv:",
    resultsFound: "{total} ta natija topildi",
    
    // Footer
    footerAbout: "Biz haqimizda",
    footerDeliveryPoints: "Topshirish punktlari",
    footerCareers: "Vakansiyalar",
    footerForUsers: "Foydalanuvchilarga",
    footerContact: "Biz bilan bog'lanish",
    footerForSellers: "Tadbirkorlarga",
    footerSellOnUzum: "Uzumda soting",
    footerSellerCabinet: "Sotuvchi kabinetiga kirish",
    footerDownloadApp: "Ilovani yuklab olish",
    footerSocials: "Uzum ijtimoiy tarmoqlarda",
    footerPrivacy: "Maxfiylik kelishuvi",
    footerTerms: "Foydalanuvchi kelishuvi",
    footerProcessing: "SHAXSIY MA'LUMOTLARNI QAYTA ISHLASH NIZOMI «UZUM MARKET» MCHJ XK",
    footerCopyright: "«2026» XK MCH «UZUM MARKET». STIR 309376127. Barcha huquqlar himoyalangan.",
  },
  ru: {
    // Header
    searchPlaceholder: "Искать товары и категории",
    catalog: "Каталог",
    login: "Войти",
    register: "Регистрация",
    profile: "Профиль",
    myOrders: "Мои заказы",
    wishlist: "Избранное",
    cart: "Корзина",
    points: "Пункты выдачи",
    becomeSeller: "Стать продавцом",
    openPoint: "Открыть пункт выдачи",
    faq: "Вопросы-ответы",
    more: "Еще",
    logout: "Выйти",
    home: "Главная",
    
    // Header Categories Navigation
    navGuaranteedPrices: "Гарантия низких цен",
    navElectronics: "Электроника",
    navAppliances: "Бытовая техника",
    navGroceries: "Продукты питания",
    navFurniture: "Мебель",
    navKitchen: "Кухонные принадлежности",
    navAutomotive: "Автотовары",
    navSports: "Спорт и туризм",
    navClothing: "Одежда",
    navAccessories: "Аксессуары",
    
    // Dropdown Categories
    fragrances: "Парфюмерия",
    beauty: "Красота",
    skincare: "Уход за кожей",
    sunglasses: "Солнцезащитные очки",
    womensBags: "Женские сумки",
    jewelry: "Ювелирные изделия",
    automotive: "Автотовары",
    lighting: "Освещение",
    
    // Home Page
    popular: "Популярное",
    newProducts: "Новые товары",
    similarProducts: "Похожие товары",
    catMensClothing: "Мужская одежда",
    catKids: "Мамам и детям",
    
    // Banners
    banner1Title: "ЛЕТНИЕ СКИДКИ",
    banner1Sub: "ДО 30 ИЮНЯ",
    banner1Badge: "ДО -70%",
    banner2Title: "ЭЛЕКТРОНИКА",
    banner2Sub: "НОВЕЙШИЕ МОДЕЛИ",
    banner2Badge: "ДО -50%",
    banner3Title: "ПРОДУКТЫ",
    banner3Sub: "СВЕЖИЕ ПРОДУКТЫ",
    banner3Badge: "ДО -30%",
    banner4Title: "МУЖСКАЯ МОДА",
    banner4Sub: "НОВАЯ КОЛЛЕКЦИЯ",
    banner4Badge: "ДО -40%",
    
    // Product Card
    perMonth: "/мес",
    added: "Добавлено",
    inCart: "В корзине",
    toCart: "В корзину",
    
    // Product Page
    inStock: "В наличии",
    outOfStock: "Нет в наличии",
    reviews: "отзывов",
    reviewTitle: "Отзывы",
    specs: "Характеристики",
    description: "Описание",
    nasiyaTitle: "Узум Насия",
    addToCart: "Добавить в корзину",
    inCartUpdate: "В корзине",
    buyNow: "Купить сейчас",
    fastDelivery: "Быстрая доставка",
    fastDeliveryDesc: "За 1–3 рабочих дня по Ташкенту",
    returnGuarantee: "Гарантия возврата",
    returnGuaranteeDesc: "Возможность возврата в течение 14 дней",
    originalProduct: "Оригинальный товар",
    originalProductDesc: "Только официальные продавцы, никаких подделок",
    brand: "Бренд",
    category: "Категория",
    rating: "Рейтинг",
    quantity: "Количество",
    saving: "Экономия",
    deliveryTime: "1 день, бесплатно",
    deliveryDescription: "Бесплатная доставка в пункты выдачи Uzum. Доставка курьером до двери платная.",
    buyNowOneClick: "Купить в 1 клик",
    update: "Обновить",
    stock: "Количество на складе",
    tags: "Теги",
    pieces: "шт",
    
    // Cart Page
    cartTitle: "Корзина",
    cartEmpty: "Корзина пуста",
    cartEmptyDesc: "Добавьте товары, чтобы начать покупки!",
    gotoProducts: "Перейти к товарам",
    clearCart: "Очистить всё",
    orderSummary: "Оформление заказа",
    productsCount: "Товары",
    discount: "Скидка",
    delivery: "Доставка",
    free: "Бесплатно",
    total: "Итого",
    nasiyaOption: "В рассрочку",
    checkoutBtn: "Оформить заказ",
    continueShopping: "Продолжить покупки",
    delete: "Удалить",
    
    // Filter Sidebar & Products
    filters: "Фильтры",
    search: "Поиск",
    priceRange: "Диапазон цен",
    minRating: "Минимальный рейтинг",
    all: "Все",
    clearFilters: "Сбросить фильтры",
    applyPrice: "Применить цену",
    allProducts: "Все товары",
    noProductsFound: "Товары не найдены",
    noProductsFoundDesc: "Измените фильтры или введите другой поисковый запрос",
    prev: "← Предыдущий",
    next: "Следующий →",
    productNamePlaceholder: "Название товара...",
    from: "От",
    to: "До",
    totalCount: "Всего {count} товаров",
    
    // Sorting
    sortDefault: "Рекомендуемые",
    sortPriceAsc: "Цена: по возрастанию",
    sortPriceDesc: "Цена: по убыванию",
    sortRating: "Высокий рейтинг",
    sortDiscount: "Размер скидки",
    
    // Checkout Page
    checkoutTitle: "Оформление заказа",
    stepDelivery: "Доставка",
    stepPayment: "Оплата",
    stepConfirm: "Подтверждение",
    orderPlacedTitle: "Заказ принят!",
    orderNumber: "Номер заказа",
    orderSuccessDesc: "Скоро с вами свяжется оператор. Доставка будет осуществлена в течение 1-3 рабочих дней.",
    goHome: "На главную",
    shopNow: "Перейти к покупкам",
    deliveryAddress: "Адрес доставки",
    firstName: "Имя",
    lastName: "Фамилия",
    phone: "Номер телефона",
    city: "Город",
    address: "Адрес",
    nextBtn: "Далее",
    backBtn: "Назад",
    selectPayment: "Способ оплаты",
    cardPayment: "Пластиковая карта",
    cashPayment: "Наличные",
    orderConfirmation: "Подтверждение заказа",
    confirmOrderBtn: "Оформить заказ",
    paymentDescCard: "Visa, Mastercard, Uzcard, Humo",
    paymentDescCash: "Оплата при получении",
    paymentDescNasiya: "Рассрочка на 12 месяцев без наценки",
    streetAddress: "Улица и адрес",
    streetAddressPlaceholder: "Улица, дом, квартира",
    choosePayment: "Выбрать способ оплаты",
    phonePlaceholder: "+998 90 000 00 00",
    checkoutConfirmTitle: "Подтвердите заказ",
    
    // Login / Register
    welcomeBack: "Добро пожаловать!",
    loginPageDesc: "Войдите в свой аккаунт Uzum Market",
    usernameLabel: "Логин или номер телефона",
    usernamePlaceholder: "Введите логин",
    passwordLabel: "Пароль",
    passwordPlaceholder: "Введите пароль",
    loginError: "Неверный логин или пароль. Попробуйте еще раз.",
    forgotPass: "Забыли пароль?",
    loadingText: "Загрузка...",
    orText: "или",
    noAccount: "Нет аккаунта?",
    registerNow: "Зарегистрироваться",
    registerTitle: "Регистрация",
    registerDesc: "Создайте новый аккаунт в Uzum Market",
    registerError: "Произошла ошибка при регистрации",
    alreadyHasAccount: "Уже есть аккаунт?",
    passwordsDoNotMatch: "Пароли не совпадают",
    acceptTerms: "Примите условия использования",
    termsText: "условиями использования",
    andText: "и",
    privacyText: "политикой конфиденциальности",
    agreeText: "Я согласен с",
    emailLabel: "Электронная почта",
    emailPlaceholder: "email@gmail.com",
    passwordConfirmLabel: "Подтверждение пароля",
    passwordConfirmPlaceholder: "Повторите пароль",
    min8Chars: "Минимум 8 символов",
    
    // Orders Page
    ordersDesc: "История всех заказов",
    noOrders: "Нет заказов",
    noOrdersDesc: "Совершите покупку, и ваши заказы появятся здесь",
    details: "Подробнее",
    statusDelivered: "Доставлен",
    statusShipped: "В пути",
    statusProcessing: "В обработке",
    statusCancelled: "Отменен",
    
    // Profile Page
    personalInfo: "Личные данные",
    settings: "Настройки",
    edit: "Редактировать",
    changePassword: "Изменить пароль",
    order: "Заказ",
    favorite: "Избранное",
    review: "Отзыв",
    
    // Search Page
    noResultsFound: "Ничего не найдено",
    enterSearchQuery: "Введите поисковый запрос.",
    noResultsForQuery: 'По запросу "{query}" ничего не найдено. Попробуйте поискать по-другому.',
    searchTitle: "Поиск:",
    resultsFound: "Найдено {total} результатов",
    
    // Footer
    footerAbout: "О нас",
    footerDeliveryPoints: "Пункты выдачи",
    footerCareers: "Вакансии",
    footerForUsers: "Пользователям",
    footerContact: "Связаться с нами",
    footerForSellers: "Партнерам",
    footerSellOnUzum: "Продавать на Uzum",
    footerSellerCabinet: "Личный кабинет продавца",
    footerDownloadApp: "Скачать приложение",
    footerSocials: "Uzum в соцсетях",
    footerPrivacy: "Соглашение о конфиденциальности",
    footerTerms: "Пользовательское соглашение",
    footerProcessing: "ПОЛОЖЕНИЕ О БЕЗОПАСНОСТИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ СП ООО «UZUM MARKET»",
    footerCopyright: "«2026» СП ООО «UZUM MARKET». ИНН 309376127. Все права защищены.",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz');

  useEffect(() => {
    const saved = localStorage.getItem('uzum_lang') as Language;
    if (saved === 'uz' || saved === 'ru') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('uzum_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
