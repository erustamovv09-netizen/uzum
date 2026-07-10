'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { formatPrice, getDiscountedPrice } from '@/lib/api';
import { useLanguage } from '@/lib/LanguageContext';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { t } = useLanguage();

  if (state.items.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 100, marginBottom: 24 }}>🛒</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{t('cartEmpty')}</h1>
        <p style={{ color: '#808080', fontSize: 16, marginBottom: 32 }}>
          {t('cartEmptyDesc')}
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


  const totalSaving = state.items.reduce((sum, item) => {
    const discounted = getDiscountedPrice(item.product.price, item.product.discountPercentage);
    return sum + (item.product.price - discounted) * item.quantity;
  }, 0);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px', boxSizing: 'border-box' }}>
      <div className="cart-header">
        <h1>🛒 {t('cartTitle')} ({state.itemCount} {t('pieces')})</h1>
        <button
          onClick={clearCart}
          style={{ background: 'none', border: 'none', color: '#FF4D00', cursor: 'pointer', fontSize: 14, fontWeight: 600, flexShrink: 0 }}
        >{t('clearCart')}</button>
      </div>

      <div className="cart-layout-grid">
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {state.items.map(item => {
            const discountedPrice = getDiscountedPrice(item.product.price, item.product.discountPercentage);
            return (
              <div key={item.product.id} style={{
                background: 'white', borderRadius: 16, padding: 16,
                display: 'flex', gap: 16, border: '1px solid #F0F0F0',
              }}>
                {/* Image */}
                <Link href={`/product/${item.product.id}`}>
                  <div style={{
                    width: 100, height: 100, background: '#F8F8F8', borderRadius: 10,
                    flexShrink: 0, position: 'relative', overflow: 'hidden',
                  }}>
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link href={`/product/${item.product.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 4, lineHeight: 1.4 }}>
                      {item.product.title}
                    </div>
                  </Link>
                  <div style={{ fontSize: 12, color: '#808080', marginBottom: 12 }}>
                    {item.product.brand || item.product.category}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid #E0E0E0', borderRadius: 8 }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
                      >−</button>
                      <span style={{ padding: '0 12px', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
                      >+</button>
                    </div>

                    {/* Price */}
                    <div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
                        {formatPrice(discountedPrice * item.quantity)}
                      </span>
                      {item.product.discountPercentage > 5 && (
                        <span style={{ fontSize: 12, color: '#808080', textDecoration: 'line-through', marginLeft: 8 }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        background: '#FFF0EB', border: 'none', borderRadius: 8,
                        padding: '6px 12px', cursor: 'pointer', color: '#FF4D00', fontSize: 13, fontWeight: 600,
                      }}
                    >🗑️ {t('delete')}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div>
          <div style={{
            background: 'white', borderRadius: 20, padding: 24, border: '1px solid #F0F0F0',
            position: 'sticky', top: 90,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t('orderSummary')}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#808080' }}>{t('productsCount')} ({state.itemCount} {t('pieces')})</span>
                <span>{formatPrice(state.total)}</span>
              </div>
              {totalSaving > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#808080' }}>{t('discount')}</span>
                  <span style={{ color: '#00C853' }}>-{formatPrice(totalSaving)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#808080' }}>{t('delivery')}</span>
                <span style={{ color: '#00C853' }}>{t('free')} 🎉</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{t('total')}</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#7000FF' }}>
                {formatPrice(state.items.reduce((sum, item) => {
                  return sum + getDiscountedPrice(item.product.price, item.product.discountPercentage) * item.quantity;
                }, 0))}
              </span>
            </div>

            {/* Nasiya option */}
            <div style={{
              background: '#EDE8FF', borderRadius: 12, padding: '12px 16px', marginBottom: 20,
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span style={{ fontSize: 20 }}>💳</span>
              <div style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 700, color: '#7000FF' }}>{t('nasiyaOption')}</div>
                <div style={{ color: '#5500CC' }}>
                  {formatPrice(state.items.reduce((sum, item) => {
                    return sum + getDiscountedPrice(item.product.price, item.product.discountPercentage) * item.quantity;
                  }, 0) / 12)}{t('perMonth')}
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <button style={{
                width: '100%', background: '#7000FF', color: 'white', border: 'none',
                borderRadius: 14, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                marginBottom: 12,
              }}>{t('checkoutBtn')} →</button>
            </Link>
            <Link href="/products">
              <button style={{
                width: '100%', background: '#EDE8FF', color: '#7000FF', border: 'none',
                borderRadius: 14, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>← {t('continueShopping')}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
