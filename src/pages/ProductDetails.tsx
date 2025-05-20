
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, ShoppingCart, Share } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    // تحميل المنتج من localStorage
    const loadProduct = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          const products: Product[] = JSON.parse(storedProducts);
          const foundProduct = products.find(p => p.id === productId);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            navigate('/products');
          }
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/products');
      }
    };

    loadProduct();
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: 'تمت الإضافة إلى السلة',
        description: `تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`,
      });
      navigate('/cart');
    }
  };

  const copyProductLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'تم نسخ الرابط',
        description: 'تم نسخ رابط المنتج بنجاح',
      });
    });
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">جاري تحميل المنتج...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* صورة المنتج */}
            <div className="flex justify-center">
              <img 
                src={product.imageData} 
                alt={product.name} 
                className="w-full max-w-md h-auto object-cover rounded-lg"
              />
            </div>
            
            {/* تفاصيل المنتج */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              
              {/* السعر والخصم إذا كان عرضاً */}
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-amber-600">{product.price} ريال</span>
                {product.oldPrice && (
                  <span className="text-gray-500 text-lg line-through mr-3">{product.oldPrice} ريال</span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                    خصم {product.discount}%
                  </span>
                )}
              </div>
              
              {/* وصف المنتج */}
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* اختيار الكمية */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">الكمية</label>
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Input 
                    type="number" 
                    id="quantity"
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center mx-2" 
                    min="1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              {/* أزرار الإجراءات */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  إضافة للسلة والذهاب إليها
                </Button>
                <Button 
                  variant="outline" 
                  onClick={copyProductLink}
                >
                  <Copy className="ml-2 h-5 w-5" />
                  نسخ الرابط
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 w-full mt-2"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  شراء الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* نموذج إتمام الطلب */}
        <CheckoutForm 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      </div>
    </Layout>
  );
};

export default ProductDetails;
