'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { formatPrice, getDiscountedPrice } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const STEPS = [t('stepDelivery'), t('stepPayment'), t('stepConfirm')];

  React.useEffect(() => {
    setOrderId(Math.floor(Math.random() * 900000) + 100000);
  }, []);

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    address: '',
    city: 'Toshkent',
    paymentMethod: 'card',
  });

  const total = state.items.reduce((sum, item) =>
    sum + getDiscountedPrice(item.product.price, item.product.discountPercentage) * item.quantity, 0
  );

  const handleSubmit = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>✅</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12, color: '#1A1A1A' }}>
          {t('orderPlacedTitle')}
        </h1>
        <p style={{ color: '#808080', fontSize: 16, marginBottom: 8 }}>
          {t('orderNumber')}: <strong style={{ color: '#7000FF' }}>#{orderId}</strong>
        </p>
        <p style={{ color: '#808080', fontSize: 15, marginBottom: 32 }}>
          {t('orderSuccessDesc')}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/orders">
            <button style={{
              background: '#7000FF', color: 'white', border: 'none', borderRadius: 14,
              padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>{t('myOrders')} →</button>
          </Link>
          <Link href="/">
            <button style={{
              background: '#EDE8FF', color: '#7000FF', border: 'none', borderRadius: 14,
              padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            }}>{t('goHome')}</button>
          </Link>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 16px' }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>{t('cartEmpty')}</h2>
        <Link href="/products" style={{ display: 'block', marginTop: 20 }}>
          <button style={{
            background: '#7000FF', color: 'white', border: 'none', borderRadius: 14,
            padding: '12px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>{t('shopNow')}</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>{t('checkoutTitle')}</h1>

      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i <= step ? '#7000FF' : '#E0E0E0', color: 'white', fontWeight: 700, fontSize: 14,
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontWeight: 600, fontSize: 14, color: i <= step ? '#7000FF' : '#808080' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < step ? '#7000FF' : '#E0E0E0', margin: '0 12px' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Form */}
        <div style={{ background: 'white', borderRadius: 20, padding: 28, border: '1px solid #F0F0F0' }}>
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>📍 {t('deliveryAddress')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{t('firstName')}</label>
                  <input
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{t('lastName')}</label>
                  <input
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none' }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{t('phone')}</label>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder={t('phonePlaceholder')}
                  style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{t('city')}</label>
                <select
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', background: 'white' }}
                >
                  {['Toshkent', 'Samarqand', 'Buxoro', 'Namangan', 'Andijon', 'Farg\'ona', 'Nukus'].map(city => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{t('streetAddress')}</label>
                <input
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder={t('streetAddressPlaceholder')}
                  style={{ width: '100%', border: '1.5px solid #E0E0E0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none' }}
                />
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={!form.firstName || !form.phone || !form.address}
                style={{
                  width: '100%', background: '#7000FF', color: 'white', border: 'none',
                  borderRadius: 14, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  opacity: (!form.firstName || !form.phone || !form.address) ? 0.6 : 1,
                }}
              >{t('choosePayment')} →</button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>💳 {t('selectPayment')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  { value: 'card', icon: '💳', label: t('cardPayment'), desc: t('paymentDescCard') },
                  { value: 'cash', icon: '💵', label: t('cashPayment'), desc: t('paymentDescCash') },
                  { value: 'nasiya', icon: '📅', label: t('nasiyaTitle'), desc: t('paymentDescNasiya') },
                ].map(method => (
                  <label key={method.value} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 14, cursor: 'pointer',
                    border: `2px solid ${form.paymentMethod === method.value ? '#7000FF' : '#E0E0E0'}`,
                    background: form.paymentMethod === method.value ? '#EDE8FF' : 'white',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={form.paymentMethod === method.value}
                      onChange={() => setForm(f => ({ ...f, paymentMethod: method.value }))}
                      style={{ accentColor: '#7000FF', width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: 24 }}>{method.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A1A' }}>{method.label}</div>
                      <div style={{ fontSize: 13, color: '#808080' }}>{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setStep(0)}
                  style={{
                    flex: 1, background: '#F0F0F0', color: '#404040', border: 'none',
                    borderRadius: 14, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  }}
                >← {t('backBtn')}</button>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 2, background: '#7000FF', color: 'white', border: 'none',
                    borderRadius: 14, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  }}
                >{t('nextBtn')} →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>✅ {t('checkoutConfirmTitle')}</h2>
              <div style={{ background: '#F8F8F8', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#404040' }}>{t('deliveryAddress')}</h3>
                <p style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.6 }}>
                  {form.firstName} {form.lastName}<br />
                  {form.phone}<br />
                  {form.city}, {form.address}
                </p>
              </div>
              <div style={{ background: '#F8F8F8', borderRadius: 12, padding: 16, marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#404040' }}>{t('selectPayment')}</h3>
                <p style={{ fontSize: 14, color: '#1A1A1A' }}>
                  {form.paymentMethod === 'card' ? `💳 ${t('cardPayment')}` :
                    form.paymentMethod === 'cash' ? `💵 ${t('cashPayment')}` : `📅 ${t('nasiyaTitle')}`}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, background: '#F0F0F0', color: '#404040', border: 'none',
                    borderRadius: 14, padding: '14px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  }}
                >← {t('backBtn')}</button>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 2, background: '#00C853', color: 'white', border: 'none',
                    borderRadius: 14, padding: '14px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                  }}
                >✅ {t('confirmOrderBtn')}</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid #F0F0F0', height: 'fit-content', position: 'sticky', top: 90 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('orderSummary')} ({state.itemCount} {t('pieces')})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16, maxHeight: 300, overflowY: 'auto' }}>
            {state.items.map(item => (
              <div key={item.product.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, background: '#F8F8F8', borderRadius: 8, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                  <Image src={item.product.thumbnail} alt={item.product.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }} className="line-clamp-2">{item.product.title}</div>
                  <div style={{ fontSize: 12, color: '#808080' }}>x{item.quantity}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {formatPrice(getDiscountedPrice(item.product.price, item.product.discountPercentage) * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#808080' }}>{t('delivery')}</span>
              <span style={{ color: '#00C853' }}>{t('free')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>{t('total')}</span>
              <span style={{ fontWeight: 900, fontSize: 18, color: '#7000FF' }}>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
