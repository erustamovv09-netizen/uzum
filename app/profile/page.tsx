'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>{t('loadingText')}</div>;
  }

  if (!user) return null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>👤 {t('profile')}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
        {/* Sidebar */}
        <div>
          <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #F0F0F0', textAlign: 'center', marginBottom: 16 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #7000FF, #A855F7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, color: 'white', fontWeight: 800, margin: '0 auto 12px',
            }}>
              {user.firstName[0]}
            </div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{user.firstName} {user.lastName}</div>
            <div style={{ color: '#808080', fontSize: 14, marginTop: 4 }}>{user.email}</div>
          </div>

          <div style={{ background: 'white', borderRadius: 20, padding: 8, border: '1px solid #F0F0F0' }}>
            {[
              { href: '/profile', icon: '👤', label: t('personalInfo'), active: true },
              { href: '/orders', icon: '📦', label: t('myOrders') },
              { href: '/wishlist', icon: '❤️', label: t('wishlist') },
              { href: '/settings', icon: '⚙️', label: t('settings') },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                  background: item.active ? '#EDE8FF' : 'transparent',
                  color: item.active ? '#7000FF' : '#404040',
                  fontWeight: item.active ? 600 : 400, fontSize: 14,
                  marginBottom: 4,
                }}>
                  <span>{item.icon}</span> {item.label}
                </div>
              </Link>
            ))}
            <button
              onClick={logout}
              style={{
                width: '100%', background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                color: '#FF4D00', fontSize: 14, textAlign: 'left',
              }}
            >🚪 {t('logout')}</button>
          </div>
        </div>

        {/* Main */}
        <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #F0F0F0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>{t('personalInfo')}</h2>

          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { label: t('firstName'), value: user.firstName },
              { label: t('lastName'), value: user.lastName },
              { label: t('emailLabel'), value: user.email },
              { label: 'Login', value: user.username },
            ].map((field, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: 16, paddingBottom: 20, borderBottom: '1px solid #F0F0F0' }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#808080' }}>{field.label}</label>
                <div style={{ fontSize: 15, color: '#1A1A1A' }}>{field.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <button style={{
              background: '#7000FF', color: 'white', border: 'none', borderRadius: 12,
              padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>{t('edit')}</button>
            <button style={{
              background: '#EDE8FF', color: '#7000FF', border: 'none', borderRadius: 12,
              padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>{t('changePassword')}</button>
          </div>

          {/* Stats */}
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: '📦', value: '12', label: t('order') },
              { icon: '❤️', value: '8', label: t('favorite') },
              { icon: '⭐', value: '24', label: t('review') },
            ].map((stat, i) => (
              <div key={i} style={{
                background: '#F8F8F8', borderRadius: 14, padding: '16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#7000FF' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#808080' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
