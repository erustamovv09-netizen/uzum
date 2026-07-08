'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PickupPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', phone: '', city: '', address: '' });
  };

  return (
    <div style={{ background: '#FDFEFE', minHeight: '90vh' }}>
      
      {/* Banner / Hero */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0A0F24 0%, #1A235A 60%, #303F9F 100%)', 
        color: 'white', 
        padding: '70px 16px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.12)', 
            padding: '6px 14px', 
            borderRadius: 20, 
            fontSize: 13, 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#FFD54F'
          }}>
            {isUz ? "Franshiza" : "Франшиза"}
          </span>
          <h1 style={{ fontSize: 36, fontWeight: 900, marginTop: 16, marginBottom: 12, letterSpacing: '-0.5px' }}>
            {isUz ? "Uzum topshirish punktini oching!" : "Откройте пункт выдачи Uzum!"}
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
            {isUz 
              ? "Uzum Market franchayzi bo'ling, tayyor logistika va barqaror hamkorlik orqali yuqori daromad oling." 
              : "Станьте франчайзи Uzum Market, получайте стабильный доход благодаря готовой логистике и партнерству."}
          </p>
        </div>
      </div>

      <div className="page-split-grid" style={{ maxWidth: 1000, margin: '-40px auto 40px', padding: '0 16px' }}>
        
        {/* Franchise Benefits */}
        <div style={{ background: 'white', borderRadius: 24, padding: 36, boxShadow: '0 10px 30px rgba(10,15,36,0.06)', border: '1px solid #F0F2F5' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1C1C1C', marginBottom: 24 }}>
            {isUz ? "Hamkorlikning afzalliklari" : "Преимущества партнерства"}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { 
                icon: '🏪', 
                title: isUz ? "Kafolatlangan oqim" : "Гарантированный поток", 
                desc: isUz 
                  ? "Biz o'z brendimiz va marketingimiz orqali sizga doimiy mijozlarni ta'minlaymiz."
                  : "Мы обеспечиваем вам стабильный поток клиентов за счет нашего бренда и маркетинга."
              },
              { 
                icon: '💵', 
                title: isUz ? "Yaxshi daromad" : "Хороший доход", 
                desc: isUz 
                  ? "Har bir berilgan buyurtma uchun foiz oling. O'rtacha oylik aylanma va rentabellik yuqori."
                  : "Получайте процент с каждого выданного заказа. Средний оборот и рентабельность на высоком уровне."
              },
              { 
                icon: '🛠️', 
                title: isUz ? "Har tomonlama yordam" : "Всесторонняя поддержка", 
                desc: isUz 
                  ? "Joy tanlash, dizayn va ta'mirlash, kadrlar tayyorlash hamda dasturiy ta'minotni bepul taqdim etamiz."
                  : "Помогаем с выбором помещения, дизайном и ремонтом, обучаем персонал и бесплатно предоставляем ПО."
              }
            ].map((benefit, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 18 }}>
                <span style={{ fontSize: 34, flexShrink: 0 }}>{benefit.icon}</span>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', margin: '0 0 6px 0' }}>{benefit.title}</h4>
                  <p style={{ color: '#717480', fontSize: 13, margin: 0, lineHeight: 1.45 }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply form */}
        <div style={{ background: 'white', borderRadius: 24, padding: 36, boxShadow: '0 10px 30px rgba(10,15,36,0.06)', border: '1px solid #F0F2F5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <span style={{ fontSize: 48 }}>📬</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1C', marginTop: 16, marginBottom: 8 }}>
                {isUz ? "Hamkorlik arizasi qabul qilindi!" : "Заявка на франшизу принята!"}
              </h3>
              <p style={{ color: '#717480', fontSize: 14, lineHeight: 1.5 }}>
                {isUz 
                  ? "Franshiza bo'limi mutaxassislari tez orada siz ko'rsatgan raqamga qo'ng'iroq qilishadi." 
                  : "Специалисты отдела франчайзинга свяжутся с вами по указанному номеру телефона."}
              </p>
              <button 
                onClick={() => setSuccess(false)}
                style={{
                  marginTop: 20, background: '#1A235A', color: 'white', 
                  border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {isUz ? "Yangi ariza yuborish" : "Отправить новую заявку"}
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1C', marginBottom: 6 }}>
                {isUz ? "Hamkor bo'ling" : "Стать партнером"}
              </h3>
              <p style={{ color: '#717480', fontSize: 13, marginBottom: 20 }}>
                {isUz ? "Uzum topshirish punktini ochish uchun ma'lumotlarni yuboring" : "Отправьте данные для открытия пункта выдачи Uzum"}
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 4 }}>
                    {isUz ? "Ism-sharifingiz" : "Ваше имя"}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={isUz ? "Ismingizni kiriting" : "Введите ваше имя"}
                    style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 4 }}>
                    {isUz ? "Telefon raqamingiz" : "Номер телефона"}
                  </label>
                  <input 
                    type="tel" 
                    required 
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+998 90 000-00-00"
                    style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 4 }}>
                    {isUz ? "Shahar / Viloyat" : "Город / Регион"}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    placeholder={isUz ? "Masalan: Samarqand" : "Например: Самарканд"}
                    style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 4 }}>
                    {isUz ? "Mo'ljallangan manzil" : "Предполагаемый адрес"}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    placeholder={isUz ? "Ko'cha nomi, mo'ljal" : "Название улицы, ориентир"}
                    style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    background: '#1A235A', color: 'white', border: 'none', borderRadius: 12,
                    padding: '12px', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: 8, opacity: loading ? 0.8 : 1
                  }}
                >
                  {loading ? (isUz ? "Yuborilmoqda..." : "Отправка...") : (isUz ? "Hamkorlik arizasini yuborish" : "Отправить заявку")}
                </button>
              </form>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
