'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function CareersPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  const [form, setForm] = useState({ name: '', phone: '', job: '', details: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const JOBS = [
    {
      title: isUz ? "Topshirish punkti menejeri" : "Менеджер пункта выдачи",
      dept: isUz ? "Logistika va xizmat ko'rsatish" : "Логистика и обслуживание",
      salary: isUz ? "3,500,000 - 5,000,000 so'm" : "3 500 000 - 5 000 000 сум",
      loc: isUz ? "Toshkent, Samarqand, Buxoro" : "Ташкент, Самарканд, Бухара"
    },
    {
      title: isUz ? "Kuryer (Shaxsiy mashina bilan)" : "Курьер (С личным авто)",
      dept: isUz ? "Yetkazib berish xizmati" : "Служба доставки",
      salary: isUz ? "6,000,000 - 12,000,000 so'm" : "6 000 000 - 12 000 000 сум",
      loc: isUz ? "Butun O'zbekiston bo'ylab" : "По всему Узбекистану"
    },
    {
      title: isUz ? "Omborxona operatori" : "Оператор склада",
      dept: isUz ? "Taqsimot markazi" : "Распределительный центр",
      salary: isUz ? "4,000,000 - 6,000,000 so'm" : "4 000 000 - 6 000 000 сум",
      loc: isUz ? "Toshkent (O'rtasaroy)" : "Ташкент (Уртасарай)"
    },
    {
      title: isUz ? "Frontend Dasturchi (React / Next.js)" : "Frontend Разработчик (React / Next.js)",
      dept: isUz ? "IT va Texnologiyalar" : "IT и Технологии",
      salary: isUz ? "Suhbat asosida" : "По результатам собеседования",
      loc: isUz ? "Toshkent (Ofis / Masofaviy)" : "Ташкент (Офис / Удаленно)"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', phone: '', job: '', details: '' });
  };

  return (
    <div style={{ background: '#FAF9FC', minHeight: '90vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1C1C1C', marginBottom: 12 }}>
            {isUz ? "Uzum jamoasiga qo'shiling!" : "Присоединяйтесь к команде Uzum!"}
          </h1>
          <p style={{ color: '#717480', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
            {isUz 
              ? "Mamlakatdagi eng tez rivojlanayotgan ekotizimda o'z faoliyatingizni boshlang va professional darajada o'sing."
              : "Начните карьеру в самой быстрорастущей экосистеме страны и растите профессионально вместе с нами."}
          </p>
        </div>

        <div className="page-split-grid">
          
          {/* Vacancies List */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1C', marginBottom: 20 }}>
              {isUz ? "Aktiv vakansiyalar" : "Активные вакансии"}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {JOBS.map((job, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    background: 'white', 
                    border: '1px solid #F0EAF8', 
                    borderRadius: 16, 
                    padding: 20, 
                    boxShadow: '0 4px 12px rgba(112, 0, 255, 0.02)' 
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7000FF', background: '#F4EBFF', padding: '4px 10px', borderRadius: 20 }}>
                    {job.dept}
                  </span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: '#1C1C1C', marginTop: 10, marginBottom: 8 }}>
                    {job.title}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: '#717480', fontSize: 13 }}>
                    <span>📍 {job.loc}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'white', border: '1px solid #EAEAEA', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: 'fit-content' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <span style={{ fontSize: 48 }}>📋</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1C1C1C', marginTop: 16, marginBottom: 8 }}>
                  {isUz ? "Rezyumeingiz qabul qilindi!" : "Резюме принято!"}
                </h3>
                <p style={{ color: '#717480', fontSize: 13, lineHeight: 1.5 }}>
                  {isUz 
                    ? "HR bo'limi arizangizni ko'rib chiqib, mos keladigan vakansiya bo'yicha bog'lanishadi." 
                    : "Отдел кадров рассмотрит вашу заявку и свяжется с вами при наличии подходящей вакансии."}
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  style={{
                    marginTop: 20, background: '#7000FF', color: 'white', 
                    border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {isUz ? "Yana topshirish" : "Отправить еще раз"}
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1C1C1C', marginBottom: 6 }}>
                  {isUz ? "Jamoaga qo'shilish" : "Присоединиться к нам"}
                </h3>
                <p style={{ color: '#717480', fontSize: 13, marginBottom: 20 }}>
                  {isUz ? "O'zingiz haqingizda yozing, biz siz bilan bog'lanamiz" : "Расскажите о себе, и мы свяжемся с вами"}
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
                      {isUz ? "Sizni qaysi lavozim qiziqtiradi?" : "Какая должность вас интересует?"}
                    </label>
                    <select 
                      required 
                      value={form.job}
                      onChange={e => setForm(f => ({ ...f, job: e.target.value }))}
                      style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none', background: 'white' }}
                    >
                      <option value="">{isUz ? "Tanlang..." : "Выберите..."}</option>
                      {JOBS.map((job, idx) => (
                        <option key={idx} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404040', marginBottom: 4 }}>
                      {isUz ? "Tajriba va qo'shimcha ma'lumotlar" : "Опыт и дополнительная информация"}
                    </label>
                    <textarea 
                      value={form.details}
                      onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                      placeholder={isUz ? "Tajribangiz va o'zingiz haqingizda qisqacha..." : "Кратко о вашем опыте и навыках..."}
                      style={{ width: '100%', border: '1.5px solid #EAEAEA', borderRadius: 10, padding: '10px 12px', fontSize: 14, outline: 'none', minHeight: 80, resize: 'vertical' }}
                    />
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
                    {loading ? (isUz ? "Yuborilmoqda..." : "Отправка...") : (isUz ? "Rezyume yuborish" : "Отправить резюме")}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
