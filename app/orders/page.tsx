'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const sampleOrders = [
  { id: 'UZM-847291', date: '2024-03-15', status: 'delivered', total: 1250000, items: 3 },
  { id: 'UZM-734859', date: '2024-03-10', status: 'shipped', total: 890000, items: 1 },
  { id: 'UZM-628374', date: '2024-03-05', status: 'processing', total: 2100000, items: 5 },
  { id: 'UZM-519283', date: '2024-02-28', status: 'cancelled', total: 560000, items: 2 },
];

type StatusKey = 'delivered' | 'shipped' | 'processing' | 'cancelled';

export default function OrdersPage() {
  const { t, language } = useLanguage();
  const isUz = language === 'uz';
  const [activeFilter, setActiveFilter] = useState<'all' | StatusKey>('all');

  const statusConfig: Record<StatusKey, { label: string; color: string; bg: string; icon: string }> = {
    delivered:  { label: t('statusDelivered'),  color: '#00C853', bg: '#E8FFF0', icon: '✅' },
    shipped:    { label: t('statusShipped'),    color: '#FF8C00', bg: '#FFF5E0', icon: '🚚' },
    processing: { label: t('statusProcessing'), color: '#7000FF', bg: '#EDE8FF', icon: '⏳' },
    cancelled:  { label: t('statusCancelled'),  color: '#FF4D00', bg: '#FFF0EB', icon: '❌' },
  };

  const filterTabs: { key: 'all' | StatusKey; label: string }[] = [
    { key: 'all',        label: isUz ? 'Barchasi' : 'Все' },
    { key: 'processing', label: statusConfig.processing.label },
    { key: 'shipped',    label: statusConfig.shipped.label },
    { key: 'delivered',  label: statusConfig.delivered.label },
    { key: 'cancelled',  label: statusConfig.cancelled.label },
  ];

  const filtered = activeFilter === 'all'
    ? sampleOrders
    : sampleOrders.filter(o => o.status === activeFilter);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>📦 {t('myOrders')}</h1>
      <p style={{ color: '#808080', marginBottom: 24 }}>{t('ordersDesc')}</p>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {filterTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            style={{
              padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              background: activeFilter === tab.key ? '#7000FF' : '#F0F0F0',
              color: activeFilter === tab.key ? 'white' : '#404040',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#808080' }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>📭</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{t('noOrders')}</h2>
          <p style={{ marginBottom: 24 }}>{t('noOrdersDesc')}</p>
          <Link href="/products">
            <button style={{
              background: '#7000FF', color: 'white', border: 'none', borderRadius: 14,
              padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>{t('shopNow')} →</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(order => {
            const status = statusConfig[order.status as StatusKey];
            return (
              <div
                key={order.id}
                style={{
                  background: 'white', borderRadius: 20, padding: '20px 24px',
                  border: '1px solid #F0F0F0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  flexWrap: 'wrap', gap: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A' }}>#{order.id}</span>
                    <span style={{
                      background: status.bg, color: status.color,
                      padding: '4px 10px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                    }}>{status.icon} {status.label}</span>
                  </div>
                  <div style={{ color: '#808080', fontSize: 14 }}>
                    📅 {order.date} &nbsp;•&nbsp; 📦 {order.items} {t('pieces')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#7000FF', marginBottom: 8 }}>
                    {order.total.toLocaleString()} {isUz ? "so'm" : 'сум'}
                  </div>
                  <button style={{
                    background: '#EDE8FF', color: '#7000FF', border: 'none', borderRadius: 10,
                    padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}>{t('details')} →</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
