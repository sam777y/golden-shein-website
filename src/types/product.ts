
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageData: string; // Base64 encoded image
  category: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "women", name: "ملابس نسائية" },
  { id: "men", name: "ملابس رجالية" },
  { id: "shoes", name: "أحذية" },
  { id: "bags", name: "شنط" },
  { id: "accessories", name: "إكسسوارات" }
];
