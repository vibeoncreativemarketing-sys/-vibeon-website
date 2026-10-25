export type Currency = "USD" | "AMD";

export type PackageDTO = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceUsd: number;
  priceAmd: number;
  billingCycle: string;
  features: string[];
  highlighted: boolean;
  sortOrder: number;
};

export type CartItem = {
  packageId: number;
  slug: string;
  name: string;
  quantity: number;
  priceUsd: number;
  priceAmd: number;
  billingCycle: string;
};

export type OrderPayload = {
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  currency: Currency;
  notes?: string;
  items: { packageId: number; quantity: number }[];
};
