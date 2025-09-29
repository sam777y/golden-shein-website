import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Star, Truck, Shield, Clock, Gift, ArrowLeft, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Product, Category } from '@/types/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Default categories
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'women', name: 'ملابس نسائية', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop' },
  { id: 'men', name: 'ملابس رجالية', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=300&fit=crop' },
  { id: 'shoes', name: 'أحذية', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' },
  { id: 'bags', name: 'شنط', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' },
  { id: 'accessories', name: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop' },
];

const Home = () => {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [products, setProducts] = useState<Product[]>([]);
  const [sliderProducts, setSliderProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load categories from localStorage
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        setCategories([...DEFAULT_CATEGORIES, ...parsedCategories]);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

    // Load products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        
        // Get latest 6 products for slider
        const latest = [...parsedProducts]
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          .slice(0, 6);
        setSliderProducts(latest);
        
        // Get featured products
        const featured = parsedProducts.filter((p: Product) => p.featured);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }, []);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a mock product for demo
    const mockProduct: Product = {
      ...product,
      id: product.id || Date.now().toString(),
      description: product.description || 'منتج رائع',
      inStock: true,
    };
    
    addToCart(mockProduct, 1);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${product.name} إلى سلة التسوق`
    });
  };

  return (
    <Layout>
      <SEO 
        title="شي إن الذهبي - أفضل متجر للموضة والأناقة"
        description="اكتشف مجموعتنا الحصرية من الملابس والإكسسوارات العصرية. جودة عالية، أسعار منافسة، وتوصيل سريع في جميع أنحاء المملكة."
        keywords="ملابس, موضة, أناقة, شي إن الذهبي, تسوق اونلاين, ملابس نسائية, ملابس رجالية, أحذية, شنط, إكسسوارات"
      />
      
      {/* Product Slider Section */}
      {sliderProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {sliderProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={product.imageData}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {product.discount && (
                            <Badge className="absolute top-2 right-2 bg-destructive">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold text-primary">
                              {product.price} ر.س
                            </span>
                            {product.oldPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.oldPrice} ر.س
                              </span>
                            )}
                          </div>
                          <Button 
                            className="w-full"
                            size="sm"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            أضف للسلة
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">تسوق حسب الفئة</h2>
            <p className="text-muted-foreground">اختر من مجموعتنا الواسعة من المنتجات</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <h3 className="text-white font-bold text-lg p-4 w-full text-center">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary font-semibold">
                  🏆 الأول في الموضة والأناقة
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  شي إن الذهبي
                  <span className="block text-primary">للموضة والأناقة</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  اكتشف مجموعتنا الحصرية من الملابس والإكسسوارات العصرية. جودة عالية، أسعار منافسة، وتوصيل سريع.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                  onClick={() => navigate('/products')}
                >
                  <ShoppingBag className="w-5 h-5 ml-2" />
                  تسوق الآن
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/offers')}>
                  <Gift className="w-5 h-5 ml-2" />
                  العروض الخاصة
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">منتج متنوع</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">خدمة العملاء</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99%</div>
                  <div className="text-sm text-muted-foreground">رضا العملاء</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
                  alt="Hero Image"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">منتجات مميزة</h2>
                <p className="text-muted-foreground">اختيارات خاصة من فريقنا</p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="group">
                  عرض الكل
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.imageData}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-destructive">
                        -{product.discount}%
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">
                        {product.price} ر.س
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice} ر.س
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                      <span className="text-sm text-muted-foreground mr-2">(125)</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      أضف للسلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">اشترك في النشرة الإخبارية</h2>
            <p className="text-muted-foreground mb-8">
              احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="flex-1 px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="px-8">اشتراك</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-background/80">
              <CardContent className="pt-6">
                <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">توصيل مجاني</h3>
                <p className="text-sm text-muted-foreground">توصيل مجاني للطلبات أكثر من 100 ريال</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-background/80">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">ضمان الجودة</h3>
                <p className="text-sm text-muted-foreground">ضمان استرداد خلال 30 يوم</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-background/80">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">خدمة 24/7</h3>
                <p className="text-sm text-muted-foreground">دعم العملاء على مدار الساعة</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-background/80">
              <CardContent className="pt-6">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">عروض حصرية</h3>
                <p className="text-sm text-muted-foreground">خصومات وعروض دورية</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;