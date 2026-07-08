'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { useWishlist } from '@/lib/WishlistContext';
import { productsApi, Product } from '@/lib/api';

export default function Header() {
  const router = useRouter();
  const { state: cartState } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { language: selectedLang, setLanguage: setSelectedLang, t } = useLanguage();
  const { itemCount: wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Toshkent');
  const [locationOpen, setLocationOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await productsApi.search(searchQuery.trim(), { limit: 5 });
        setSuggestions(res.products);
      } catch (err) {
        console.error(err);
      }
    }, 250);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSuggestionsOpen(false);
    }
  };

  const NAV_ITEMS = [
    { label: t('navGuaranteedPrices'), href: "/products", special: true },
    { label: t('navElectronics'), href: "/category/smartphones" },
    { label: t('navAppliances'), href: "/category/laptops" },
    { label: t('navGroceries'), href: "/category/groceries" },
    { label: t('navFurniture'), href: "/category/furniture" },
    { label: t('navKitchen'), href: "/category/kitchen-accessories" },
    { label: t('navAutomotive'), href: "/category/automotive" },
    { label: t('navSports'), href: "/category/sports-accessories" },
    { label: t('navClothing'), href: "/category/clothing" },
    { label: t('navAccessories'), href: "/category/accessories" },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff' }}>

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      <div className="header-top-bar" style={{ background: '#fff', borderBottom: '1px solid var(--uzum-gray-200)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div ref={locationRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 13, color: '#1C1C1C', padding: 0,
                }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5Zm0 6.5A1.5 1.5 0 1 1 6 3.5 1.5 1.5 0 0 1 6 6.5Z" fill="#7000FF"/>
                </svg>
                <span style={{ fontWeight: 500 }}>{selectedLocation}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: locationOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M1 1l4 4 4-4" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {locationOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  background: 'white', borderRadius: 12, padding: 8,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, minWidth: 160,
                  display: 'flex', flexDirection: 'column', gap: 2,
                  border: '1px solid var(--uzum-gray-200)',
                }}>
                  {['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona', 'Namangan', 'Nukus', 'Qarshi'].map(loc => (
                    <div
                      key={loc}
                      onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                      style={{
                        padding: '8px 12px', borderRadius: 6, fontSize: 13, color: '#1C1C1C', cursor: 'pointer',
                        background: loc === selectedLocation ? 'var(--uzum-purple-light)' : 'transparent',
                        fontWeight: loc === selectedLocation ? 600 : 400,
                        textAlign: 'left',
                      }}
                      onMouseEnter={e => {
                        if (loc !== selectedLocation) e.currentTarget.style.background = 'var(--uzum-gray-100)';
                      }}
                      onMouseLeave={e => {
                        if (loc !== selectedLocation) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#1C1C1C', padding: 0 }}>
              {t('points')}
            </button>
          </div>

          {/* Right: links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/seller" style={{ color: '#7000FF', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{t('becomeSeller')}</Link>
            <Link href="/pickup" style={{ color: '#7000FF', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{t('openPoint')}</Link>
            <Link href="/help" style={{ color: '#1C1C1C', fontSize: 13, textDecoration: 'none' }}>{t('faq')}</Link>
            <Link href="/orders" style={{ color: '#1C1C1C', fontSize: 13, textDecoration: 'none' }}>{t('myOrders')}</Link>
            {/* Language */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  background: 'none', border: '1px solid var(--uzum-gray-200)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#1C1C1C',
                  padding: '2px 10px', borderRadius: 4,
                }}
              >
                <span>{selectedLang === 'uz' ? '🇺🇿' : '🇷🇺'}</span> {selectedLang === 'uz' ? "O'zbekcha" : 'Русский'}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M1 1l4 4 4-4" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {langOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'white', borderRadius: 12, padding: 8,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, minWidth: 130,
                  display: 'flex', flexDirection: 'column', gap: 2,
                  border: '1px solid var(--uzum-gray-200)',
                }}>
                  {[
                    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
                    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
                  ].map(l => (
                    <div
                      key={l.code}
                      onClick={() => { setSelectedLang(l.code as any); setLangOpen(false); }}
                      style={{
                        padding: '8px 12px', borderRadius: 6, fontSize: 13, color: '#1C1C1C', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: l.code === selectedLang ? 'var(--uzum-purple-light)' : 'transparent',
                        fontWeight: l.code === selectedLang ? 600 : 400,
                      }}
                      onMouseEnter={e => {
                        if (l.code !== selectedLang) e.currentTarget.style.background = 'var(--uzum-gray-100)';
                      }}
                      onMouseLeave={e => {
                        if (l.code !== selectedLang) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--uzum-gray-200)', background: '#fff' }}>
        <div className="header-main-row" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', gap: 14 }}>

          {/* Logo */}
          <Link href="/" className="header-logo-container" style={{ textDecoration: 'none', flexShrink: 0, marginRight: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img
                src="https://yt3.googleusercontent.com/VrLVt-BzggpF0KX98EZRKHe0VDlJgJQUSW7IlPLfqMJR_xiMxNAZsmQFZezzUg6lG7tINr_vGtw=s900-c-k-c0x00ffffff-no-rj"
                alt="Uzum"
                style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'contain' }}
              />
              <span style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#7000FF',
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'baseline',
                gap: 4
              }}>
                uzum
                <span style={{ fontWeight: 500, color: '#7000FF' }}>market</span>
              </span>
            </div>
          </Link>

          {/* Katalog */}
          <div className="hide-on-mobile" style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#EAE6FF', color: '#7000FF', border: 'none',
                borderRadius: 8, padding: '0 18px', height: 44,
                fontSize: 15, fontWeight: 500, cursor: 'pointer',
              }}
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect width="16" height="2" rx="1" fill="#7000FF"/>
                <rect y="5" width="16" height="2" rx="1" fill="#7000FF"/>
                <rect y="10" width="16" height="2" rx="1" fill="#7000FF"/>
              </svg>
              {t('catalog')}
            </button>
            {catalogOpen && (
              <div
                onMouseLeave={() => setCatalogOpen(false)}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  background: 'white', borderRadius: 12, padding: 8,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, minWidth: 280,
                }}
              >
                {[
                  { key: 'navElectronics', label: 'Elektronika', href: '/category/smartphones' },
                  { key: 'navAppliances', label: 'Maishiy texnika', href: '/category/laptops' },
                  { key: 'navClothing', label: 'Kiyim-kechak', href: '/category/clothing' },
                  { key: 'navFurniture', label: 'Uy va mebel', href: '/category/furniture' },
                  { key: 'beauty', label: "Go'zallik", href: '/category/beauty' },
                  { key: 'navSports', label: 'Sport va turizm', href: '/category/sports-accessories' },
                  { key: 'navGroceries', label: 'Oziq-ovqat', href: '/category/groceries' },
                  { key: 'navAccessories', label: 'Aksessuarlar', href: '/category/accessories' },
                ].map(cat => (
                  <Link key={cat.href} href={cat.href} style={{ textDecoration: 'none' }}>
                    <div
                      onClick={() => setCatalogOpen(false)}
                      style={{ padding: '10px 16px', borderRadius: 8, fontSize: 14, color: '#1C1C1C', cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--uzum-purple-light)'}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                    >
                      {t(cat.key) || cat.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

           {/* Search */}
          <div ref={searchContainerRef} className="header-search-container" style={{ flex: 1, position: 'relative' }}>
            <form onSubmit={handleSearch}>
              <div style={{
                display: 'flex', alignItems: 'center', height: 44,
                border: '1px solid var(--uzum-gray-200)', borderRadius: 8, background: 'var(--uzum-gray-100)', overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setSuggestionsOpen(true); }}
                  placeholder={t('searchPlaceholder')}
                  style={{
                    flex: 1, border: 'none', background: 'transparent',
                    fontSize: 14, outline: 'none', color: '#1C1C1C',
                    padding: '0 16px',
                  }}
                  onFocus={e => {
                    (e.currentTarget.parentElement as HTMLDivElement).style.borderColor = 'var(--uzum-purple)';
                    setSuggestionsOpen(true);
                  }}
                  onBlur={e => {
                    (e.currentTarget.parentElement as HTMLDivElement).style.borderColor = 'var(--uzum-gray-200)';
                  }}
                />
                <button type="submit" style={{
                  background: 'transparent', border: 'none', height: '100%',
                  padding: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#717480" strokeWidth="2"/>
                    <path d="M16.5 16.5L21 21" stroke="#717480" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {suggestionsOpen && suggestions.length > 0 && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
                background: 'white', borderRadius: 12, padding: '8px 0',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 300,
                border: '1px solid var(--uzum-gray-200)',
                display: 'flex', flexDirection: 'column',
              }}>
                {suggestions.map(p => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    style={{ textDecoration: 'none' }}
                    onClick={() => { setSuggestionsOpen(false); setSearchQuery(''); }}
                  >
                    <div
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 16px', cursor: 'pointer', transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--uzum-gray-100)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover', background: '#F8F8F8' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#1C1C1C', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {p.title}
                        </div>
                        <div style={{ fontSize: 11, color: '#808080', marginTop: 2 }}>
                          {p.category}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#7000FF', flexShrink: 0 }}>
                        {Math.round(p.price * 12700).toLocaleString('uz-UZ')} so'm
                      </div>
                    </div>
                  </Link>
                ))}
                <div style={{ borderTop: '1px solid var(--uzum-gray-200)', margin: '6px 0' }} />
                <div
                  onClick={() => {
                    if (searchQuery.trim()) {
                      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                      setSuggestionsOpen(false);
                    }
                  }}
                  style={{
                    padding: '8px 16px', fontSize: 13, color: '#7000FF', fontWeight: 600,
                    cursor: 'pointer', textAlign: 'center', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--uzum-purple-light)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Barcha natijalarni ko'rish →
                </div>
              </div>
            )}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {/* Kirish */}
            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px 12px', borderRadius: 8, fontSize: 14, color: '#1C1C1C',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--uzum-gray-100)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#1C1C1C" strokeWidth="1.5"/>
                </svg>
                <span className="hide-on-mobile" style={{ fontWeight: 400 }}>{isAuthenticated ? user?.firstName : t('login')}</span>
              </button>

              {profileOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'white', borderRadius: 12, padding: 8,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 220, zIndex: 200,
                }}>
                  {isAuthenticated ? (
                    <>
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--uzum-gray-200)', marginBottom: 4 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{user?.firstName} {user?.lastName}</div>
                        <div style={{ color: '#717480', fontSize: 12, marginTop: 2 }}>{user?.email}</div>
                      </div>
                      {[
                        { href: '/profile', key: 'profile', label: 'Profil' },
                        { href: '/orders', key: 'myOrders', label: 'Buyurtmalar' },
                        { href: '/wishlist', key: 'wishlist', label: 'Sevimlilar' },
                      ].map(item => (
                        <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                          <div
                            onClick={() => setProfileOpen(false)}
                            style={{ padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 14, color: '#1C1C1C' }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--uzum-purple-light)'}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                          >{t(item.key)}</div>
                        </Link>
                      ))}
                      <button onClick={() => { logout(); setProfileOpen(false); }} style={{
                        width: '100%', background: 'none', border: 'none', textAlign: 'left',
                        padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 14, color: '#E50000',
                      }}>{t('logout')}</button>
                    </>
                  ) : (
                    <div style={{ padding: 4 }}>
                      <Link href="/login">
                        <button onClick={() => setProfileOpen(false)} style={{
                          width: '100%', background: '#7000FF', color: 'white', border: 'none',
                          borderRadius: 8, padding: '11px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 8,
                        }}>{t('login')}</button>
                      </Link>
                      <Link href="/register">
                        <button onClick={() => setProfileOpen(false)} style={{
                          width: '100%', background: 'var(--uzum-purple-light)', color: 'var(--uzum-purple)', border: 'none',
                          borderRadius: 8, padding: '11px 16px', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                        }}>{t('register')}</button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Saralangan */}
            <Link href="/wishlist" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8,
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#1C1C1C',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--uzum-gray-100)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
              >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? '#FF1A8C' : 'none'}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={wishlistCount > 0 ? '#FF1A8C' : '#1C1C1C'} strokeWidth="1.5" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      background: '#FF1A8C', color: 'white', fontSize: 10,
                      fontWeight: 700, borderRadius: '50%', width: 14, height: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{wishlistCount}</span>
                  )}
                </div>
                <span className="hide-on-mobile">{t('wishlist')}</span>
              </button>
            </Link>

            {/* Savat */}
            <Link href="/cart" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8,
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#1C1C1C',
                position: 'relative', transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--uzum-gray-100)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
              >
                {cartState.itemCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 2, left: 22,
                    background: '#7000FF', color: 'white', fontSize: 10, fontWeight: 700,
                    minWidth: 16, height: 16, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px',
                  }}>{cartState.itemCount}</span>
                )}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="hide-on-mobile">{t('cart')}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── CATEGORY NAV ────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--uzum-gray-200)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px', display: 'flex', overflowX: 'auto', gap: 0 }}>
          {NAV_ITEMS.map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 14px', fontSize: 13, fontWeight: item.special ? 600 : 400,
                color: item.special ? '#7000FF' : '#1C1C1C',
                borderBottom: '2px solid transparent', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.15s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.color = '#7000FF';
                  (e.currentTarget as HTMLDivElement).style.borderBottomColor = '#7000FF';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.color = item.special ? '#7000FF' : '#1C1C1C';
                  (e.currentTarget as HTMLDivElement).style.borderBottomColor = 'transparent';
                }}
              >
                {item.special && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#F83168"/>
                    <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {item.label}
              </div>
            </Link>
          ))}
          <div ref={moreRef} style={{ flexShrink: 0, position: 'relative' }}>
            <div
              onClick={() => setMoreOpen(!moreOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '10px 14px', fontSize: 13, color: '#1C1C1C',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.color = '#7000FF'}
              onMouseLeave={e => {
                if (!moreOpen) (e.currentTarget as HTMLDivElement).style.color = '#1C1C1C';
              }}
            >
              {t('more')}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: moreOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            {moreOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0,
                background: 'white', borderRadius: 12, padding: 8,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, minWidth: 200,
                display: 'flex', flexDirection: 'column', gap: 2,
                border: '1px solid var(--uzum-gray-200)',
              }}
                onMouseLeave={() => setMoreOpen(false)}
              >
                {[
                  { key: "fragrances", label: "Parfyumeriya", href: "/category/fragrances" },
                  { key: "beauty", label: "Go'zallik", href: "/category/beauty" },
                  { key: "skincare", label: "Terini parvarish qilish", href: "/category/skincare" },
                  { key: "sunglasses", label: "Quyosh ko'zoynaklari", href: "/category/sunglasses" },
                  { key: "womensBags", label: "Ayollar sumkalari", href: "/category/womens-bags" },
                  { key: "jewelry", label: "Zargarlik buyumlari", href: "/category/womens-jewellery" },
                  { key: "automotive", label: "Avtomobillar", href: "/category/vehicle" },
                  { key: "lighting", label: "Yoritish moslamalari", href: "/category/lighting" },
                ].map((item, idx) => (
                  <Link key={idx} href={item.href} style={{ textDecoration: 'none' }}>
                    <div
                      onClick={() => setMoreOpen(false)}
                      style={{ padding: '8px 12px', borderRadius: 6, fontSize: 13, color: '#1C1C1C', cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--uzum-purple-light)'}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                    >
                      {t(item.key) || item.label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
