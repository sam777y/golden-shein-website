
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Product } from '@/types/product';
import ProductDialog from '@/components/product/ProductDialog';

const Offers = () => {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  
  // State for product dialog
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // تحميل المنتجات من localStorage
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          const products: Product[] = JSON.parse(storedProducts);
          // تصفية المنتجات التي تحتوي على عروض فقط
          const offers = products.filter(p => p.isOffer === true);
          setOfferProducts(offers);
        }
      } catch (error) {
        console.error('Error loading offers:', error);
      }
    };
    
    loadProducts();
  }, []);
  
  // فتح نافذة تفاصيل المنتج
  const openProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  
  // إغلاق نافذة تفاصيل المنتج
  const closeProductDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">العروض الخاصة</h1>
        
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openProductDialog(product)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.imageData} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      خصم {product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-lg">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-amber-600 font-bold">{product.price} ريال</span>
                      {product.oldPrice && (
                        <span className="text-gray-500 text-sm line-through">{product.oldPrice} ريال</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد عروض خاصة متاحة حالياً</p>
          </div>
        )}
      </div>
      
      {/* نافذة تفاصيل المنتج */}
      <ProductDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={closeProductDialog}
      />
    </Layout>
  );
};

export default Offers;
