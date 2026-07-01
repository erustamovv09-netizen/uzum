export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    { params: { slug: 'smartphones' }, searchParams: { page: '1' } },
    { params: { slug: 'smartphones' }, searchParams: { page: null } }
  ]
};

import React, { Suspense } from 'react';
import { productsApi } from '@/lib/api';
import CategoryPageClient from '@/components/CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getCachedCategoryProducts(slug: string, page: number) {
  'use cache';
  const perPage = 20;
  const skip = (page - 1) * perPage;
  const data = await productsApi.getByCategory(slug, { limit: perPage, skip });
  return {
    products: data.products,
    total: data.total,
  };
}

async function CategoryPageContent({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page?: string }> }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;

  const { products, total } = await getCachedCategoryProducts(slug, page);
  return <CategoryPageClient slug={slug} initialProducts={products} initialTotal={total} />;
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  return (
    <Suspense fallback={
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ height: 160, borderRadius: 20, marginBottom: 32 }} className="skeleton" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="skeleton" style={{ borderRadius: 16, height: 380 }} />
          ))}
        </div>
      </div>
    }>
      <CategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
