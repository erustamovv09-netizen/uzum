import React, { Suspense } from 'react';
import { productsApi } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import BannerCarousel from '@/components/BannerCarousel';
import ScrollToTop from '@/components/ScrollToTop';
import { QuickLinks, SectionHeading } from '@/components/HomeClientHeadings';

function ProductSkeletonList({ count = 10 }: { count?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} style={{ background: 'white', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--uzum-gray-200)' }}>
          <div className="skeleton" style={{ width: '100%', height: 200, borderRadius: 0 }} />
          <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="skeleton" style={{ height: 14 }} />
            <div className="skeleton" style={{ height: 12, width: '60%' }} />
            <div className="skeleton" style={{ height: 12, width: '80%' }} />
            <div className="skeleton" style={{ height: 36, borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

async function getCachedProducts() {
  'use cache';
  const data = await productsApi.getAll({ limit: 80 });
  const excludedCategories = [
    'beauty',
    'fragrances',
    'womens-dresses',
    'womens-shoes',
    'womens-bags',
    'womens-jewellery',
    'skincare'
  ];
  return data.products.filter(p => !excludedCategories.includes(p.category));
}

async function PopularProducts() {
  const products = await getCachedProducts();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
      {products.slice(0, 10).map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

async function NewProducts() {
  const products = await getCachedProducts();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
      {products.slice(10, 20).map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '12px 16px' }}>
        
        {/* Banner */}
        <BannerCarousel />

        {/* Quick Links */}
        <QuickLinks />

        {/* Mashhur Section */}
        <div style={{ marginBottom: 32 }}>
          <SectionHeading titleKey="popular" defaultText="Mashhur" />
          <Suspense fallback={<ProductSkeletonList count={5} />}>
            <PopularProducts />
          </Suspense>
        </div>

        {/* Yangi Mahsulotlar Section */}
        <div style={{ marginBottom: 32 }}>
          <SectionHeading titleKey="newProducts" defaultText="Yangi mahsulotlar" />
          <Suspense fallback={<ProductSkeletonList count={5} />}>
            <NewProducts />
          </Suspense>
        </div>

      </div>

      <ScrollToTop />
    </div>
  );
}
