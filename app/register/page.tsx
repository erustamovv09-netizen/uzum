'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError(t('passwordsDoNotMatch'));
      return;
    }
    if (!agreed) {
      setError(t('acceptTerms'));
      return;
    }
    setLoading(true);
    setError('');
    // In production, call register API here
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/login');
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', background: 'linear-gradient(135deg, #F8F0FF 0%, #FFF5FB 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <img
              src="https://yt3.googleusercontent.com/VrLVt-BzggpF0KX98EZRKHe0VDlJgJQUSW7IlPLfqMJR_xiMxNAZsmQFZezzUg6lG7tINr_vGtw=s900-c-k-c0x00ffffff-no-rj"
              alt="Uzum logo"
              style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'contain' }}
            />
            <span style={{ fontSize: 32, fontWeight: 800, color: '#7000FF', letterSpacing: '-0.8px' }}>
              uzum<span style={{ fontWeight: 500 }}>market</span>
            </span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginTop: 12 }}>{t('registerTitle')}</h1>
          <p style={{ color: '#808080', fontSize: 14, marginTop: 4 }}>{t('registerDesc')}</p>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 8px 40px rgba(112, 0, 255, 0.08)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { key: 'firstName', label: t('firstName'), placeholder: t('firstName') },
                { key: 'lastName', label: t('lastName'), placeholder: t('lastName') },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    required
                    style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none' }}
                  />
                </div>
              ))}
            </div>

            {[
              { key: 'phone', label: t('phone'), placeholder: t('phonePlaceholder'), type: 'tel' },
              { key: 'email', label: t('emailLabel'), placeholder: t('emailPlaceholder'), type: 'email' },
              { key: 'password', label: t('passwordLabel'), placeholder: t('min8Chars'), type: 'password' },
              { key: 'confirm', label: t('passwordConfirmLabel'), placeholder: t('passwordConfirmPlaceholder'), type: 'password' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  required
                  style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none' }}
                />
              </div>
            ))}

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20, cursor: 'pointer', fontSize: 13, color: '#404040', lineHeight: 1.5 }}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: '#7000FF', width: 16, height: 16, marginTop: 1 }} />
              <span>
                {t('agreeText')}{' '}
                <Link href="/terms" style={{ color: '#7000FF', textDecoration: 'none', fontWeight: 600 }}>{t('termsText')}</Link> {t('andText')}{' '}
                <Link href="/privacy" style={{ color: '#7000FF', textDecoration: 'none', fontWeight: 600 }}>{t('privacyText')}</Link>
              </span>
            </label>

            {error && (
              <div style={{ background: '#FFF0F0', border: '1px solid #FFD0D0', borderRadius: 10, padding: '10px 14px', marginBottom: 16, color: '#FF4D00', fontSize: 13 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', background: '#7000FF', color: 'white', border: 'none', borderRadius: 14,
                padding: '14px', fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >{loading ? `⏳ ${t('loadingText')}` : t('registerNow')}</button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#808080' }}>
            {t('alreadyHasAccount')}{' '}
            <Link href="/login" style={{ color: '#7000FF', fontWeight: 700, textDecoration: 'none' }}>{t('login')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
