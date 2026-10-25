"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Currency, PackageDTO } from "@/lib/types";

const CART_KEY = "vibeon-cart";
const CURRENCY_KEY = "vibeon-currency";

type Toast = { id: number; message: string } | null;

type CartContextValue = {
  items: CartItem[];
  currency: Currency;
  hydrated: boolean;
  toast: Toast;
  itemCount: number;
  totalUsd: number;
  totalAmd: number;
  setCurrency: (currency: Currency) => void;
  addItem: (pkg: PackageDTO, quantity?: number) => void;
  removeItem: (packageId: number) => void;
  setQuantity: (packageId: number, quantity: number) => void;
  clear: () => void;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readCurrency(): Currency {
  try {
    const raw = localStorage.getItem(CURRENCY_KEY);
    return raw === "USD" ? "USD" : "AMD";
  } catch {
    return "AMD";
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<Currency>("AMD");
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    setItems(readCart());
    setCurrencyState(readCurrency());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency, hydrated]);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
  }, []);

  const addItem = useCallback((pkg: PackageDTO, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.packageId === pkg.id);
      const next = existing
        ? prev.map((item) =>
            item.packageId === pkg.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [
            ...prev,
            {
              packageId: pkg.id,
              slug: pkg.slug,
              name: pkg.name,
              quantity,
              priceUsd: pkg.priceUsd,
              priceAmd: pkg.priceAmd,
              billingCycle: pkg.billingCycle,
            },
          ];
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota errors */
      }
      return next;
    });
    setToast({ id: Date.now(), message: `${pkg.name} added to cart` });
  }, []);

  const removeItem = useCallback((packageId: number) => {
    setItems((prev) => prev.filter((item) => item.packageId !== packageId));
  }, []);

  const setQuantity = useCallback((packageId: number, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.packageId !== packageId);
      return prev.map((item) =>
        item.packageId === packageId ? { ...item, quantity } : item,
      );
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalUsd = items.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
    const totalAmd = items.reduce((sum, item) => sum + item.priceAmd * item.quantity, 0);
    return {
      items,
      currency,
      hydrated,
      toast,
      itemCount,
      totalUsd,
      totalAmd,
      setCurrency,
      addItem,
      removeItem,
      setQuantity,
      clear,
      dismissToast,
    };
  }, [
    items,
    currency,
    hydrated,
    toast,
    setCurrency,
    addItem,
    removeItem,
    setQuantity,
    clear,
    dismissToast,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
