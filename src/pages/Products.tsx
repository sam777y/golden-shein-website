
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, ChevronDown } from "lucide-react";

// بيانات وهمية للمنتجات لكل فئة
const productsData = {
  women: [
    { 
      id: 1, 
      name: "فستان كلاسيكي", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 8500, 
      oldPrice: 9800, 
      discount: 15,
      category: "women"
    },
    { 
      id: 2, 
      name: "بلوزة نسائية أنيقة", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 5500,
      category: "women"
    },
    { 
      id: 3, 
      name: "تنورة مطبعة", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 6200,
      oldPrice: 7000,
      discount: 12,
      category: "women"
    },
    { 
      id: 4, 
      name: "بنطلون جينز نسائي", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 7500,
      category: "women"
    },
    { 
      id: 5, 
      name: "جاكيت نسائي", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 9800,
      oldPrice: 11000,
      discount: 10,
      category: "women"
    },
    { 
      id: 6, 
      name: "كنزة شتوية نسائية", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 6800,
      category: "women"
    },
  ],
  men: [
    { 
      id: 7, 
      name: "قميص رجالي كلاسيكي", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
      price: 5500,
      category: "men"
    },
    { 
      id: 8, 
      name: "بنطلون جينز رجالي", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
      price: 7000,
      discount: 10,
      oldPrice: 7800,
      category: "men"
    },
    { 
      id: 9, 
      name: "تيشيرت رجالي", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
      price: 4200,
      category: "men"
    },
    { 
      id: 10, 
      name: "جاكيت رجالي", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
      price: 8500,
      oldPrice: 9500,
      discount: 10,
      category: "men"
    },
    { 
      id: 11, 
      name: "بدلة رسمية", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
      price: 15000,
      category: "men"
    },
  ],
  shoes: [
    { 
      id: 12, 
      name: "حذاء رياضي", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22", 
      price: 7200,
      oldPrice: 8500,
      discount: 20,
      category: "shoes"
    },
    { 
      id: 13, 
      name: "حذاء كلاسيكي", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22", 
      price: 8800,
      category: "shoes"
    },
    { 
      id: 14, 
      name: "صندل نسائي", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22", 
      price: 5400,
      category: "shoes"
    },
  ],
  bags: [
    { 
      id: 15, 
      name: "حقيبة يد نسائية", 
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      price: 6300,
      category: "bags"
    },
    { 
      id: 16, 
      name: "حقيبة كتف", 
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      price: 5800,
      oldPrice: 6500,
      discount: 10,
      category: "bags"
    },
    { 
      id: 17, 
      name: "حقيبة ظهر", 
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      price: 7200,
      category: "bags"
    },
  ],
  accessories: [
    { 
      id: 18, 
      name: "طقم إكسسوارات", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 4500,
      category: "accessories"
    },
    { 
      id: 19, 
      name: "ساعة يد", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22", 
      price: 12000,
      category: "accessories"
    },
    { 
      id: 20, 
      name: "سلسلة ذهبية", 
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
      price: 15000,
      oldPrice: 16000,
      discount: 6,
      category: "accessories"
    },
  ]
};

const categoryTitles = {
  women: "ملابس نسائية",
  men: "ملابس رجالية",
  shoes: "أحذية",
  bags: "شنط",
  accessories: "إكسسوارات"
};

const Products = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });

  // تحميل المنتجات بناءً على الفئة
  useEffect(() => {
    if (category && productsData[category as keyof typeof productsData]) {
      setProducts(productsData[category as keyof typeof productsData]);
    } else {
      // إذا كان يجب عرض جميع المنتجات
      const allProducts = Object.values(productsData).flat();
      setProducts(allProducts);
    }
  }, [category]);

  // تصفية المنتجات حسب السعر
  const filterProductsByPrice = () => {
    return products.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
  };

  // ترتيب المنتجات
  const sortProducts = (productsToSort: any[]) => {
    switch (sortBy) {
      case "price-asc":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case "discount":
        return [...productsToSort].sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return productsToSort;
    }
  };

  // الحصول على المنتجات المصفاة والمرتبة
  const filteredAndSortedProducts = sortProducts(filterProductsByPrice());

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({ ...prev, [type]: value }));
  };

  return (
    <Layout>
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {category ? categoryTitles[category as keyof typeof categoryTitles] : "جميع المنتجات"}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-sm h-fit sticky top-24">
              <h2 className="text-lg font-semibold mb-4">التصفية</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">السعر</h3>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-600">الحد الأدنى:</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange(e, 'min')}
                      className="w-24 p-2 border border-gray-200 rounded text-left"
                      min="0"
                      max={priceRange.max}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-600">الحد الأقصى:</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceRangeChange(e, 'max')}
                      className="w-24 p-2 border border-gray-200 rounded text-left"
                      min={priceRange.min}
                    />
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">الترتيب</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded"
                >
                  <option value="default">الافتراضي</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="name-asc">الاسم: أ-ي</option>
                  <option value="discount">الخصم: من الأعلى للأقل</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Filters Button */}
            <div className="md:hidden mb-4">
              <Button
                onClick={toggleFilters}
                variant="outline"
                className="w-full flex justify-between items-center"
              >
                <span>التصفية والترتيب</span>
                <Filter className="h-5 w-5" />
              </Button>
              
              {isFiltersOpen && (
                <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">السعر</h3>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-600">الحد الأدنى:</span>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => handlePriceRangeChange(e, 'min')}
                          className="w-24 p-2 border border-gray-200 rounded text-left"
                          min="0"
                          max={priceRange.max}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-600">الحد الأقصى:</span>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => handlePriceRangeChange(e, 'max')}
                          className="w-24 p-2 border border-gray-200 rounded text-left"
                          min={priceRange.min}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">الترتيب</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded"
                    >
                      <option value="default">الافتراضي</option>
                      <option value="price-asc">السعر: من الأقل للأعلى</option>
                      <option value="price-desc">السعر: من الأعلى للأقل</option>
                      <option value="name-asc">الاسم: أ-ي</option>
                      <option value="discount">الخصم: من الأعلى للأقل</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAndSortedProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
                        />
                        {product.discount && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            خصم {product.discount}%
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-amber-600 font-bold">{product.price} ريال</span>
                            {product.oldPrice && (
                              <span className="text-gray-500 text-sm line-through mr-2">{product.oldPrice} ريال</span>
                            )}
                          </div>
                          <Button variant="ghost" size="icon" className="text-amber-600">
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg text-center">
                  <p className="text-lg text-gray-600">لا توجد منتجات متاحة بناءً على المعايير المحددة</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
