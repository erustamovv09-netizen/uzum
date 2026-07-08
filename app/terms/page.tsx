'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 16px', minHeight: '80vh', lineHeight: 1.6, color: '#333' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1C1C', marginBottom: 24 }}>
        {isUz ? "Foydalanish shartnomasi" : "Пользовательское соглашение"}
      </h1>

      <p style={{ fontWeight: 600 }}>
        {isUz 
          ? "Oxirgi yangilanish: 2026-yil 8-iyul" 
          : "Последнее обновление: 8 июля 2026 г."}
      </p>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "1. Shartnoma mavzusi" : "1. Предмет соглашения"}
        </h3>
        <p>
          {isUz 
            ? "Ushbu shartnoma Uzum Market platformasidan foydalanish qoidalari va shartlarini belgilaydi. Platformadan foydalanish orqali siz ushbu shartnoma shartlariga to'liq rozilik bildirasiz."
            : "Настоящее соглашение определяет правила и условия использования платформы Uzum Market. Используя платформу, вы выражаете полное согласие с условиями соглашения."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "2. Foydalanuvchining majburiyatlari" : "2. Обязанности пользователя"}
        </h3>
        <p>
          {isUz 
            ? "Foydalanuvchi ro'yxatdan o'tish paytida faqat to'g'ri va haqiqiy ma'lumotlarni taqdim etishi shart. Platformadan noqonuniy maqsadlarda yoki boshqa foydalanuvchilar huquqlarini buzuvchi harakatlar uchun foydalanish taqiqlanadi."
            : "Пользователь обязан предоставлять только точные и достоверные данные при регистрации. Запрещается использовать платформу в незаконных целях или для действий, нарушающих права других пользователей."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "3. Buyurtmalar va to'lovlar" : "3. Заказы и оплата"}
        </h3>
        <p>
          {isUz 
            ? "Platformadagi barcha narxlar milliy valyuta (so'm)da ko'rsatilgan. Buyurtmani tasdiqlash orqali foydalanuvchi tanlangan mahsulotni ko'rsatilgan narx bo'yicha sotib olish va to'lovni amalga oshirish majburiyatini oladi."
            : "Все цены на платформе указаны в национальной валюте (сум). Подтверждая заказ, пользователь обязуется приобрести выбранный товар по указанной цене и совершить оплату."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "4. Javobgarlikning cheklanishi" : "4. Ограничение ответственности"}
        </h3>
        <p>
          {isUz 
            ? "Biz platformaning uzluksiz ishlashini ta'minlashga harakat qilamiz, ammo texnik nosozliklar tufayli yuzaga keladigan vaqtinchalik to'xtashlar yoki ma'lumotlar yo'qolishi uchun javobgar emasmiz."
            : "Мы стараемся обеспечить бесперебойную работу платформы, однако не несем ответственности за временные перебои или потерю данных из-за технических сбоев."}
        </p>
      </section>
    </div>
  );
}
