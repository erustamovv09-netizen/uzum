'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, formatPrice, getDiscountedPrice } from '@/lib/api';
import { useCart } from '@/lib/CartContext';
import { useWishlist } from '@/lib/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/lib/LanguageContext';

interface ProductDetailsClientProps {
  product: Product;
  related: Product[];
}

function getDynamicSpecs(product: Product, t: (key: string) => string, lang: string) {
  const specs = [
    { label: t('brand'), value: product.brand || '—' },
    { label: t('category'), value: t(product.category) || product.category },
    { label: 'SKU', value: `UZM-${product.id}` },
  ];

  if (product.category === 'smartphones') {
    const isApple = product.brand?.toLowerCase().includes('apple') || product.title.toLowerCase().includes('iphone');
    const isSamsung = product.brand?.toLowerCase().includes('samsung') || product.title.toLowerCase().includes('samsung');
    
    if (isApple) {
      specs.push(
        { label: lang === 'uz' ? 'Xotira' : 'Встроенная память', value: product.title.includes('Pro') ? '256 GB' : '128 GB' },
        { label: lang === 'uz' ? 'Operativ xotira' : 'Оперативная память', value: product.title.includes('Pro') ? '6 GB' : '4 GB' },
        { label: lang === 'uz' ? 'Akkumulyator sig\'imi' : 'Емкость аккумулятора', value: product.title.includes('13') ? '3095 mAh' : '2815 mAh' },
        { label: lang === 'uz' ? 'Ekran o\'lchami' : 'Диагональ экрана', value: '6.1"' },
        { label: lang === 'uz' ? 'Ekran turi' : 'Тип матрицы', value: 'Super Retina XDR OLED' },
        { label: lang === 'uz' ? 'Protsessor' : 'Процессор', value: product.title.includes('13') ? 'Apple A15 Bionic' : 'Apple A14 Bionic' },
        { label: lang === 'uz' ? 'Kamera' : 'Камера', value: '12 MP + 12 MP + 12 MP' }
      );
    } else if (isSamsung) {
      specs.push(
        { label: lang === 'uz' ? 'Xotira' : 'Встроенная память', value: '256 GB' },
        { label: lang === 'uz' ? 'Operativ xotira' : 'Оперативная память', value: '8 GB' },
        { label: lang === 'uz' ? 'Akkumulyator sig\'imi' : 'Емкость аккумулятора', value: '5000 mAh' },
        { label: lang === 'uz' ? 'Ekran o\'lchami' : 'Диагональ экрана', value: '6.5"' },
        { label: lang === 'uz' ? 'Ekran turi' : 'Тип матрицы', value: 'Dynamic AMOLED 2X' },
        { label: lang === 'uz' ? 'Protsessor' : 'Процессор', value: 'Exynos 2100' },
        { label: lang === 'uz' ? 'Kamera' : 'Камера', value: '64 MP + 12 MP + 12 MP' }
      );
    } else {
      specs.push(
        { label: lang === 'uz' ? 'Xotira' : 'Встроенная память', value: '128 GB' },
        { label: lang === 'uz' ? 'Operativ xotira' : 'Оперативная память', value: '6 GB' },
        { label: lang === 'uz' ? 'Akkumulyator sig\'imi' : 'Емкость аккумулятора', value: '4500 mAh' },
        { label: lang === 'uz' ? 'Ekran o\'lchami' : 'Диагональ экрана', value: '6.3"' },
        { label: lang === 'uz' ? 'Kamera' : 'Камера', value: '48 MP' }
      );
    }
  } else if (product.category === 'laptops') {
    const isMac = product.title.toLowerCase().includes('macbook') || product.brand?.toLowerCase().includes('apple');
    if (isMac) {
      specs.push(
        { label: lang === 'uz' ? 'Protsessor' : 'Процессор', value: 'Apple M1' },
        { label: lang === 'uz' ? 'Operativ xotira' : 'Оперативная память', value: '8 GB / 16 GB' },
        { label: lang === 'uz' ? 'SSD xotira' : 'Накопитель SSD', value: '256 GB / 512 GB' },
        { label: lang === 'uz' ? 'Ekran o\'lchami' : 'Диагональ экрана', value: '13.3"' },
        { label: lang === 'uz' ? 'Ekran ruxsati' : 'Разрешение экрана', value: '2560x1600 Retina' },
        { label: lang === 'uz' ? 'Operatsion tizim' : 'Операционная система', value: 'macOS' }
      );
    } else {
      specs.push(
        { label: lang === 'uz' ? 'Protsessor' : 'Процессор', value: 'Intel Core i5' },
        { label: lang === 'uz' ? 'Operativ xotira' : 'Оперативная память', value: '8 GB' },
        { label: lang === 'uz' ? 'SSD xotira' : 'Накопитель SSD', value: '256 GB' },
        { label: lang === 'uz' ? 'Ekran o\'lchami' : 'Диагональ экрана', value: '15.6"' },
        { label: lang === 'uz' ? 'Operatsion tizim' : 'Операционная система', value: 'Windows 11' }
      );
    }
  } else if (product.category === 'groceries') {
    specs.push(
      { label: lang === 'uz' ? 'Og\'irligi / Hajmi' : 'Вес / Объем', value: product.title.toLowerCase().includes('milk') ? '1 litr' : '1 kg' },
      { label: lang === 'uz' ? 'Ishlab chiqarilgan joy' : 'Страна производства', value: 'O\'zbekiston' },
      { label: lang === 'uz' ? 'Saqlash sharoiti' : 'Условия хранения', value: '+2°C... +6°C' },
      { label: lang === 'uz' ? 'Muddati' : 'Срок годности', value: '30 kun' }
    );
  } else {
    specs.push(
      { label: lang === 'uz' ? 'Ishlab chiqarilgan joy' : 'Страна производства', value: 'Xitoy' },
      { label: lang === 'uz' ? 'Kafolat' : 'Гарантия', value: '14 kun' },
      { label: lang === 'uz' ? 'Paket tarkibi' : 'Комплектация', value: 'Mahsulot, yo\'riqnoma' }
    );
  }

  return specs;
}

