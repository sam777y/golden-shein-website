
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock } from "lucide-react";

const Offers = () => {
  return (
    <Layout>
      <div className="bg-amber-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-center">العروض والخصومات</h1>
          <p className="text-gray-600 text-center mb-8">اكتشف أفضل العروض والخصومات المتاحة الآن</p>

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

          {/* Weekly Deals */}
          <h2 className="text-2xl font-bold mb-6">عروض الأسبوع</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {weeklyDeals.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    خصم {product.discount}%
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-amber-600 font-bold">{product.price} ريال</span>
                      <span className="text-gray-500 text-sm line-through mr-2">{product.oldPrice} ريال</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-amber-600">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Special Offers */}
          <h2 className="text-2xl font-bold mb-6">عروض خاصة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="ملابس نسائية" 
                className="w-full h-72 object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">ملابس نسائية</h3>
                <p className="text-white text-lg mb-4">خصم 30% على الملابس النسائية الجديدة</p>
                <Button className="bg-white text-amber-600 hover:bg-gray-100">تسوق الآن</Button>
              </div>
            </div>
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
                alt="ملابس رجالية" 
                className="w-full h-72 object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">ملابس رجالية</h3>
                <p className="text-white text-lg mb-4">خصم 25% على البناطيل والقمصان</p>
                <Button className="bg-white text-amber-600 hover:bg-gray-100">تسوق الآن</Button>
              </div>
            </div>
          </div>

          {/* Bundle Deals */}
          <div className="bg-white p-6 rounded-lg mb-10">
            <h2 className="text-2xl font-bold mb-6">عروض مجمعة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundleDeals.map(bundle => (
                <div key={bundle.id} className="border border-amber-100 rounded-lg p-4 hover:border-amber-300 transition-colors">
                  <h3 className="text-lg font-medium text-amber-600 mb-3">{bundle.name}</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {bundle.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="line-through text-gray-500">{bundle.oldPrice} ريال</span>
                      <span className="text-amber-600 font-bold text-xl">{bundle.price} ريال</span>
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      اشتري الآن
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Coupon */}
          <div className="bg-gray-900 text-white p-6 rounded-lg mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-right">
                <h2 className="text-3xl font-bold mb-2">خصم إضافي 10% على جميع المشتريات</h2>
                <p className="text-lg text-gray-300">استخدم الكود: <span className="text-amber-400 font-bold">GOLD10</span> عند الدفع</p>
              </div>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-lg">
                تسوق الآن
              </Button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">شروط وأحكام العروض:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mr-4">
              <li>العروض سارية حتى نفاد الكمية.</li>
              <li>لا يمكن الجمع بين أكثر من عرض على نفس المنتج.</li>
              <li>يمكن تطبيق كود الخصم على جميع المنتجات عدا المنتجات المخفضة بالفعل.</li>
              <li>نحتفظ بالحق في تغيير أو إلغاء العروض في أي وقت دون إشعار مسبق.</li>
              <li>للاستفسارات، يرجى التواصل معنا على الرقم 777492635.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// بيانات وهمية للعروض
const weeklyDeals = [
  { 
    id: 1, 
    name: "فستان كلاسيكي", 
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
    price: 7650, 
    oldPrice: 9800, 
    discount: 22
  },
  { 
    id: 2, 
    name: "قميص رجالي", 
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
    price: 4100, 
    oldPrice: 5500, 
    discount: 25
  },
  { 
    id: 3, 
    name: "حذاء رياضي", 
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22", 
    price: 6500, 
    oldPrice: 8500, 
    discount: 23
  },
  { 
    id: 4, 
    name: "حقيبة يد نسائية", 
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
    price: 4700, 
    oldPrice: 6300, 
    discount: 25
  },
];

const bundleDeals = [
  {
    id: 1,
    name: "طقم أزياء نسائي",
    items: ["فستان عصري", "حذاء متناسق", "حقيبة يد أنيقة", "إكسسوار هدية"],
    price: 18000,
    oldPrice: 23500
  },
  {
    id: 2,
    name: "طقم أزياء رجالي",
    items: ["قميص كلاسيكي", "بنطلون جينز", "حزام جلدي", "حذاء كاجوال"],
    price: 16500,
    oldPrice: 21000
  },
  {
    id: 3,
    name: "طقم إكسسوارات",
    items: ["ساعة يد أنيقة", "سلسلة ذهبية", "أقراط مميزة", "خاتم هدية"],
    price: 22000,
    oldPrice: 28000
  },
];

export default Offers;
