'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      router.push('/');
    } catch (err) {
      setError(t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
      background: 'linear-gradient(135deg, #F8F0FF 0%, #FFF5FB 100%)',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
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
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1A1A1A', marginTop: 12 }}>{t('welcomeBack')}</h1>
          <p style={{ color: '#808080', fontSize: 14, marginTop: 4 }}>{t('loginPageDesc')}</p>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: 32, boxShadow: '0 8px 40px rgba(112, 0, 255, 0.08)' }}>
          {/* Demo hint */}
          <div style={{
            background: '#EDE8FF', borderRadius: 12, padding: '10px 14px', marginBottom: 24,
            fontSize: 13, color: '#7000FF', display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <span>💡</span>
            <span>Demo: login: <strong>emilys</strong>, parol: <strong>emilyspass</strong></span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>
                {t('usernameLabel')}
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={t('usernamePlaceholder')}
                required
                style={{
                  width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 12,
                  padding: '12px 16px', fontSize: 15, outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>
                {t('passwordLabel')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  required
                  style={{
                    width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 12,
                    padding: '12px 48px 12px 16px', fontSize: 15, outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: 18,
                  }}
                >{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#FFF0F0', border: '1px solid #FFD0D0', borderRadius: 10,
                padding: '10px 14px', marginBottom: 16, color: '#FF4D00', fontSize: 13,
              }}>⚠️ {error}</div>
            )}

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <a href="#" style={{ color: '#7000FF', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>
                {t('forgotPass')}
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', background: loading ? '#A855F7' : '#7000FF',
                color: 'white', border: 'none', borderRadius: 14, padding: '14px',
                fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {loading ? `⏳ ${t('loadingText')}` : t('login')}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
            <span style={{ color: '#808080', fontSize: 13 }}>{t('orText')}</span>
            <div style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
          </div>

          {/* Register link */}
          <div style={{ textAlign: 'center', fontSize: 14, color: '#808080' }}>
            {t('noAccount')}{' '}
            <Link href="/register" style={{ color: '#7000FF', textDecoration: 'none', fontWeight: 600 }}>
              {t('registerNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
