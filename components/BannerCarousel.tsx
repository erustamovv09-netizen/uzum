'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function BannerCarousel() {
  const { t } = useLanguage();
  const [banner, setBanner] = useState(0);

  const BANNERS = [
    { 
      id: 1, 
      bg: 'linear-gradient(135deg, #7000FF 0%, #8B5CF6 50%, #EC4899 100%)', 
      title: t('banner1Title'), 
      sub: t('banner1Sub'), 
      badge: t('banner1Badge'), 
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop", 
      href: '/products' 
    },
    { 
      id: 2, 
      bg: 'linear-gradient(135deg, #0A0F24 0%, #1A235A 50%, #303F9F 100%)', 
      title: t('banner2Title'), 
      sub: t('banner2Sub'), 
      badge: t('banner2Badge'), 
      image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg", 
      href: '/category/smartphones' 
    },
    { 
      id: 3, 
      bg: 'linear-gradient(135deg, #064E3B 0%, #059669 50%, #34D399 100%)', 
      title: t('banner3Title'), 
      sub: t('banner3Sub'), 
      badge: t('banner3Badge'), 
      image: "https://images.unsplash.com/photo-1610832958506-ee5633619144?q=80&w=600&auto=format&fit=crop", 
      href: '/category/groceries' 
    },
    { 
      id: 4, 
      bg: 'linear-gradient(135deg, #451A03 0%, #78350F 50%, #D97706 100%)', 
      title: t('banner4Title'), 
      sub: t('banner4Sub'), 
      badge: t('banner4Badge'), 
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop", 
      href: '/category/clothing' 
    },
  ];

  useEffect(() => {
    const tInterval = setInterval(() => setBanner(b => (b + 1) % BANNERS.length), 5000);
    return () => clearInterval(tInterval);
  }, [BANNERS.length]);

  return (
    <div className="banner-carousel-container" style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      {BANNERS.map((b, i) => {
        // Safe split for badge
        const badgeParts = b.badge ? b.badge.split(' ') : ['', ''];
        const badgeNum = badgeParts[0] || '';
        const badgeTxt = badgeParts[1] || '';

        return (
          <Link 
            key={b.id} 
            href={b.href} 
            style={{ 
              textDecoration: 'none',
              position: 'absolute',
              inset: 0,
              opacity: i === banner ? 1 : 0,
              transition: 'opacity 0.7s ease, visibility 0.7s ease',
              pointerEvents: i === banner ? 'auto' : 'none',
              zIndex: i === banner ? 2 : 1,
              visibility: i === banner ? 'visible' : 'hidden',
            }}
          >
            <div className="banner-slide" style={{
              width: '100%',
              height: '100%',
              background: b.bg,
              display: 'flex', alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Left text block */}
              <div className="banner-text-box" style={{
                background: 'rgba(0, 0, 0, 0.25)', 
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 5,
              }}>
                <div className="banner-text-title" style={{ fontWeight: 900, color: 'white', lineHeight: 1.1, textTransform: 'uppercase' }}>
                  {b.title}
                </div>
                <div className="banner-text-sub" style={{
                  background: 'var(--uzum-purple)', borderRadius: 8,
                  fontWeight: 800, color: 'white',
                  textAlign: 'center'
                }}>
                  {b.sub}
                </div>
              </div>

              {/* Floating Product Image */}
              {b.image && (
                <div className="banner-image-container" style={{
                  position: 'absolute',
                  bottom: 0,
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}>
                  <img 
                    src={b.image} 
                    alt={b.title} 
                    style={{ 
                      height: '100%', 
                      width: 'auto', 
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.35))' 
                    }} 
                  />
                </div>
              )}

              {/* Right: big badge */}
              <div className="banner-badge" style={{
                marginLeft: 'auto', marginRight: 40,
                background: 'rgba(255,220,0,0.15)', border: '4px solid rgba(255,220,0,0.6)',
                borderRadius: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 5,
              }}>
                <div className="banner-badge-num" style={{ fontWeight: 900, color: '#FFD700', textAlign: 'center', lineHeight: 1 }}>
                  {badgeNum}
                </div>
                <div className="banner-badge-txt" style={{ fontWeight: 700, color: '#FFD700' }}>{badgeTxt}</div>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Arrows */}
      {[{ side: 'left', delta: -1 }, { side: 'right', delta: 1 }].map(({ side, delta }) => (
        <button
          key={side}
          className="hide-on-mobile"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBanner(b => (b + BANNERS.length + delta) % BANNERS.length);
          }}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            [side]: 12, width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d={side === 'left' ? 'M7 1L1 7l6 6' : 'M1 1l6 6-6 6'} stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBanner(i);
            }}
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i === banner ? 'white' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
