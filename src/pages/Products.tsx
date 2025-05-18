
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, ChevronDown } from "lucide-react";
import { Product } from "@/types/product";

const categoryTitles = {
  women: "ملابس نسائية",
  men: "ملابس رجالية",
  shoes: "أحذية",
  bags: "شنط",
  accessories: "إكسسوارات"
};

const Products = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [searchQuery, setSearchQuery] = useState("");

  // تحميل المنتجات من localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const allProducts = JSON.parse(storedProducts);
        
        // إذا كانت هناك فئة محددة، قم بتصفية المنتجات حسب الفئة
        if (category) {
          const filteredByCategory = allProducts.filter((product: Product) => 
            product.category === category
          );
          setProducts(filteredByCategory);
        } else {
          // إذا لم تكن هناك فئة محددة، اعرض جميع المنتجات
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error parsing products from localStorage", error);
        setProducts([]);
      }
    }
  }, [category]);

  // تصفية المنتجات حسب السعر والبحث
  const filterProducts = () => {
    if (!products.length) return [];
    
    return products.filter(product => {
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesSearch = searchQuery 
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      return matchesPrice && matchesSearch;
    });
  };

  // ترتيب المنتجات
  const sortProducts = (productsToSort: Product[]) => {
    switch (sortBy) {
      case "price-asc":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return productsToSort;
    }
  };

  // الحصول على المنتجات المصفاة والمرتبة
  const filteredAndSortedProducts = sortProducts(filterProducts());

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({ ...prev, [type]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
              
              {/* Search Input */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">بحث</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="ابحث عن منتج..."
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
              
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
                  {/* Search Input - Mobile */}
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">بحث</h3>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="ابحث عن منتج..."
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </div>
                  
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
                          src={product.imageData} 
                          alt={product.name} 
                          className="w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-amber-600 font-bold">{product.price} ريال</span>
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
                  <p className="text-lg text-gray-600">لا توجد منتجات متاحة{searchQuery ? " تطابق البحث" : ""}</p>
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
