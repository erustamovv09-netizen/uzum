'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #F0F0F0', marginTop: 0 }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 16px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>

          {/* Biz haqimizda */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1C', marginBottom: 16, marginTop: 0 }}>{t('footerAbout')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: t('footerDeliveryPoints'), href: '#' },
                { label: t('footerCareers'), href: '#' }
              ].map(item => (
                <Link key={item.label} href={item.href} style={{ color: '#717480', fontSize: 14, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7000FF'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#717480'}
                >{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Foydalanuvchilarga */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1C', marginBottom: 16, marginTop: 0 }}>{t('footerForUsers')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: t('footerContact'), href: '#' },
                { label: t('faq'), href: '/help' }
              ].map(item => (
                <Link key={item.label} href={item.href} style={{ color: '#717480', fontSize: 14, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7000FF'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#717480'}
                >{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Tadbirkorlarga */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1C', marginBottom: 16, marginTop: 0 }}>{t('footerForSellers')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: t('footerSellOnUzum'), href: '/seller' },
                { label: t('footerSellerCabinet'), href: '#' },
                { label: t('openPoint'), href: '/pickup' }
              ].map(item => (
                <Link key={item.label} href={item.href} style={{ color: '#717480', fontSize: 14, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#7000FF'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#717480'}
                >{item.label}</Link>
              ))}
            </div>
          </div>

          {/* App + Social */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1C', marginBottom: 16, marginTop: 0 }}>{t('footerDownloadApp')}</h4>
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              {/* App Store */}
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#1C1C1C', color: 'white', border: 'none', borderRadius: 10,
                padding: '8px 14px', cursor: 'pointer', flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>Download on the</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>App Store</div>
                </div>
              </button>

              {/* Google Play */}
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#1C1C1C', color: 'white', border: 'none', borderRadius: 10,
                padding: '8px 14px', cursor: 'pointer', flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3 20.5v-17c0-.83 1-.97 1.46-.39l14 8.5c.45.27.45.91 0 1.18l-14 8.5C3 21.97 3 21.33 3 20.5z"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>Get it on</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Google Play</div>
                </div>
              </button>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1C', marginBottom: 12, marginTop: 0 }}>{t('footerSocials')}</h4>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { color: '#E1306C', label: 'Instagram', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                { color: '#0088CC', label: 'Telegram', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.038 9.605c-.15.658-.542.818-1.099.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.916.616z"/></svg> },
                { color: '#1877F2', label: 'Facebook', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { color: '#FF0000', label: 'YouTube', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg> },
              ].map(s => (
                <button key={s.label} title={s.label} style={{
                  width: 40, height: 40, background: s.color, border: 'none', borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
                >{s.svg}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #F0F0F0', padding: '14px 16px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: t('footerPrivacy'), href: '#' },
              { label: t('footerTerms'), href: '#' },
              { label: t('footerProcessing'), href: '#' }
            ].map(item => (
              <Link key={item.label} href={item.href} style={{ color: '#717480', fontSize: 12, textDecoration: 'none' }}>{item.label}</Link>
            ))}
          </div>
          <span style={{ color: '#717480', fontSize: 12 }}>{t('footerCopyright')}</span>
        </div>
      </div>
    </footer>
  );
}
