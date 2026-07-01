export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    { params: { id: '1' } }
  ]
};

import React, { Suspense } from 'react';
import { productsApi } from '@/lib/api';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import ScrollToTop from '@/components/ScrollToTop';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getCachedProduct(id: number) {
  'use cache';
  const product = await productsApi.getById(id);
  const relData = await productsApi.getByCategory(product.category, { limit: 5 });
  const related = relData.products.filter(p => p.id !== id).slice(0, 4);
  return { product, related };
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product, related } = await getCachedProduct(Number(id));

  return (
    <ProductDetailsClient product={product} related={related} />
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      <Suspense fallback={
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40 }}>
          <div className="skeleton" style={{ borderRadius: 20, height: 500 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="skeleton" style={{ borderRadius: 10, height: 32, width: '60%' }} />
            <div className="skeleton" style={{ borderRadius: 10, height: 24 }} />
            <div className="skeleton" style={{ borderRadius: 10, height: 24, width: '80%' }} />
            <div className="skeleton" style={{ borderRadius: 10, height: 60 }} />
            <div className="skeleton" style={{ borderRadius: 10, height: 50 }} />
          </div>
        </div>
      }>
        <ProductContent params={params} />
      </Suspense>
      <ScrollToTop />
    </div>
  );
}
