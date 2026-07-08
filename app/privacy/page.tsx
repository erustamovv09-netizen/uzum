'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 16px', minHeight: '80vh', lineHeight: 1.6, color: '#333' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1C1C', marginBottom: 24 }}>
        {isUz ? "Maxfiylik kelishuvi" : "Политика конфиденциальности"}
      </h1>

      <p style={{ fontWeight: 600 }}>
        {isUz 
          ? "Oxirgi yangilanish: 2026-yil 8-iyul" 
          : "Последнее обновление: 8 июля 2026 г."}
      </p>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "1. Umumiy qoidalar" : "1. Общие положения"}
        </h3>
        <p>
          {isUz 
            ? "Ushbu Maxfiylik siyosati foydalanuvchilarning shaxsiy ma'lumotlarini to'plash, qayta ishlash va saqlash tartibini belgilaydi. Biz foydalanuvchilarimiz maxfiyligini hurmat qilamiz va shaxsiy ma'lumotlar xavfsizligini ta'minlash majburiyatini olamiz."
            : "Настоящая Политика конфиденциальности определяет порядок сбора, обработки и хранения персональных данных пользователей. Мы уважаем конфиденциальность наших пользователей и стремимся обеспечить безопасность их данных."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "2. Shaxsiy ma'lumotlarni to'plash" : "2. Сбор персональных данных"}
        </h3>
        <p>
          {isUz 
            ? "Biz quyidagi shaxsiy ma'lumotlarni to'plashimiz mumkin: ism-sharif, telefon raqami, elektron pochta manzili, yetkazib berish manzili va to'lov ma'lumotlari. Ushbu ma'lumotlar xizmat ko'rsatish va buyurtmalarni bajarish uchun zarurdir."
            : "Мы можем собирать следующие персональные данные: имя, номер телефона, адрес электронной почты, адрес доставки и платежные данные. Эта информация необходима для предоставления услуг и выполнения заказов."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "3. Ma'lumotlarni himoya qilish" : "3. Защита данных"}
        </h3>
        <p>
          {isUz 
            ? "Biz shaxsiy ma'lumotlaringizni ruxsatsiz kirish, o'zgartirish yoki yo'q qilishdan himoya qilish uchun zamonaviy shifrlash texnologiyalari va xavfsizlik choralaridan foydalanamiz. Ma'lumotlaringiz uchinchi shaxslarga sotilmaydi yoki ijaraga berilmaydi."
            : "Мы используем современные технологии шифрования и меры безопасности для защиты ваших персональных данных от несанкционированного доступа, изменения или уничтожения. Ваши данные не продаются и не передаются в аренду третьим лицам."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>
          {isUz ? "4. Aloqa" : "4. Контакты"}
        </h3>
        <p>
          {isUz 
            ? "Maxfiylik siyosatiga oid savollaringiz bo'lsa, privacy@uzum.uz elektron manzili orqali murojaat qilishingiz mumkin."
            : "Если у вас возникли вопросы по поводу политики конфиденциальности, вы можете связаться с нами по адресу privacy@uzum.uz."}
        </p>
      </section>
    </div>
  );
}
