
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, ShoppingCart, ExternalLink, Share2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/types/product';

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDialog = ({ product, isOpen, onClose }: ProductDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'تمت الإضافة إلى السلة',
      description: `تمت إضافة ${quantity} من ${product.name} إلى سلة التسوق`,
    });
    onClose();
  };

  const copyProductLink = () => {
    const url = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'تم نسخ الرابط',
        description: 'تم نسخ رابط المنتج بنجاح',
      });
    });
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `تفقد هذا المنتج الرائع: ${product.name}`,
        url: `${window.location.origin}/product/${product.id}`,
      })
      .then(() => {
        toast({
          title: 'تمت المشاركة',
          description: 'تم مشاركة المنتج بنجاح',
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      copyProductLink();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.name}</DialogTitle>
          <DialogDescription className="text-gray-500">
            تفاصيل المنتج
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* صورة المنتج */}
          <div className="flex justify-center">
            <img 
              src={product.imageData} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          
          {/* تفاصيل المنتج */}
          <div className="flex flex-col">
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
              <label htmlFor="quantity-dialog" className="block text-sm font-medium mb-2">الكمية</label>
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
                  id="quantity-dialog"
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
            <div className="flex flex-col gap-3">
              <Button 
                className="bg-amber-600 hover:bg-amber-700 w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                إضافة للسلة
              </Button>
              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline" 
                  onClick={copyProductLink}
                  className="flex-1"
                >
                  <Copy className="ml-2 h-5 w-5" />
                  نسخ الرابط
                </Button>
                <Button 
                  variant="outline" 
                  onClick={shareProduct}
                  className="flex-1"
                >
                  <Share2 className="ml-2 h-5 w-5" />
                  مشاركة
                </Button>
              </div>
              <a 
                href={`https://wa.me/777492635?text=${encodeURIComponent(`أود الاستفسار عن المنتج: ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button 
                  variant="outline" 
                  className="bg-green-600 text-white hover:bg-green-700 w-full"
                >
                  <ExternalLink className="ml-2 h-5 w-5" />
                  استفسر عبر الواتساب
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
