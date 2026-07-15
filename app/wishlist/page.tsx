'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/lib/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/lib/LanguageContext';

export default function WishlistPage() {
  const { items, clearWishlist, itemCount, toggleWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const isUz = language === 'uz';

  if (itemCount === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 100, marginBottom: 24 }}>❤️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
          {t('wishlistEmpty') || "Sevimlilar ro'yxati bo'sh"}
        </h1>
        <p style={{ color: '#808080', fontSize: 16, marginBottom: 32, lineHeight: 1.5 }}>
          {t('wishlistEmptyDesc') || "O'zingizga yoqqan mahsulotlarni keyinroq ko'rish uchun ularni yurakcha yordamida qo'shib qo'ying!"}
        </p>
        <Link href="/products">
          <button style={{
            background: '#7000FF', color: 'white', border: 'none', borderRadius: 14,
            padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
          }}>{t('gotoProducts')} →</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px' }}>
            ❤️ {t('wishlist')}
          </h1>
          <p style={{ color: '#808080', fontSize: 14, margin: 0 }}>
            {itemCount} {t('pieces')} {isUz ? "mahsulot" : "товаров"}
          </p>
        </div>
        <button
          onClick={clearWishlist}
          style={{
            background: '#FFF0EB', border: 'none', color: '#FF4D00',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            padding: '10px 16px', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          🗑️ {t('clearCart')}
        </button>
      </div>

      {/* Products Grid */}
      <div className="responsive-product-grid">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{
        marginTop: 40, padding: '24px 32px', background: '#EDE8FF',
        borderRadius: 20, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
            {isUz ? "Barcha mahsulotlarni ko'rmoqchimisiz?" : "Хотите посмотреть все товары?"}
          </div>
          <div style={{ fontSize: 13, color: '#808080', marginTop: 4 }}>
            {isUz ? "Minglab yangi mahsulotlar sizni kutmoqda" : "Тысячи новых товаров ждут вас"}
          </div>
        </div>
        <Link href="/products">
          <button style={{
            background: '#7000FF', color: 'white', border: 'none',
            borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>
            {t('gotoProducts')} →
          </button>
        </Link>
      </div>
    </div>
  );
}
