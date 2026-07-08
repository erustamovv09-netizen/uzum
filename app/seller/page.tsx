'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function SellerPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  const [form, setForm] = useState({ name: '', phone: '', company: '', category: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', phone: '', company: '', category: '' });
  };

  return (
    <div style={{ background: '#F8F9FA', minHeight: '90vh' }}>
      
      {/* Hero section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1A0050 0%, #4400AA 50%, #7000FF 100%)', 
        color: 'white', 
        padding: '60px 16px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{ 
            background: 'rgba(255,255,255,0.15)', 
            padding: '6px 14px', 
            borderRadius: 20, 
            fontSize: 13, 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {isUz ? "Hamkorlik" : "Партнерство"}
          </span>
          <h1 style={{ fontSize: 36, fontWeight: 900, marginTop: 16, marginBottom: 12, letterSpacing: '-0.5px' }}>
            {isUz ? "Uzum Marketda o'z biznesingizni boshlang!" : "Начните свой бизнес на Uzum Market!"}
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
            {isUz 
              ? "Mahsulotlaringizni O'zbekistonning eng yirik internet do'konida soting va millionlab mijozlarga ega bo'ling." 
              : "Продавайте свои товары на крупнейшем маркетплейсе Узбекистана и получайте доступ к миллионам покупателей."}
          </p>
        </div>
      </div>

      <div className="page-split-grid" style={{ maxWidth: 1000, margin: '-30px auto 40px', padding: '0 16px' }}>
        
        {/* Info Column */}
        <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1C1C1C', marginBottom: 24 }}>
            {isUz ? "Nega aynan Uzum Market?" : "Почему именно Uzum Market?"}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { 
                icon: '📈', 
                title: isUz ? "Katta auditoriya" : "Огромная аудитория", 
                desc: isUz 
                  ? "Har kuni sayt va ilovaga yuz minglab xaridorlar tashrif buyurishadi."
                  : "Ежедневно сайт и приложение посещают сотни тысяч покупателей."
              },
              { 
                icon: '🚚', 
                title: isUz ? "Tayyor logistika" : "Готовая логистика", 
                desc: isUz 
                  ? "Biz tovarlaringizni omborda saqlaymiz, qadoqlaymiz va 1 kunda butun mamlakat bo'ylab yetkazamiz."
                  : "Мы храним ваши товары на складе, упаковываем и доставляем за 1 день по всей стране."
              },
              { 
                icon: '💰', 
                title: isUz ? "Tezkor to'lovlar" : "Быстрые выплаты", 
                desc: isUz 
                  ? "Sotilgan tovarlar uchun mablag'lar har hafta kechiktirilmasdan hisob raqamingizga o'tkaziladi."
                  : "Средства за проданные товары переводятся на ваш счет еженедельно без задержек."
              }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', margin: '0 0 4px 0' }}>{item.title}</h4>
                  <p style={{ color: '#717480', fontSize: 13, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Column */}
        <div id="cabinet" style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <span style={{ fontSize: 48 }}>🎉</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1C', marginTop: 16, marginBottom: 8 }}>
                {isUz ? "Arizangiz qabul qilindi!" : "Ваша заявка принята!"}
              </h3>
              <p style={{ color: '#717480', fontSize: 14, lineHeight: 1.5 }}>
                {isUz 
                  ? "Tez orada menejerlarimiz siz bilan bog'lanib, sotuvchi kabinetini ochishga yordam berishadi." 
                  : "В ближайшее время наши менеджеры свяжутся с вами и помогут открыть кабинет продавца."}
              </p>
              <button 
                onClick={() => setSuccess(false)}
                style={{
                  marginTop: 20, background: 'var(--uzum-purple-light)', color: 'var(--uzum-purple)', 
                  border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {isUz ? "Yangi ariza yuborish" : "Отправить новую заявку"}
              </button>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1C', marginBottom: 6 }}>
                {isUz ? "Sotuvchi bo'lish uchun ariza" : "Заявка на партнерство"}
              </h3>
              <p style={{ color: '#717480', fontSize: 13, marginBottom: 20 }}>
                {isUz ? "Ma'lumotlarni to'ldiring va biz siz bilan bog'lanamiz" : "Заполните форму, и мы свяжемся с вами"}
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
                    placeholder={isUz ? "Masalan: Rustam" : "Например: Рустам"}
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
                    {isUz ? "Kompaniya yoki do'kon nomi" : "Название компании или магазина"}
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder={isUz ? "MChJ yoki YaTT nomi" : "Название ООО или ИП"}
                    style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 4 }}>
                    {isUz ? "Mahsulot toifasi" : "Категория товаров"}
                  </label>
                  <select 
                    required 
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none', background: 'white' }}
                  >
                    <option value="">{isUz ? "Tanlang..." : "Выберите..."}</option>
                    <option value="electronics">{isUz ? "Elektronika" : "Электроника"}</option>
                    <option value="clothing">{isUz ? "Kiyim-kechak" : "Одежда"}</option>
                    <option value="groceries">{isUz ? "Oziq-ovqat" : "Продукты питания"}</option>
                    <option value="other">{isUz ? "Boshqa" : "Другое"}</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    background: '#7000FF', color: 'white', border: 'none', borderRadius: 12,
                    padding: '12px', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: 8, opacity: loading ? 0.8 : 1
                  }}
                >
                  {loading ? (isUz ? "Yuborilmoqda..." : "Отправка...") : (isUz ? "Ariza topshirish" : "Подать заявку")}
                </button>
              </form>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
