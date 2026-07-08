'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, getCategoryLabel, getCategoryIcon } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import ScrollToTop from '@/components/ScrollToTop';
import { useLanguage } from '@/lib/LanguageContext';

interface CategoryPageClientProps {
  slug: string;
  initialProducts: Product[];
  initialTotal: number;
}

export default function CategoryPageClient({ slug, initialProducts, initialTotal }: CategoryPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();

  const page = Number(searchParams.get('page')) || 1;
  const perPage = 20;
  const totalPages = Math.ceil(initialTotal / perPage);

  const categoryName = getCategoryLabel(slug, language as any);
  const categoryIcon = getCategoryIcon(slug);

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    router.replace(`/category/${slug}?${params.toString()}`);
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      {/* Category Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7000FF, #A855F7)',
        borderRadius: 20, padding: '32px', marginBottom: 32, color: 'white',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{categoryIcon}</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>{categoryName}</h1>
        <p style={{ opacity: 0.85, fontSize: 16 }}>
          {initialTotal > 0 
            ? `${initialTotal} ${t('pieces')} ${language === 'uz' ? 'mahsulot topildi' : 'товаров найдено'}` 
            : (language === 'uz' ? 'Mahsulotlar mavjud emas' : 'Товары не найдены')}
        </p>
      </div>

      {/* Grid */}
      {initialProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#808080' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>📭</div>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>
            {language === 'uz' ? 'Bu kategoriyada mahsulot yo\'q' : 'В этой категории нет товаров'}
          </h3>
        </div>
      ) : (
        <>
          <div className="responsive-product-grid">
            {initialProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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

              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10).map(p => {
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
        </>
      )}

      <ScrollToTop />
    </div>
  );
}
