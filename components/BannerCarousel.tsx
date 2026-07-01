'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function BannerCarousel() {
  const { t } = useLanguage();
  const [banner, setBanner] = useState(0);

  const BANNERS = [
    { id: 1, bg: 'linear-gradient(135deg, #1A0050 0%, #4400AA 40%, #0080FF 100%)', title: t('banner1Title'), sub: t('banner1Sub'), badge: t('banner1Badge'), href: '/products' },
    { id: 2, bg: 'linear-gradient(135deg, #002244 0%, #0044AA 50%, #00AAFF 100%)', title: t('banner2Title'), sub: t('banner2Sub'), badge: t('banner2Badge'), href: '/category/smartphones' },
    { id: 3, bg: 'linear-gradient(135deg, #002200 0%, #006600 50%, #00CC44 100%)', title: t('banner3Title'), sub: t('banner3Sub'), badge: t('banner3Badge'), href: '/category/groceries' },
    { id: 4, bg: 'linear-gradient(135deg, #1C1917 0%, #44403C 50%, #78716C 100%)', title: t('banner4Title'), sub: t('banner4Sub'), badge: t('banner4Badge'), href: '/category/mens-shirts' },
  ];

  useEffect(() => {
    const tInterval = setInterval(() => setBanner(b => (b + 1) % BANNERS.length), 5000);
    return () => clearInterval(tInterval);
  }, [BANNERS.length]);

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 360, marginBottom: 12 }}>
      {BANNERS.map((b, i) => {
        // Safe split for badge
        const badgeParts = b.badge ? b.badge.split(' ') : ['', ''];
        const badgeNum = badgeParts[0] || '';
        const badgeTxt = badgeParts[1] || '';

        return (
          <Link key={b.id} href={b.href} style={{ textDecoration: 'none' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: b.bg,
              opacity: i === banner ? 1 : 0,
              transition: 'opacity 0.7s ease',
              display: 'flex', alignItems: 'center',
              padding: '0 60px',
              cursor: 'pointer',
            }}>
              {/* Left text block */}
              <div style={{
                background: 'rgba(80,0,160,0.85)', borderRadius: 16,
                padding: '28px 32px', maxWidth: 280,
              }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: 'white', lineHeight: 1.1, textTransform: 'uppercase' }}>
                  {b.title}
                </div>
                <div style={{
                  marginTop: 10, background: 'var(--uzum-purple)', borderRadius: 8,
                  padding: '8px 16px', fontSize: 20, fontWeight: 800, color: 'white',
                }}>
                  {b.sub}
                </div>
              </div>

              {/* Right: big badge */}
              <div style={{
                marginLeft: 'auto', marginRight: 40,
                background: 'rgba(255,220,0,0.15)', border: '4px solid rgba(255,220,0,0.6)',
                borderRadius: '50%', width: 200, height: 200,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#FFD700', textAlign: 'center', lineHeight: 1 }}>
                  {badgeNum}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#FFD700' }}>{badgeTxt}</div>
              </div>
            </div>
          </Link>
        );
      })}

      {/* Arrows */}
      {[{ side: 'left', delta: -1 }, { side: 'right', delta: 1 }].map(({ side, delta }) => (
        <button
          key={side}
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
