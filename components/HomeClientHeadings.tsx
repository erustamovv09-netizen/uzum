'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export function QuickLinks() {
  const { t, language } = useLanguage();
  const isUz = language === 'uz';

  const QUICK_LINKS = [
    { label: isUz ? 'Elektronika' : 'Электроника', icon: '📱', href: '/category/smartphones', color: '#EDE8FF' },
    { label: isUz ? 'Uy jihozlari' : 'Бытовая техника', icon: '🏠', href: '/category/furniture', color: '#FFF4E0' },
    { label: isUz ? 'Sport' : 'Спорт', icon: '⚽', href: '/category/sports-accessories', color: '#E8FFF0' },
    { label: isUz ? 'Oziq-ovqat' : 'Продукты', icon: '🛒', href: '/category/groceries', color: '#FFE8EC' },
    { label: isUz ? 'Avtomobil' : 'Авто', icon: '🚗', href: '/category/vehicle', color: '#E8F4FF' },
    { label: isUz ? 'Chegirmalar' : 'Скидки', icon: '🔥', href: '/products', color: '#FFF0E8' },
    { label: isUz ? 'Noutbuk' : 'Ноутбук', icon: '💻', href: '/category/laptops', color: '#F0E8FF' },
    { label: isUz ? 'Kiyimlar' : 'Одежда', icon: '👔', href: '/category/mens-shirts', color: '#E8F0FF' },
    { label: isUz ? "Oshxona" : 'Кухня', icon: '🍳', href: '/category/kitchen-accessories', color: '#FFF8E0' },
    { label: isUz ? 'Aksessuarlar' : 'Аксессуары', icon: '💍', href: '/category/sunglasses', color: '#FFEDF5' },
  ];

  return (
    <div className="quick-links-container" style={{ marginBottom: 24 }}>
      {QUICK_LINKS.map((link, idx) => (
        <Link key={idx} href={link.href} style={{ textDecoration: 'none', display: 'flex' }}>
          <div
            className="quick-links-card"
            style={{
              background: link.color,
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
              height: '100%',
              width: '100%',
              minWidth: 90,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: 28 }}>{link.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1C', lineHeight: 1.2, textAlign: 'center' }}>
              {link.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function SectionHeading({ titleKey, defaultText, href = '/products' }: { titleKey: string; defaultText: string; href?: string }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = React.useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1C1C1C', margin: 0 }}>
        {t(titleKey) || defaultText}
      </h2>
      <Link
        href={href}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: hovered ? '#5500CC' : '#7000FF', transition: 'color 0.15s' }}>
          {t('allProducts') || 'Barchasi'}
        </span>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          style={{ transform: hovered ? 'translateX(3px)' : 'none', transition: 'transform 0.15s' }}
        >
          <path d="M1 1l6 6-6 6" stroke={hovered ? '#5500CC' : '#7000FF'} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Link>
    </div>
  );
}
