
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-amber-600">أزياء فريدة</span> تناسب ذوقك
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                استكشف أحدث صيحات الموضة بأسعار مناسبة واجعل إطلالتك أكثر تميزًا مع شي إن الذهبي
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  تسوق الآن
                </Button>
                <Button variant="outline" size="lg">
                  العروض الخاصة
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050"
                alt="شي إن الذهبي"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">تسوق حسب الفئة</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <a key={index} href={category.link} className="group">
                <div className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 text-center bg-amber-50 group-hover:bg-amber-100 transition-colors">
                    <h3 className="font-medium text-gray-800">{category.name}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">منتجات مميزة</h2>
          <p className="text-gray-600 text-center mb-8">اكتشف أفضل اختياراتنا من المنتجات المميزة</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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

          <div className="text-center mt-8">
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              عرض المزيد من المنتجات
              <ChevronLeft className="mr-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-amber-50 rounded-lg">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">جودة عالية</h3>
              <p className="text-gray-600">نقدم منتجات ذات جودة عالية وبأسعار مناسبة لجميع العملاء</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-amber-50 rounded-lg">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">خدمة سريعة</h3>
              <p className="text-gray-600">نضمن سرعة التوصيل وخدمة عملاء متميزة على مدار الأسبوع</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-amber-50 rounded-lg">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">طرق دفع آمنة</h3>
              <p className="text-gray-600">نوفر طرق دفع متنوعة وآمنة لضمان راحة العملاء</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Collection Banner */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                <span className="text-amber-500">مجموعة جديدة</span> من الأزياء العصرية
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                اكتشف أحدث تشكيلات الموسم الجديد مع خصومات تصل إلى 30%
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                تسوق الآن
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="مجموعة جديدة"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">آراء العملاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{item.text}</p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

// بيانات وهمية للعرض
const categories = [
  { name: "ملابس نسائية", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3", link: "/products/women" },
  { name: "ملابس رجالية", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22", link: "/products/men" },
  { name: "أحذية", image: "https://images.unsplash.com/photo-1560343090-f0409e92791a", link: "/products/shoes" },
  { name: "شنط", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7", link: "/products/bags" },
  { name: "إكسسوارات", image: "https://images.unsplash.com/photo-1620456456327-664a18aa5360", link: "/products/accessories" },
];

const featuredProducts = [
  { 
    name: "فستان كلاسيكي", 
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956", 
    price: 8500, 
    oldPrice: 9800, 
    discount: 15 
  },
  { 
    name: "قميص رجالي", 
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388", 
    price: 5500
  },
  { 
    name: "حذاء رياضي", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", 
    price: 7200, 
    oldPrice: 8500, 
    discount: 20 
  },
  { 
    name: "حقيبة يد نسائية", 
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa", 
    price: 6300
  },
  { 
    name: "بنطلون جينز", 
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", 
    price: 7000, 
    discount: 10, 
    oldPrice: 7800 
  },
  { 
    name: "طقم إكسسوارات", 
    image: "https://images.unsplash.com/photo-1575223970966-76ae61ee7838", 
    price: 4500
  },
  { 
    name: "كنزة شتوية", 
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2", 
    price: 6800, 
    oldPrice: 7500, 
    discount: 10 
  },
  { 
    name: "ساعة يد", 
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d", 
    price: 12000
  },
];

const testimonials = [
  {
    name: "سارة أحمد",
    text: "استمتعت بالتسوق من شي إن الذهبي، المنتجات ذات جودة عالية والخدمة ممتازة!"
  },
  {
    name: "محمد علي",
    text: "أنصح بالتعامل مع شي إن الذهبي، أسعار معقولة ومنتجات متنوعة تناسب الجميع."
  },
  {
    name: "فاطمة حسن",
    text: "تعاملت معهم أكثر من مرة، خدمة سريعة والمنتجات مطابقة للصور تمامًا."
  }
];

export default Home;
