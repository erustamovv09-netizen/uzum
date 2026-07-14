import React, { Suspense } from 'react';
import { productsApi } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import BannerCarousel from '@/components/BannerCarousel';
import ScrollToTop from '@/components/ScrollToTop';
import { QuickLinks, SectionHeading } from '@/components/HomeClientHeadings';

function ProductSkeletonList({ count = 10 }: { count?: number }) {
  return (
    <div className="responsive-product-grid">
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
    <div className="responsive-product-grid">
      {products.slice(0, 15).map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

async function NewProducts() {
  const products = await getCachedProducts();
  return (
    <div className="responsive-product-grid">
      {products.slice(15, 30).map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

async function DiscountedProducts() {
  const products = await getCachedProducts();
  return (
    <div className="responsive-product-grid">
      {products.filter(p => p.discountPercentage > 10).slice(0, 10).map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

async function CategoriesShowcase() {
  const products = await getCachedProducts();
  const categories = Array.from(new Set(products.map(p => p.category))).slice(0, 6);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
      {categories.map(cat => (
        <div key={cat} style={{ background: '#f5f5f5', padding: 20, textAlign: 'center', borderRadius: 8, textTransform: 'capitalize' }}>
          {cat.replace('-', ' ')}
        </div>
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

        {/* Categories Showcase */}
        <div style={{ marginBottom: 32 }}>
          <SectionHeading titleKey="categories" defaultText="Kategoriyalar" />
          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesShowcase />
          </Suspense>
        </div>

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

        {/* Chegirmali Section */}
        <div style={{ marginBottom: 32 }}>
          <SectionHeading titleKey="discounted" defaultText="Chegirmadagi mahsulotlar" />
          <Suspense fallback={<ProductSkeletonList count={5} />}>
            <DiscountedProducts />
          </Suspense>
        </div>

      </div>

      <ScrollToTop />
    </div>
  );
}
