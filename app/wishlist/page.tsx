'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/lib/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/lib/LanguageContext';

export default function WishlistPage() {
  const { items, clearWishlist, itemCount } = useWishlist();
  const { t } = useLanguage();

  if (itemCount === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 100, marginBottom: 24 }}>❤️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{t('wishlistEmpty') || 'Sevimlilar ro\'yxati bo\'sh'}</h1>
        <p style={{ color: '#808080', fontSize: 16, marginBottom: 32 }}>
          {t('wishlistEmptyDesc') || 'O\'zingizga yoqqan mahsulotlarni keyinroq ko\'rish uchun ularni yurakcha yordamida qo\'shib qo\'ying!'}
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>❤️ {t('wishlist')} ({itemCount} {t('pieces')})</h1>
        <button
          onClick={clearWishlist}
          style={{ background: 'none', border: 'none', color: '#FF4D00', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
        >{t('clearCart')}</button>
      </div>

      <div className="responsive-product-grid">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
