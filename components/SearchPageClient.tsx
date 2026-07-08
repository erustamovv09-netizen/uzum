'use client';

import React from 'react';
import { Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/lib/LanguageContext';

interface SearchPageClientProps {
  query: string;
  products: Product[];
  total: number;
}

export default function SearchPageClient({ query, products, total }: SearchPageClientProps) {
  const { t } = useLanguage();

  if (!query) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#808080' }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🔍</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{t('noResultsFound')}</h2>
        <p style={{ fontSize: 16 }}>{t('enterSearchQuery')}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#808080' }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🔍</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{t('noResultsFound')}</h2>
        <p style={{ fontSize: 16 }}>
          {t('noResultsForQuery').replace('{query}', query)}
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
        🔍 {t('searchTitle')} "{query}"
      </h1>
      <p style={{ color: '#808080', marginBottom: 32 }}>
        {t('resultsFound').replace('{total}', total.toLocaleString())}
      </p>

      <div className="responsive-product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
