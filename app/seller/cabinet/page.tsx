'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function SellerCabinetPage() {
  const { language } = useLanguage();
  const isUz = language === 'uz';

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  const STATS = [
    { title: isUz ? "Jami sotuvlar (oylik)" : "Общие продажи (мес.)", value: "68,450,000 so'm", change: "+14.2%", icon: "💰", up: true },
    { title: isUz ? "Sotilgan tovarlar" : "Продано товаров", value: "348 ta", change: "+8.5%", icon: "📦", up: true },
    { title: isUz ? "Yangi buyurtmalar" : "Новые заказы", value: "14 ta", change: "-2.1%", icon: "⚡", up: false },
    { title: isUz ? "O'rtacha reyting" : "Средний рейтинг", value: "4.92 / 5.0", change: "+0.05", icon: "⭐", up: true }
  ];

  const PRODUCTS = [
    { id: 1, name: isUz ? "Zara klassik erkaklar shimi" : "Классические мужские брюки Zara", price: "450,000 so'm", stock: 24, status: isUz ? "Aktiv" : "Активен" },
    { id: 2, name: isUz ? "Klassik ayollar kostyumi" : "Классический женский костюм", price: "1,143,000 so'm", stock: 12, status: isUz ? "Aktiv" : "Активен" },
    { id: 3, name: isUz ? "Redmi 13C 4/128 GB" : "Redmi 13C 4/128 ГБ", price: "2,286,000 so'm", stock: 8, status: isUz ? "Aktiv" : "Активен" },
    { id: 4, name: isUz ? "Massimo Dutti yozgi ko'ylak" : "Летнее платье Massimo Dutti", price: "635,000 so'm", stock: 0, status: isUz ? "Muzlatilgan" : "Заморожен" }
  ];

  const ORDERS = [
    { id: "ORD-9482", customer: "Elshod R.", date: "08.07.2026", amount: "900,000 so'm", status: isUz ? "Yetkazilmoqda" : "Доставляется" },
    { id: "ORD-9481", customer: "Aziza S.", date: "07.07.2026", amount: "450,000 so'm", status: isUz ? "Topshirildi" : "Выдан" },
    { id: "ORD-9480", customer: "Farrux K.", date: "07.07.2026", amount: "2,286,000 so'm", status: isUz ? "Topshirildi" : "Выдан" },
    { id: "ORD-9479", customer: "Shaxnoza M.", date: "06.07.2026", amount: "635,000 so'm", status: isUz ? "Qaytarildi" : "Возврат" }
  ];

  return (
    <div className="cabinet-layout" style={{ minHeight: '90vh', background: '#F4F5F7' }}>
      
      {/* Sidebar */}
      <div className="cabinet-sidebar" style={{ background: '#1A0050', color: 'white', padding: '30px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: '#7000FF', color: 'white', width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>U</div>
          <div>
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Cabinet Seller</h4>
            <span style={{ fontSize: 11, opacity: 0.6 }}>ID: 849202</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
          {[
            { id: 'dashboard', label: isUz ? "Boshqaruv paneli" : "Панель управления", icon: "📊" },
            { id: 'products', label: isUz ? "Mahsulotlarim" : "Мои товары", icon: "📦" },
            { id: 'orders', label: isUz ? "Buyurtmalar" : "Заказы", icon: "🛒" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                width: '100%', border: 'none', background: activeTab === tab.id ? '#7000FF' : 'transparent',
                color: 'white', padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, fontSize: 14,
                fontWeight: activeTab === tab.id ? 700 : 500, transition: 'background 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px 32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1C1C1C', margin: 0 }}>
              {activeTab === 'dashboard' && (isUz ? "Boshqaruv paneli" : "Панель управления")}
              {activeTab === 'products' && (isUz ? "Mahsulotlar ro'yxati" : "Список товаров")}
              {activeTab === 'orders' && (isUz ? "Buyurtmalarni boshqarish" : "Управление заказами")}
            </h1>
            <p style={{ color: '#717480', fontSize: 14, margin: '4px 0 0 0' }}>
              {isUz ? "Xush kelibsiz, Elshod! Do'koningiz faoliyati statistikasi:" : "Добро пожаловать, Элшод! Статистика вашего магазина:"}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ background: '#E2FBE9', color: '#10B981', padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700 }}>
              ● {isUz ? "Do'kon faol" : "Магазин активен"}
            </span>
          </div>
        </div>

        {/* Tab content: Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats grid */}
            <div className="cabinet-stats" style={{ marginBottom: 32 }}>
              {STATS.map((stat, idx) => (
                <div key={idx} style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #ECEEEF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{stat.icon}</span>
                    <span style={{ color: stat.up ? '#10B981' : '#EF4444', fontSize: 13, fontWeight: 700 }}>{stat.change}</span>
                  </div>
                  <h4 style={{ color: '#717480', fontSize: 13, fontWeight: 600, margin: '0 0 4px 0' }}>{stat.title}</h4>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#1C1C1C' }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Sales Chart Mock / Recent activity */}
            <div style={{ background: 'white', borderRadius: 20, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #ECEEEF' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1C1C1C', marginBottom: 16 }}>
                {isUz ? "Savdolar o'sish dinamikasi" : "Динамика роста продаж"}
              </h3>
              <div style={{ height: 180, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, padding: '20px 0 10px' }}>
                {[35, 45, 55, 40, 65, 80, 95].map((val, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: '100%', height: `${val}%`, background: '#7000FF', borderRadius: '4px 4px 0 0', opacity: idx === 6 ? 1 : 0.7 }} />
                    <span style={{ fontSize: 11, color: '#717480' }}>{['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'][idx]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab content: Products */}
        {activeTab === 'products' && (
          <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #ECEEEF' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #ECEEEF' }}>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>ID</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Nomi" : "Название"}</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Narxi" : "Цена"}</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Qoldiq" : "Остаток"}</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Holat" : "Статус"}</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #F4F5F7' }}>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#717480' }}>#{product.id}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: '#1C1C1C' }}>{product.name}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#1C1C1C' }}>{product.price}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#1C1C1C' }}>{product.stock} ta</td>
                    <td style={{ padding: '16px 24px', fontSize: 13 }}>
                      <span style={{
                        background: product.stock > 0 ? '#E2FBE9' : '#FFF0F0',
                        color: product.stock > 0 ? '#10B981' : '#EF4444',
                        padding: '4px 10px', borderRadius: 8, fontWeight: 700
                      }}>{product.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab content: Orders */}
        {activeTab === 'orders' && (
          <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #ECEEEF' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #ECEEEF' }}>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>ID</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Mijoz" : "Покупатель"}</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Sana" : "Дата"}</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Summa" : "Сумма"}</th>
                  <th style={{ padding: '16px 24px', fontSize: 13, color: '#717480', fontWeight: 600 }}>{isUz ? "Holati" : "Статус"}</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #F4F5F7' }}>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#717480' }}>{order.id}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: '#1C1C1C' }}>{order.customer}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#717480' }}>{order.date}</td>
                    <td style={{ padding: '16px 24px', fontSize: 14, color: '#1C1C1C' }}>{order.amount}</td>
                    <td style={{ padding: '16px 24px', fontSize: 13 }}>
                      <span style={{
                        background: order.status === 'Yetkazilmoqda' || order.status === 'Доставляется' ? '#FFF9E6' : order.status === 'Topshirildi' || order.status === 'Выдан' ? '#E2FBE9' : '#FFF0F0',
                        color: order.status === 'Yetkazilmoqda' || order.status === 'Доставляется' ? '#F59E0B' : order.status === 'Topshirildi' || order.status === 'Выдан' ? '#10B981' : '#EF4444',
                        padding: '4px 10px', borderRadius: 8, fontWeight: 700
                      }}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
