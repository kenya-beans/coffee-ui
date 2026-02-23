import React, { createContext, useContext, useState, useEffect } from 'react';

export type CoffeeProduct = {
  id: string;
  name: string;
  price: number;
  region: string;
  roastLevel: string;
  image: string;
  description: string;
  process: string;
  elevation: string;
  notes: string[];
  stock: number;
};

export type CartItem = CoffeeProduct & {
  quantity: number;
  bagSize: string;
};

type AppContextType = {
  cart: CartItem[];
  addToCart: (product: CoffeeProduct, quantity: number, bagSize: string) => void;
  removeFromCart: (id: string, bagSize: string) => void;
  updateQuantity: (id: string, bagSize: string, delta: number) => void;
  clearCart: () => void;
  role: 'customer' | 'admin';
  setRole: (role: 'customer' | 'admin') => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  const addToCart = (product: CoffeeProduct, quantity: number, bagSize: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.bagSize === bagSize);
      if (existingItem) {
        return prev.map(item =>
          (item.id === product.id && item.bagSize === bagSize)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, bagSize }];
    });
  };

  const removeFromCart = (id: string, bagSize: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.bagSize === bagSize)));
  };

  const updateQuantity = (id: string, bagSize: string, delta: number) => {
    setCart(prev => prev.map(item =>
      (item.id === id && item.bagSize === bagSize)
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
