'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export function QuickLinks() {
  const { t } = useLanguage();

  const QUICK_LINKS = [
    { label: t('catMensClothing') || 'Erkaklar kiyimi', icon: '👔', href: '/category/mens-shirts' },
    { label: t('catKids') || 'Onalar va bolalar uchun', icon: '🧸', href: '/category/tops' },
    { label: t('navSports') || 'Futbol', icon: '⚽', href: '/category/sports-accessories' },
    { label: t('navGroceries') || 'Zamonaviy bozor', icon: '🛒', href: '/category/groceries' },
    { label: t('navGuaranteedPrices') || 'Yozgi chegirmalar', icon: '☀️', href: '/products' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
      {QUICK_LINKS.map((link, idx) => (
        <Link key={idx} href={link.href} style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#F4F5F7', borderRadius: 12, padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            border: 'none', cursor: 'pointer',
            transition: 'background 0.15s',
            height: '100%',
          }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{link.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1C1C1C', lineHeight: 1.3 }}>{link.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function SectionHeading({ titleKey, defaultText }: { titleKey: string; defaultText: string }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <Link 
      href="/products" 
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, textDecoration: 'none', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ fontSize: 22, fontWeight: 700, color: hovered ? 'var(--uzum-purple)' : '#1C1C1C', margin: 0, transition: 'color 0.15s' }}>
        {t(titleKey) || defaultText}
      </h2>
      <svg 
        width="8" 
        height="14" 
        viewBox="0 0 8 14" 
        fill="none" 
        style={{ transform: hovered ? 'translateX(4px)' : 'none', transition: 'transform 0.15s' }}
      >
        <path d="M1 1l6 6-6 6" stroke={hovered ? 'var(--uzum-purple)' : '#1C1C1C'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </Link>
  );
}