export default function ProductDetailsClient({ product, related }: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedMsg, setAddedMsg] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const { t, language } = useLanguage();

  const wishlist = isInWishlist(product.id);
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const inCart = isInCart(product.id);
  const cartQty = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: '#808080' }}>
        <a href="/" style={{ color: '#808080', textDecoration: 'none' }}>{t('home')}</a>
        <span>›</span>
        <a href={`/category/${product.category}`} style={{ color: '#808080', textDecoration: 'none' }}>{product.category}</a>
        <span>›</span>
        <span style={{ color: '#1A1A1A' }}>{product.title}</span>
      </div>

      {/* Product main */}
      <div className="product-details-grid" style={{ marginBottom: 48 }}>
        {/* Images */}
        <div>
          <div style={{
            background: '#F8F8F8', borderRadius: 20, overflow: 'hidden',
            aspectRatio: '1', position: 'relative', marginBottom: 16,
          }}>
            <Image
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              fill
              style={{ objectFit: 'contain', padding: 16 }}
              sizes="50vw"
              referrerPolicy="no-referrer"
            />
            {product.discountPercentage > 5 && (
              <div style={{
                position: 'absolute', top: 16, left: 16,
                background: '#FF4D00', color: 'white',
                padding: '6px 12px', borderRadius: 8, fontWeight: 700, fontSize: 16,
              }}>
                -{Math.round(product.discountPercentage)}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  width: 72, height: 72, borderRadius: 10, overflow: 'hidden',
                  border: `2px solid ${i === selectedImage ? '#7000FF' : '#E0E0E0'}`,
                  background: '#F8F8F8', cursor: 'pointer', flexShrink: 0, position: 'relative',
                }}
              >
                <Image src={img} alt={`${product.title} ${i + 1}`} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {product.brand && (
              <span style={{ background: '#EDE8FF', color: '#7000FF', padding: '4px 10px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                {product.brand}
              </span>
            )}
            <span style={{
              background: product.stock > 0 ? '#E8FFF0' : '#FFF0F0',
              color: product.stock > 0 ? '#00C853' : '#FF4D00',
              padding: '4px 10px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            }}>
              {product.stock > 0 ? `✓ ${t('inStock')} (${product.stock} ${t('pieces')})` : `✗ ${t('outOfStock')}`}
            </span>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 16 }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} style={{ fontSize: 18, color: s <= Math.round(product.rating) ? '#FFB800' : '#E0E0E0' }}>★</span>
              ))}
            </div>
            <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{product.rating.toFixed(1)}</span>
            <span style={{ color: '#808080', fontSize: 14 }}>• 142 {t('reviews')}</span>
          </div>

          {/* Price */}
          <div style={{
            background: '#F8F8F8', borderRadius: 16, padding: 20, marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#1A1A1A' }}>
                {formatPrice(discountedPrice)}
              </span>
              {product.discountPercentage > 5 && (
                <span style={{ fontSize: 18, color: '#808080', textDecoration: 'line-through' }}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {product.discountPercentage > 5 && (
              <div style={{ color: '#FF4D00', fontWeight: 600, fontSize: 14 }}>
                {t('saving')}: {formatPrice(product.price - discountedPrice)}
              </div>
            )}

            {/* Nasiya */}
            <div style={{
              marginTop: 12, background: '#EDE8FF', borderRadius: 10, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 20 }}>💳</span>
              <div>
                <div style={{ fontWeight: 700, color: '#7000FF', fontSize: 14 }}>{t('nasiyaTitle')}</div>
                <div style={{ color: '#5500CC', fontSize: 13 }}>
                  {formatPrice(discountedPrice / 12)}{t('perMonth')} • 12 {t('perMonth').replace('/', '')} • 0%
                </div>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <label style={{ fontWeight: 600, fontSize: 14, color: '#404040' }}>{t('quantity')}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid #E0E0E0', borderRadius: 10, overflow: 'hidden' }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ width: 40, height: 40, border: 'none', background: '#F8F8F8', cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
              >−</button>
              <span style={{ padding: '0 20px', fontSize: 16, fontWeight: 600 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                style={{ width: 40, height: 40, border: 'none', background: '#F8F8F8', cursor: 'pointer', fontSize: 18, fontWeight: 700 }}
              >+</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                flex: 1, background: addedMsg ? '#00C853' : '#7000FF',
                color: 'white', border: 'none', borderRadius: 14,
                padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {addedMsg ? `✓ ${t('added')}` : inCart ? `${t('inCart')} (${cartQty + quantity}) → ${t('update')}` : `🛒 ${t('addToCart')}`}
            </button>
            <button
              onClick={handleToggleWishlist}
              style={{
                width: 52,
                height: 52,
                background: wishlist ? 'var(--uzum-purple-light)' : '#F5F5F5',
                border: `1.5px solid ${wishlist ? 'var(--uzum-purple)' : 'transparent'}`,
                borderRadius: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                transform: isPopping ? 'scale(1.25)' : 'scale(1)',
              }}
              onMouseEnter={e => {
                if (!wishlist) {
                  (e.currentTarget as HTMLButtonElement).style.background = '#EAEAEA';
                }
              }}
              onMouseLeave={e => {
                if (!wishlist) {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F5';
                }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={wishlist ? '#FF1A8C' : 'none'} stroke={wishlist ? '#FF1A8C' : '#1C1C1C'} strokeWidth="1.8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Buy now */}
          <button
            onClick={() => { handleAddToCart(); window.location.href = '/cart'; }}
            disabled={product.stock === 0}
            style={{
              width: '100%', background: '#EDE8FF', color: '#7000FF', border: 'none',
              borderRadius: 14, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 20,
            }}
          >⚡ {t('buyNowOneClick')}</button>

          {/* Delivery info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🚚', title: t('fastDelivery'), desc: t('fastDeliveryDesc') },
              { icon: '↩️', title: t('returnGuarantee'), desc: t('returnGuaranteeDesc') },
              { icon: '🛡️', title: t('originalProduct'), desc: t('originalProductDesc') },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A' }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#808080' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #F0F0F0', marginBottom: 24 }}>
          {[
            { key: 'description', label: t('description') },
            { key: 'specs', label: t('specs') },
            { key: 'reviews', label: `${t('reviewTitle')} (142)` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{
                padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 15, fontWeight: 600,
                color: activeTab === tab.key ? '#7000FF' : '#808080',
                borderBottom: `2px solid ${activeTab === tab.key ? '#7000FF' : 'transparent'}`,
                marginBottom: -2,
              }}
            >{tab.label}</button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#404040' }}>{product.description}</p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {getDynamicSpecs(product, t, language).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F0F0F0' }}>
                    <td style={{ padding: '12px 0', fontWeight: 600, color: '#404040', width: '40%' }}>{row.label}</td>
                    <td style={{ padding: '12px 0', color: '#1A1A1A' }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ background: 'white', borderRadius: 16, padding: 24 }}>
            {/* Review summary */}
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>{product.rating.toFixed(1)}</div>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '8px 0' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} style={{ fontSize: 20, color: s <= Math.round(product.rating) ? '#FFB800' : '#E0E0E0' }}>★</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: '#808080' }}>142 {t('reviews')}</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, width: 20, textAlign: 'right' }}>{star}</span>
                    <span style={{ color: '#FFB800' }}>★</span>
                    <div style={{ flex: 1, height: 8, background: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', background: '#FFB800', borderRadius: 4,
                        width: `${[70, 15, 8, 4, 3][5 - star]}%`,
                      }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#808080', width: 30 }}>{[70, 15, 8, 4, 3][5 - star]}%</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Sample reviews */}
            {[
              { name: 'Jasur T.', rating: 5, date: '2024-03-15', text: 'Juda yaxshi mahsulot! Sifati a\'lo, tez yetkazib berildi. Tavsiya qilaman!' },
              { name: 'Malika R.', rating: 4, date: '2024-03-10', text: 'Yaxshi mahsulot, lekin qadoqlash biroz nozik edi. Umuman olganda mamnun.' },
              { name: 'Bobur K.', rating: 5, date: '2024-03-05', text: 'Kutganimdan ham yaxshi. Sifat zo\'r, narx mos. 5 yulduz!' },
            ].map((review, i) => (
              <div key={i} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', background: '#7000FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: 14,
                    }}>{review.name[0]}</div>
                    <span style={{ fontWeight: 600 }}>{review.name}</span>
                  </div>
                  <span style={{ color: '#808080', fontSize: 13 }}>{review.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} style={{ color: s <= review.rating ? '#FFB800' : '#E0E0E0' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#404040', lineHeight: 1.6 }}>{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{t('similarProducts')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
