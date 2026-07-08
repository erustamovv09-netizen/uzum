'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  return (
    <div style={{ background: '#FAF9FB', minHeight: '80vh', padding: '60px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: 'white', borderRadius: 24, padding: 40, boxShadow: '0 4px 24px rgba(0,0,0,0.03)' }}>
        
        {/* Title */}
        <h1 style={{ fontSize: 30, fontWeight: 900, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "Biz bilan bog'lanish" : "Связаться с нами"}
        </h1>
        <p style={{ color: '#717480', fontSize: 15, marginBottom: 32, lineHeight: 1.5 }}>
          {isUz 
            ? "Murojaatingiz, savol yoki takliflaringiz bo'lsa, quyidagi aloqa kanallari orqali biz bilan bog'lanishingiz mumkin. Bizning jamoamiz sizga yordam berishga doimo tayyor!"
            : "Если у вас есть вопросы, предложения или пожелания, свяжитесь с нами по указанным каналам связи. Наша команда всегда готова помочь вам!"}
        </p>

        {/* Contacts details */}
        <div className="page-split-grid" style={{ marginBottom: 32 }}>
          
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
              {isUz ? "Mijozlarni qo'llab-quvvatlash" : "Поддержка клиентов"}
            </h3>
            <p style={{ fontSize: 14, color: '#4D4F5C', margin: '0 0 8px 0' }}>
              <strong>{isUz ? "Telefon:" : "Телефон:"}</strong> <a href="tel:+998781481480" style={{ color: '#7000FF', textDecoration: 'none', fontWeight: 600 }}>+998 78 148-14-80</a>
            </p>
            <p style={{ fontSize: 14, color: '#4D4F5C', margin: '0 0 8px 0' }}>
              <strong>Telegram:</strong> <a href="https://t.me/uzum_market" target="_blank" rel="noopener noreferrer" style={{ color: '#7000FF', textDecoration: 'none', fontWeight: 600 }}>@uzum_market</a>
            </p>
            <p style={{ fontSize: 14, color: '#4D4F5C', margin: '0 0 8px 0' }}>
              <strong>Email:</strong> <a href="mailto:support@uzum.uz" style={{ color: '#7000FF', textDecoration: 'none', fontWeight: 600 }}>support@uzum.uz</a>
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
              {isUz ? "Bosh ofis manzili" : "Адрес главного офиса"}
            </h3>
            <p style={{ fontSize: 14, color: '#4D4F5C', lineHeight: 1.5, margin: 0 }}>
              {isUz 
                ? "O'zbekiston Respublikasi, Toshkent shahri, Mirobod tumani, Fidokor ko'chasi, 32-uy."
                : "Республика Узбекистан, город Ташкент, Мирабадский район, улица Фидокор, дом 32."}
            </p>
            <p style={{ fontSize: 13, color: '#717480', marginTop: 10 }}>
              {isUz ? "Ish tartibi: Dushanba - Yakshanba, 09:00 - 20:00" : "Режим работы: Понедельник - Воскресенье, 09:00 - 20:00"}
            </p>
          </div>

        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #ECEEEF', marginBottom: 32 }} />

        {/* Business cooperation */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1C1C1C', marginBottom: 12 }}>
            {isUz ? "Hamkorlik va marketing" : "Сотрудничество и маркетинг"}
          </h3>
          <p style={{ fontSize: 14, color: '#4D4F5C', lineHeight: 1.5, marginBottom: 16 }}>
            {isUz 
              ? "Tijorat takliflari, reklama yoki hamkorlik masalalari bo'yicha quyidagi bo'limlarga murojaat qilishingiz mumkin:"
              : "Для коммерческих предложений, рекламы или вопросов партнерства вы можете связаться со следующими отделами:"}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <span>💼 <strong>{isUz ? "Sotuvchilar uchun:" : "Для продавцов:"}</strong> <a href="mailto:partner@uzum.uz" style={{ color: '#7000FF', textDecoration: 'none' }}>partner@uzum.uz</a></span>
            <span>📢 <strong>{isUz ? "Matbuot xizmati (PR):" : "Пресс-служба (PR):"}</strong> <a href="mailto:pr@uzum.uz" style={{ color: '#7000FF', textDecoration: 'none' }}>pr@uzum.uz</a></span>
          </div>
        </div>

      </div>
    </div>
  );
}
