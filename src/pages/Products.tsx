import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product, Category, DEFAULT_CATEGORIES } from '@/types/product';
import { useCart } from '@/hooks/use-cart';
import { Search, ShoppingCart } from 'lucide-react';
import ProductDialog from '@/components/product/ProductDialog';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(category);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // State for product dialog
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
    }

    // Load categories from localStorage
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setCategories([...DEFAULT_CATEGORIES, ...parsedCategories]);
    }
  }, []);

  // Update selectedCategory when category param changes
  useEffect(() => {
    if (category) {
      // التحقق من وجود الفئة في القائمة
      const categoryExists = categories.some(cat => cat.id === category);
      if (categoryExists) {
        setSelectedCategory(category);
      } else {
        // إذا كانت الفئة غير موجودة، إعادة توجيه إلى صفحة المنتجات العامة
        console.warn(`Category "${category}" not found, redirecting to products page`);
        navigate('/products', { replace: true });
        return;
      }
    } else {
      setSelectedCategory(undefined);
    }
  }, [category, categories, navigate]);

  // Filter products whenever dependencies change
  useEffect(() => {
    filterProducts(products, selectedCategory, searchQuery);
  }, [products, selectedCategory, searchQuery]);

  // Filter products by category and search query
  const filterProducts = (allProducts: Product[], categoryId?: string, query: string = '') => {
    let filtered = [...allProducts];

    // Filter by category
    if (categoryId) {
      filtered = filtered.filter(product => product.category === categoryId);
    }

    // Filter by search query
    if (query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(lowerQuery) || 
          product.description.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    const newCategory = categoryId === selectedCategory ? undefined : categoryId;
    setSelectedCategory(newCategory);
    
    // Update URL
    if (newCategory) {
      navigate(`/products/${newCategory}`, { replace: true });
    } else {
      navigate('/products', { replace: true });
    }
  };

  // Get current category name for display
  const getCurrentCategoryName = () => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      return category?.name || selectedCategory;
    }
    return null;
  };

  // Open product dialog
  const openProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  // Close product dialog
  const closeProductDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  // Add product to cart
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: 'تمت الإضافة إلى السلة',
      description: `تمت إضافة ${product.name} إلى سلة التسوق`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">المنتجات</h1>
          {getCurrentCategoryName() && (
            <p className="text-lg text-gray-600">فئة: {getCurrentCategoryName()}</p>
          )}
        </div>
        
        {/* Search bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="البحث عن منتج..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        {/* Categories filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={selectedCategory === cat.id ? "bg-amber-600 hover:bg-amber-700" : ""}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
        
        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
                onClick={() => openProductDialog(product)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.imageData} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-lg">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      {product.oldPrice ? (
                        <div className="flex flex-col">
                          <span className="text-amber-600 font-bold">{product.price} ريال</span>
                          <span className="text-gray-500 text-sm line-through">{product.oldPrice} ريال</span>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-bold">{product.price} ريال</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {product.discount && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          خصم {product.discount}%
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedCategory 
                ? `لم يتم العثور على منتجات في فئة "${getCurrentCategoryName()}"`
                : "لم يتم العثور على منتجات"
              }
            </p>
            {selectedCategory && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleCategoryChange('')}
              >
                عرض جميع المنتجات
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Product Dialog */}
      <ProductDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={closeProductDialog}
      />
    </Layout>
  );
};

export default Products;
