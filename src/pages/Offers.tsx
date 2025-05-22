
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Product } from '@/types/product';
import ProductDialog from '@/components/product/ProductDialog';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>العروض الخاصة | شي إن الذهبي</title>
        <meta name="description" content="استفد من العروض والخصومات الخاصة على منتجات شي إن الذهبي. أحدث الأزياء والإكسسوارات بأسعار لا تقاوم!" />
        <meta name="keywords" content="عروض خاصة, تخفيضات, خصومات, أزياء بسعر مخفض, ملابس مخفضة, شي إن الذهبي" />
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-amber-800">العروض الخاصة</h1>
        <h2 className="text-xl mb-8 text-gray-600">وفر أكثر مع أفضل خصوماتنا وأحدث العروض</h2>
        
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
                onClick={() => openProductDialog(product)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.imageData} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    loading="lazy" // تحسين الأداء
                  />
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
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
                    <button 
                      className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductDialog(product);
                      }}
                    >
                      عرض المنتج
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-amber-50 rounded-lg">
            <p className="text-gray-500 text-lg">لا توجد عروض خاصة متاحة حالياً</p>
            <p className="text-amber-600">تابعنا قريباً للعروض الجديدة</p>
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
