'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/lib/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = state.items.map(i =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + (action.quantity || 1) }
            : i
        );
      } else {
        newItems = [...state.items, { product: action.product, quantity: action.quantity || 1 }];
      }
      const total = newItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, total, itemCount };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(i => i.product.id !== action.productId);
      const total = newItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, total, itemCount };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const newItems = state.items.filter(i => i.product.id !== action.productId);
        const total = newItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
        const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
        return { items: newItems, total, itemCount };
      }
      const newItems = state.items.map(i =>
        i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
      );
      const total = newItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const itemCount = newItems.reduce((sum, i) => sum + i.quantity, 0);
      return { items: newItems, total, itemCount };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    case 'LOAD_CART': {
      const total = action.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const itemCount = action.items.reduce((sum, i) => sum + i.quantity, 0);
      return { items: action.items, total, itemCount };
    }
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('uzum_cart');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', items });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('uzum_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', product, quantity });

  const removeItem = (productId: number) =>
    dispatch({ type: 'REMOVE_ITEM', productId });

  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const isInCart = (productId: number) =>
    state.items.some(i => i.product.id === productId);

  const getItemQuantity = (productId: number) =>
    state.items.find(i => i.product.id === productId)?.quantity || 0;

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, isInCart, getItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
