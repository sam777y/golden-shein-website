
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock, Search } from "lucide-react";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

const Offers = () => {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  // تحميل منتجات العروض من localStorage
  useEffect(() => {
    const loadOffers = () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        try {
          const allProducts: Product[] = JSON.parse(storedProducts);
          // تصفية المنتجات حسب خاصية isOffer أو وجود خصم
          const offers = allProducts.filter(
            (product) => product.isOffer || product.discount
          );
          setOfferProducts(offers);
        } catch (error) {
          console.error("Error loading offer products:", error);
        }
      }
    };

    loadOffers();
  }, []);

  // إضافة منتج إلى سلة التسوق
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة التسوق`,
    });
  };

  // تصفية المنتجات حسب البحث
  const filteredProducts = offerProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-center">العروض والخصومات</h1>
          <p className="text-gray-600 text-center mb-8">اكتشف أفضل العروض والخصومات المتاحة الآن</p>

          {/* البحث في العروض */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث في العروض..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {/* Flash Sale Banner */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-6 rounded-lg mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">عرض محدود ⚡</h2>
                <p className="text-lg">خصم يصل إلى 50% على الملابس الشتوية</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6" />
                <div className="text-lg font-bold">
                  ينتهي العرض خلال: 2 يوم، 5 ساعات
                </div>
              </div>
            </div>
          </div>

          {/* عرض المنتجات */}
          <h2 className="text-2xl font-bold mb-6">منتجات العروض</h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.imageData}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
                      />
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          خصم {product.discount}%
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-amber-600 font-bold">{product.price} ريال</span>
                        {product.oldPrice && (
                          <span className="text-gray-500 text-sm line-through mr-2">{product.oldPrice} ريال</span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-amber-600"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center mb-10">
              <p className="text-lg text-gray-600">
                لا توجد عروض متاحة حالياً
                {searchQuery ? " تطابق البحث" : ""}
              </p>
            </div>
          )}

          {/* عرض اشتراك النشرة البريدية */}
          <div className="bg-gray-900 text-white p-6 rounded-lg mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-right">
                <h2 className="text-2xl font-bold mb-2">احصل على العروض أولاً!</h2>
                <p className="text-lg text-gray-300">اشترك في نشرتنا البريدية واحصل على خصم 10% على أول طلب</p>
              </div>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-lg">
                اشترك الآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Offers;
