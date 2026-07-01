export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    { searchParams: { q: 'phone' } },
    { searchParams: { q: null } }
  ]
};

import React, { Suspense } from 'react';
import { productsApi } from '@/lib/api';
import SearchPageClient from '@/components/SearchPageClient';
import ScrollToTop from '@/components/ScrollToTop';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getCachedSearchResults(query: string) {
  'use cache';
  const data = await productsApi.search(query, { limit: 30 });
  return {
    products: data.products,
    total: data.total
  };
}

async function SearchPageContent({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sParams = await searchParams;
  const query = sParams.q || '';
  let products: any[] = [];
  let total = 0;
  
  if (query) {
    const res = await getCachedSearchResults(query);
    products = res.products;
    total = res.total;
  }
  
  return <SearchPageClient query={query} products={products} total={total} />;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      <Suspense fallback={
        <div>
          <div style={{ height: 32, width: 250, marginBottom: 8 }} className="skeleton" />
          <div style={{ height: 16, width: 120, marginBottom: 32 }} className="skeleton" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="skeleton" style={{ borderRadius: 16, height: 380 }} />
            ))}
          </div>
        </div>
      }>
        <SearchPageContent searchParams={searchParams} />
      </Suspense>
      <ScrollToTop />
    </div>
  );
}
