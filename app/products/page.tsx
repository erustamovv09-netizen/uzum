export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    {
      searchParams: {
        q: 'phone',
        minPrice: '10',
        maxPrice: '1000',
        minRating: '4',
        sortBy: 'price-asc',
        page: '1'
      }
    },
    {
      searchParams: {
        q: null,
        minPrice: null,
        maxPrice: null,
        minRating: null,
        sortBy: null,
        page: null
      }
    }
  ]
};

import React, { Suspense } from 'react';
import { productsApi } from '@/lib/api';
import ProductsListClient from '@/components/ProductsListClient';

async function getCachedAllProducts() {
  'use cache';
  const data = await productsApi.getAll({ limit: 100 });
  return data.products;
}

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
    sortBy?: string;
    page?: string;
  }>;
}

async function ProductsPageContent({ searchParams }: { searchParams: Promise<any> }) {
  // Await searchParams for dynamic shell simulation resolution
  await searchParams;
  const allProducts = await getCachedAllProducts();
  return <ProductsListClient initialProducts={allProducts} />;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      <Suspense fallback={
        <div style={{ display: 'flex', gap: 24, width: '100%' }}>
          <aside style={{ width: 260, flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: 16, padding: 20, border: '1px solid #F0F0F0' }}>
              <div style={{ height: 24, width: 100, marginBottom: 20 }} className="skeleton" />
              <div style={{ height: 40, marginBottom: 16 }} className="skeleton" />
              <div style={{ height: 40, marginBottom: 16 }} className="skeleton" />
            </div>
          </aside>
          <div style={{ flex: 1 }}>
            <div style={{ height: 40, width: 200, marginBottom: 20 }} className="skeleton" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="skeleton" style={{ borderRadius: 16, height: 360 }} />
              ))}
            </div>
          </div>
        </div>
      }>
        <ProductsPageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
