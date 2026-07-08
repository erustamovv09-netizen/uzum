'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, formatPrice, getDiscountedPrice } from '@/lib/api';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';
import { useWishlist } from '@/lib/WishlistContext';

interface ProductCardProps {
  product: Product;
}

function getCategoryFallbackImage(category: string): string {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('groceries')) {
    return 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('shirt') || cat.includes('dress') || cat.includes('top') || cat.includes('shoe') || cat.includes('cloth') || cat.includes('pant') || cat.includes('coat')) {
    return 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('phone') || cat.includes('laptop') || cat.includes('tablet') || cat.includes('device') || cat.includes('electronic') || cat.includes('smartwatch')) {
    return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('beauty') || cat.includes('fragrance') || cat.includes('skin') || cat.includes('care')) {
    return 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('furniture') || cat.includes('home') || cat.includes('decor') || cat.includes('light')) {
    return 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop';
  }
  if (cat.includes('bag') || cat.includes('jewel') || cat.includes('watch') || cat.includes('sunglass') || cat.includes('accessory')) {
    return 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop';
  }
  return 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=300&auto=format&fit=crop';
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(product.thumbnail);
  const [isAdding, setIsAdding] = useState(false);

  const wishlist = isInWishlist(product.id);
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage);
  const inCart = isInCart(product.id);
  const qty = getItemQuantity(product.id);
  const hasDiscount = product.discountPercentage >= 1;
  const discountRounded = Math.round(product.discountPercentage);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleImgError = () => {
    setImgSrc(getCategoryFallbackImage(product.category));
  };

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white', borderRadius: 12, overflow: 'hidden',
        border: '1px solid #F2F2F2', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', height: '100%',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '1', background: '#F8F8F8', overflow: 'hidden' }}>
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            onError={handleImgError}
            sizes="(max-width: 768px) 50vw, 20vw"
          />

          {/* Discount badge — top left, exact Uzum style: blue bg, white text */}
          {hasDiscount && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: '#0073FF', color: 'white',
              fontSize: 11, fontWeight: 700, padding: '3px 6px', borderRadius: 6,
              lineHeight: '14px',
            }}>—{discountRounded}%</div>
          )}

          {/* Wishlist button — top right */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
            style={{
              position: 'absolute', top: 6, right: 6,
              width: 28, height: 28, borderRadius: '50%',
              background: 'white', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlist ? '#FF1A8C' : 'none'} stroke={wishlist ? '#FF1A8C' : '#717480'} strokeWidth="1.8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Title */}
          <div style={{
            fontSize: 13, color: '#1C1C1C', lineHeight: 1.4, fontWeight: 400,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            flex: 1,
          }}>
            {product.title}
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#1C1C1C' }}>{product.rating.toFixed(1)}</span>
            <span style={{ fontSize: 11, color: '#717480' }}>(142)</span>
          </div>

          {/* Bottom row: Price, Installment & Cart Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              {/* Installment badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: '#FFF066', borderRadius: 4, padding: '2px 6px', width: 'fit-content',
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#1C1C1C', whiteSpace: 'nowrap' }}>
                  {Math.round(discountedPrice * 12700 / 12).toLocaleString('uz-UZ')} / oy
                </span>
              </div>
              
              {/* Prices */}
              <div style={{ marginTop: 2 }}>
                {hasDiscount && (
                  <div style={{ fontSize: 10, color: '#717480', textDecoration: 'line-through', marginBottom: -2 }}>
                    {formatPrice(product.price)}
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C', whiteSpace: 'nowrap' }}>
                  {formatPrice(discountedPrice)}
                </div>
              </div>
            </div>

            {/* Circular Cart Button */}
            <button
              onClick={handleAddToCart}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: `1.5px solid ${inCart ? '#7000FF' : '#7000FF'}`,
                background: inCart ? '#7000FF' : 'transparent',
                color: inCart ? 'white' : '#7000FF',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!inCart) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--uzum-purple-light)';
                }
              }}
              onMouseLeave={e => {
                if (!inCart) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {inCart ? (
                <span style={{ fontSize: 12, fontWeight: 800 }}>{qty}</span>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
