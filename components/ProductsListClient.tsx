'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Product, formatPrice } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import ProductsFilterSidebar from '@/components/ProductsFilterSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import { useLanguage } from '@/lib/LanguageContext';

interface ProductsListClientProps {
  initialProducts: Product[];
}

export default function ProductsListClient({ initialProducts }: ProductsListClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  // URL State
  const q = searchParams.get('q') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const minRating = Number(searchParams.get('minRating')) || 0;
  const sortBy = searchParams.get('sortBy') || 'default';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = 20;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let filtered = [...initialProducts];

    if (q) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.brand?.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
    if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }

    setProducts(filtered);
  }, [initialProducts, q, minPrice, maxPrice, minRating, sortBy]);

  const total = products.length;
  const totalPages = Math.ceil(total / perPage);
  const paginatedProducts = products.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === 'default') {
      params.delete('sortBy');
    } else {
      params.set('sortBy', val);
    }
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const sortOptions = [
    { value: 'default', label: t('sortDefault') },
    { value: 'price-asc', label: t('sortPriceAsc') },
    { value: 'price-desc', label: t('sortPriceDesc') },
    { value: 'rating', label: t('sortRating') },
    { value: 'discount', label: t('sortDiscount') },
  ];

  return (
    <div className="split-layout" style={{ width: '100%' }}>
      <ProductsFilterSidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A' }}>{t('allProducts')}</h1>
            <p style={{ fontSize: 14, color: '#808080', marginTop: 4 }}>
              {t('totalCount').replace('{count}', total.toLocaleString())}
            </p>
          </div>

          <select
            value={sortBy}
            onChange={e => handleSortChange(e.target.value)}
            style={{
              border: '1.5px solid #E0E0E0', borderRadius: 10, padding: '10px 16px',
              fontSize: 14, outline: 'none', background: 'white', cursor: 'pointer',
            }}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {paginatedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#808080' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 20, fontWeight: 600 }}>{t('noProductsFound')}</h3>
            <p>{t('noProductsFoundDesc')}</p>
          </div>
        ) : (
          <div className="responsive-product-grid">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={{
                padding: '10px 16px', borderRadius: 10, border: '1.5px solid #E0E0E0',
                background: 'white', cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.5 : 1, fontSize: 14, fontWeight: 600, color: '#1A1A1A'
              }}
            >{t('prev')}</button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i));
              if (p < 1 || p > totalPages) return null;
              const isCurrent = p === page;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    border: `1.5px solid ${isCurrent ? '#7000FF' : '#E0E0E0'}`,
                    background: isCurrent ? '#7000FF' : 'white',
                    color: isCurrent ? 'white' : '#1A1A1A',
                    cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  }}
                >{p}</button>
              );
            })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={{
                padding: '10px 16px', borderRadius: 10, border: '1.5px solid #E0E0E0',
                background: 'white', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.5 : 1, fontSize: 14, fontWeight: 600, color: '#1A1A1A'
              }}
            >{t('next')}</button>
          </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}
