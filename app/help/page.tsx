'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function HelpPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const FAQS = [
    {
      q: isUz ? "Buyurtmani qanday rasmiylashtirish mumkin?" : "Как оформить заказ?",
      a: isUz 
        ? "Mahsulotni savatga qo'shing, so'ngra savat sahifasiga o'tib 'Buyurtma berish' tugmasini bosing. Ism-sharifingiz, telefon raqamingiz va to'lov turini tanlab, buyurtmani tasdiqlang."
        : "Добавьте товар в корзину, затем перейдите в корзину и нажмите кнопку 'Оформить заказ'. Введите ваше имя, номер телефона, выберите способ оплаты и подтвердите заказ."
    },
    {
      q: isUz ? "Yetkazib berish qancha vaqt oladi va narxi qancha?" : "Сколько времени занимает доставка и сколько она стоит?",
      a: isUz
        ? "Uzum topshirish punktlarigacha yetkazib berish mutlaqo bepul va 1 kun ichida amalga oshiriladi. Eshikkacha kuryer orqali yetkazib berish pullik xizmat hisoblanadi."
        : "Доставка до пунктов выдачи Uzum абсолютно бесплатна и осуществляется в течение 1 дня. Доставка курьером до двери является платной услугой."
    },
    {
      q: isUz ? "Buyurtmani qabul qilib olganda to'lash mumkinmi?" : "Можно ли оплатить заказ при получении?",
      a: isUz
        ? "Ha, albatta. Siz buyurtmani topshirish punktida qabul qilib olayotganingizda naqd pul yoki plastik karta orqali to'lashingiz mumkin."
        : "Да, конечно. Вы можете оплатить заказ наличными или пластиковой картой при получении в пункте выдачи."
    },
    {
      q: isUz ? "Tovarni qaytarish shartlari qanday?" : "Каковы условия возврата товара?",
      a: isUz
        ? "Siz sotib olingan mahsulotni 14 kun ichida topshirish punktiga qaytarishingiz mumkin. Mahsulot foydalanilmagan, qadoqlari shikastlanmagan va tovar ko'rinishi saqlangan bo'lishi shart."
        : "Вы можете вернуть купленный товар в пункт выдачи в течение 14 дней. Товар не должен быть использован, упаковка должна быть целой, и сохранен товарный вид."
    },
    {
      q: isUz ? "Bo'lib to'lash (Nasiya) qanday ishlaydi?" : "Как работает рассрочка (Насия)?",
      a: isUz
        ? "Uzum Nasiya orqali mahsulotlarni 0% ustama bilan 12 oyga bo'lib to'lashga xarid qilishingiz mumkin. Buning uchun ro'yxatdan o'tishda pasport ma'lumotlarini kiritish lozim."
        : "Через Uzum Nasiya вы можете приобрести товары в рассрочку до 12 месяцев с наценкой 0%. Для этого при регистрации необходимо ввести паспортные данные."
    }
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 16px', minHeight: '80vh' }}>
      
      {/* Title */}
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1C1C', marginBottom: 8, letterSpacing: '-0.5px' }}>
        {isUz ? "Yordam va Savol-javoblar" : "Помощь и Часто задаваемые вопросы"}
      </h1>
      <p style={{ color: '#717480', fontSize: 16, marginBottom: 32 }}>
        {isUz ? "Uzum Market xizmatiga doir eng ko'p beriladigan savollarga javoblar" : "Ответы на самые популярные вопросы о сервисе Uzum Market"}
      </p>

      {/* Accordion FAQ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        {FAQS.map((faq, idx) => (
          <div 
            key={idx} 
            style={{ 
              border: '1.5px solid #F0F0F0', 
              borderRadius: 14, 
              overflow: 'hidden', 
              background: 'white',
              transition: 'all 0.2s'
            }}
          >
            <button 
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              style={{
                width: '100%', 
                background: 'none', 
                border: 'none', 
                padding: '20px 24px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1C1C1C' }}>{faq.q}</span>
              <span style={{ 
                fontSize: 20, 
                color: '#7000FF', 
                transform: openFaq === idx ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.2s',
                fontWeight: 300
              }}>+</span>
            </button>
            
            {openFaq === idx && (
              <div style={{ 
                padding: '0 24px 20px', 
                color: '#4D4F5C', 
                fontSize: 15, 
                lineHeight: 1.6,
                borderTop: '1px solid #F8F8F8'
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #EAEAEA', marginBottom: 40 }} />

      {/* Contact Section */}
      <div id="contact" style={{ background: 'var(--uzum-purple-light)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--uzum-purple)', margin: '0 0 10px 0' }}>
          {isUz ? "Savollaringiz bormi?" : "Остались вопросы?"}
        </h3>
        <p style={{ color: '#4D4F5C', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
          {isUz 
            ? "Agar siz o'zingizni qiziqtirgan savolga javob topa olmagan bo'lsangiz, bizning qo'llab-quvvatlash xizmatimizga murojaat qiling."
            : "Если вы не нашли ответ на интересующий вас вопрос, обратитесь в нашу службу поддержки."}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a 
            href="https://t.me/uzum_market" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              textDecoration: 'none', 
              background: '#7000FF', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: 12, 
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Telegram qo'llab-quvvatlash
          </a>
          <a 
            href="tel:+998781481480" 
            style={{ 
              textDecoration: 'none', 
              background: 'white', 
              color: '#1C1C1C', 
              padding: '12px 24px', 
              borderRadius: 12, 
              fontWeight: 600,
              fontSize: 14,
              border: '1.5px solid #EAEAEA'
            }}
          >
            +998 78 148-14-80
          </a>
        </div>
      </div>

      {/* Privacy Anchor */}
      <div id="privacy" style={{ marginTop: 40, color: '#808080', fontSize: 12, textAlign: 'center' }}>
        {isUz 
          ? "Saytdan foydalanish orqali siz Maxfiylik kelishuvi va Shaxsiy ma'lumotlarni qayta ishlash shartlariga rozilik bildirasiz." 
          : "Используя сайт, вы соглашаетесь с Политикой конфиденциальности и условиями обработки персональных данных."}
      </div>
      
    </div>
  );
}
