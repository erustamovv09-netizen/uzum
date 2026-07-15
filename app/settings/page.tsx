'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  const [notifications, setNotifications] = useState({
    orders: true,
    promos: true,
    news: false,
    sms: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>{t('loadingText')}</div>;
  }

  if (!user) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const NAV_ITEMS = [
    { href: '/profile', icon: '👤', label: t('personalInfo') },
    { href: '/orders', icon: '📦', label: t('myOrders') },
    { href: '/wishlist', icon: '❤️', label: t('wishlist') },
    { href: '/settings', icon: '⚙️', label: t('settings'), active: true },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>⚙️ {t('settings')}</h1>

      <div className="profile-grid">
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
            {NAV_ITEMS.map(item => (
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

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Language Settings */}
          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #F0F0F0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, marginTop: 0 }}>
              🌐 {language === 'uz' ? "Til sozlamalari" : "Настройки языка"}
            </h2>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
                { code: 'ru', label: 'Русский', flag: '🇷🇺' },
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'uz' | 'ru')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 20px', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                    border: language === lang.code ? '2px solid #7000FF' : '2px solid #E0E0E0',
                    background: language === lang.code ? '#EDE8FF' : 'white',
                    color: language === lang.code ? '#7000FF' : '#404040',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{lang.flag}</span>
                  {lang.label}
                  {language === lang.code && <span style={{ marginLeft: 4 }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #F0F0F0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, marginTop: 0 }}>
              🔔 {language === 'uz' ? "Bildirishnomalar" : "Уведомления"}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                {
                  key: 'orders',
                  label: language === 'uz' ? "Buyurtmalar haqida" : "О заказах",
                  desc: language === 'uz' ? "Buyurtma holati o'zgarganda xabar oling" : "Получать уведомления при изменении статуса заказа",
                },
                {
                  key: 'promos',
                  label: language === 'uz' ? "Aktsiyalar va chegirmalar" : "Акции и скидки",
                  desc: language === 'uz' ? "Maxsus takliflar va chegirmalar haqida xabar" : "Специальные предложения и скидки",
                },
                {
                  key: 'news',
                  label: language === 'uz' ? "Yangiliklar" : "Новости",
                  desc: language === 'uz' ? "Uzum Market yangiliklari" : "Новости Uzum Market",
                },
                {
                  key: 'sms',
                  label: language === 'uz' ? "SMS bildirishnomalar" : "SMS-уведомления",
                  desc: language === 'uz' ? "Telefon raqamingizga SMS xabarlar" : "SMS-сообщения на ваш номер телефона",
                },
              ].map((item, idx, arr) => (
                <div key={item.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: idx < arr.length - 1 ? '1px solid #F0F0F0' : 'none',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#808080', marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    style={{
                      width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                      background: notifications[item.key as keyof typeof notifications] ? '#7000FF' : '#D0D0D0',
                      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 3, left: notifications[item.key as keyof typeof notifications] ? 25 : 3,
                      width: 20, height: 20, borderRadius: '50%', background: 'white',
                      transition: 'left 0.2s', display: 'block',
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #F0F0F0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, marginTop: 0 }}>
              🔒 {language === 'uz' ? "Xavfsizlik" : "Безопасность"}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  icon: '🔑',
                  label: t('changePassword'),
                },
                {
                  icon: '📱',
                  label: language === 'uz' ? "Telefon raqamni o'zgartirish" : "Изменить номер телефона",
                },
                {
                  icon: '📧',
                  label: language === 'uz' ? "Email manzilini o'zgartirish" : "Изменить email",
                },
              ].map((item, idx) => (
                <button key={idx} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px', borderRadius: 12, border: '1.5px solid #E0E0E0',
                  background: 'white', cursor: 'pointer', fontSize: 14, color: '#1A1A1A',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#7000FF'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#E0E0E0'}
                >
                  <span>{item.icon} {item.label}</span>
                  <span style={{ color: '#808080' }}>→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1.5px solid #FFE0E0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, marginTop: 0, color: '#CC0000' }}>
              ⚠️ {language === 'uz' ? "Xavfli zona" : "Опасная зона"}
            </h2>
            <div style={{ padding: '14px 18px', borderRadius: 12, border: '1.5px solid #FFE0E0', background: '#FFF8F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>
                  {language === 'uz' ? "Hisobdan chiqish" : "Выход из аккаунта"}
                </div>
                <div style={{ fontSize: 12, color: '#808080', marginTop: 2 }}>
                  {language === 'uz' ? "Barcha qurilmalardan chiqish" : "Выйти на всех устройствах"}
                </div>
              </div>
              <button
                onClick={logout}
                style={{
                  background: '#FF4D00', color: 'white', border: 'none', borderRadius: 10,
                  padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {t('logout')}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleSave}
              style={{
                background: saved ? '#00C853' : '#7000FF', color: 'white', border: 'none',
                borderRadius: 12, padding: '12px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >
              {saved
                ? (language === 'uz' ? '✅ Saqlandi!' : '✅ Сохранено!')
                : (language === 'uz' ? 'Saqlash' : 'Сохранить')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
