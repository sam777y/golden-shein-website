export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageData: string; // Base64 encoded image
  additionalImages?: string[]; // Additional images for the product
  category: string;
  createdAt: number;
  isOffer?: boolean; // لتحديد ما إذا كان المنتج عرضاً خاصاً
  oldPrice?: number; // السعر القديم قبل الخصم
  discount?: number; // نسبة الخصم
  quantity?: number; // كمية المنتج المتاحة
  dimensions?: {
    length?: number; // الطول
    width?: number; // العرض
    height?: number; // الارتفاع
  };
  sizes?: string[]; // المقاسات المتاحة
}

export interface Category {
  id: string;
  name: string;
  imageData?: string; // Base64 encoded image for category
  parentId?: string; // For subcategories
  children?: Category[]; // For storing subcategories
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "women", name: "ملابس نسائية" },
  { id: "men", name: "ملابس رجالية" },
  { id: "shoes", name: "أحذية" },
  { id: "bags", name: "شنط" },
  { id: "accessories", name: "إكسسوارات" }
];
