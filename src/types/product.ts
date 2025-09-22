export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // السعر الأصلي قبل الخصم
  image?: string; // Image URL أو Base64 (optional for backward compatibility)
  imageData?: string; // Base64 encoded image (backward compatibility)
  additionalImages?: string[]; // Additional images for the product
  category: string;
  createdAt?: number;
  inStock?: boolean;
  isOffer?: boolean; // لتحديد ما إذا كان المنتج عرضاً خاصاً
  oldPrice?: number; // السعر القديم قبل الخصم (deprecated, use originalPrice)
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
  image?: string; // Image URL أو Base64
  imageData?: string; // Base64 encoded image for category (backward compatibility)
  parentId?: string; // For subcategories
  children?: Category[]; // For storing subcategories
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "women", name: "ملابس نسائية", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop" },
  { id: "men", name: "ملابس رجالية", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=300&fit=crop" },
  { id: "shoes", name: "أحذية", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop" },
  { id: "bags", name: "شنط", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop" },
  { id: "accessories", name: "إكسسوارات", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop" }
];
