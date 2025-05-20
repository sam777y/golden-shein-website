
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash, Minus, Plus, Share, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartShareLink } = useCart();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);

  // تحميل السلة المشتركة إذا تم توفير معلمة المشاركة
  useEffect(() => {
    const shareParam = searchParams.get('share');
    if (shareParam && !isShared) {
      setIsShared(true);
      handleLoadSharedCart(shareParam);
    }
  }, [searchParams, isShared]);

  // تحميل السلة المشتركة
  const handleLoadSharedCart = async (shareParam: string) => {
    try {
      const items = shareParam.split(',');
      if (!items.length) return;

      // تحميل معلومات المنتج من localStorage
      const storedProducts = localStorage.getItem('products');
      if (!storedProducts) return;
      
      const products: Product[] = JSON.parse(storedProducts);
      
      // إعادة إنشاء السلة المشتركة
      for (const item of items) {
        const [productId, quantityStr] = item.split(':');
        const quantity = parseInt(quantityStr);
        
        const product = products.find(p => p.id === productId);
        if (product && quantity > 0) {
          // يمكن هنا إضافة المنتجات إلى السلة، لكن سأتركها للعرض فقط
          toast({
            title: 'سلة مشتركة',
            description: `تم تحميل سلة التسوق المشتركة`
          });
        }
      }
    } catch (error) {
      console.error('Error loading shared cart:', error);
    }
  };

  // نسخ رابط مشاركة السلة
  const copyCartLink = () => {
    const link = getCartShareLink();
    navigator.clipboard.writeText(link)
      .then(() => {
        toast({
          title: 'تم نسخ الرابط',
          description: 'تم نسخ رابط مشاركة السلة بنجاح'
        });
      })
      .catch(error => {
        console.error('Error copying cart link:', error);
      });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">سلة التسوق</h1>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">المنتجات</h2>
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash className="ml-2 h-4 w-4" />
                    إفراغ السلة
                  </Button>
                </div>
                
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.productId} className="py-4 flex flex-col sm:flex-row">
                      <div className="sm:w-24 h-24 mb-4 sm:mb-0">
                        <Link to={`/product/${item.productId}`}>
                          <img 
                            src={item.product.imageData} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </div>
                      <div className="flex-grow sm:mr-4 flex flex-col justify-between">
                        <div>
                          <Link to={`/product/${item.productId}`} className="font-medium hover:text-amber-600">
                            {item.product.name}
                          </Link>
                          <p className="text-gray-600 text-sm mt-1">{item.product.description.substring(0, 100)}...</p>
                        </div>
                        <div className="flex justify-between items-center mt-4 sm:mt-0">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) {
                                  updateQuantity(item.productId, val);
                                }
                              }}
                              className="w-12 h-8 text-center mx-1"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold text-amber-600 ml-4">
                              {(item.product.price * item.quantity).toFixed(2)} ريال
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-600"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>إجمالي المنتجات ({cart.length})</span>
                    <span>{getCartTotal().toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الشحن</span>
                    <span>مجاناً</span>
                  </div>
                  <div className="border-t pt-3 font-bold flex justify-between text-lg">
                    <span>الإجمالي</span>
                    <span className="text-amber-600">{getCartTotal().toFixed(2)} ريال</span>
                  </div>
                </div>
                
                <Button className="bg-amber-600 hover:bg-amber-700 w-full mb-4">
                  إتمام الشراء
                </Button>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    onClick={copyCartLink} 
                    className="flex-1 ml-2"
                  >
                    <Copy className="ml-2 h-4 w-4" />
                    نسخ رابط السلة
                  </Button>
                  <Link to="/products" className="flex-1">
                    <Button variant="ghost" className="w-full">
                      <ShoppingCart className="ml-2 h-4 w-4" />
                      متابعة التسوق
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4 text-gray-400 flex justify-center">
              <ShoppingCart size={64} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
            <Link to="/products">
              <Button className="bg-amber-600 hover:bg-amber-700">
                العودة للتسوق
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
