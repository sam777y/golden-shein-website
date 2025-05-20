
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './use-toast';
import { CartItem, Product } from '@/types/product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getCartShareLink: () => string;
  getItemShareLink: (productId: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // تحميل سلة التسوق من localStorage عند بدء التشغيل
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // التحقق من صحة المنتجات في السلة
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          const allProducts: Product[] = JSON.parse(storedProducts);
          
          // تحديث معلومات المنتجات في السلة من قاعدة البيانات الحالية
          const updatedCart = parsedCart.map((item: CartItem) => {
            const currentProduct = allProducts.find(p => p.id === item.productId);
            if (currentProduct) {
              return { 
                ...item, 
                product: currentProduct 
              };
            }
            return null;
          }).filter(Boolean);
          
          setCart(updatedCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // حفظ سلة التسوق في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // إضافة منتج للسلة
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      // التحقق من وجود المنتج في السلة بالفعل
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        // إذا كان المنتج موجودًا بالفعل، قم بتحديث الكمية
        return prevCart.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity, product } 
            : item
        );
      } else {
        // إذا لم يكن المنتج موجودًا، أضفه إلى السلة
        return [...prevCart, { productId: product.id, quantity, product }];
      }
    });
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    
    toast({
      title: "تمت إزالة المنتج",
      description: "تمت إزالة المنتج من سلة التسوق"
    });
  };

  // تحديث كمية منتج في السلة
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // تفريغ السلة
  const clearCart = () => {
    setCart([]);
    toast({
      title: "تم تفريغ السلة",
      description: "تمت إزالة جميع المنتجات من سلة التسوق"
    });
  };

  // حساب إجمالي السلة
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // حساب عدد المنتجات في السلة
  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // إنشاء رابط مشاركة للسلة الكاملة
  const getCartShareLink = () => {
    const baseUrl = window.location.origin;
    const cartItems = cart.map(item => `${item.productId}:${item.quantity}`).join(',');
    return `${baseUrl}/cart?share=${encodeURIComponent(cartItems)}`;
  };

  // إنشاء رابط مشاركة لمنتج محدد
  const getItemShareLink = (productId: string) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/product/${productId}`;
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        getCartShareLink,
        getItemShareLink
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
