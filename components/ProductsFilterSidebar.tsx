'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProductsFilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useLanguage();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [minRating, setMinRating] = useState(Number(searchParams.get('minRating')) || 0);

  useEffect(() => {
    setSearch(searchParams.get('q') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setMinRating(Number(searchParams.get('minRating')) || 0);
  }, [searchParams]);

  const applyFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters({ q: search });
    }
  };

  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleApplyPrice = () => {
    applyFilters({ minPrice, maxPrice });
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    applyFilters({ minRating: rating > 0 ? String(rating) : null });
  };

  const handleReset = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    router.replace(pathname);
  };

  return (
    <aside className="products-sidebar" style={{ flexShrink: 0 }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 20, border: '1px solid #F0F0F0', position: 'sticky', top: 90 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#1A1A1A' }}>🔧 {t('filters')}</h3>

        {/* Search */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 8 }}>{t('search')}</label>
          <input
            type="text"
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onBlur={() => applyFilters({ q: search })}
            placeholder={t('productNamePlaceholder')}
            style={{
              width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 10,
              padding: '10px 14px', fontSize: 14, outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        {/* Price range */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 8 }}>{t('priceRange')} ($)</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <input
              type="number"
              value={minPrice}
              onChange={e => handlePriceChange(e.target.value, maxPrice)}
              onBlur={handleApplyPrice}
              placeholder={t('from')}
              style={{
                flex: 1, minWidth: 0, border: '1.5px solid #E0E0E0', borderRadius: 10,
                padding: '8px 12px', fontSize: 14, outline: 'none',
              }}
            />
            <span style={{ color: '#808080', fontSize: 12 }}>—</span>
            <input
              type="number"
              value={maxPrice}
              onChange={e => handlePriceChange(minPrice, e.target.value)}
              onBlur={handleApplyPrice}
              placeholder={t('to')}
              style={{
                flex: 1, minWidth: 0, border: '1.5px solid #E0E0E0', borderRadius: 10,
                padding: '8px 12px', fontSize: 14, outline: 'none',
              }}
            />
          </div>
          <button
            onClick={handleApplyPrice}
            style={{
              width: '100%', background: '#7000FF', color: 'white', border: 'none',
              borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >{t('applyPrice')}</button>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 8 }}>{t('minRating')}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[0, 3, 3.5, 4, 4.5].map(r => (
              <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input
                  type="radio"
                  checked={minRating === r}
                  onChange={() => handleRatingChange(r)}
                  style={{ accentColor: '#7000FF' }}
                />
                {r === 0 ? t('all') : (
                  <span>
                    {'★'.repeat(Math.floor(r))}{'☆'.repeat(5 - Math.floor(r))} {r}+
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          style={{
            width: '100%', background: '#F0F0F0', border: 'none', borderRadius: 10,
            padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#404040',
          }}
        >{t('clearFilters')}</button>
      </div>
    </aside>
  );
}
