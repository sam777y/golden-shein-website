
import React from "react";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">من نحن</h1>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:ml-8">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                  alt="شي إن الذهبي" 
                  className="rounded-lg w-full h-auto shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-amber-600 mb-4">شي إن الذهبي</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  تأسس متجر "شي إن الذهبي" في عام 2020 ليكون واحدًا من أكبر متاجر الأزياء والإكسسوارات في صنعاء. نهدف إلى تقديم أحدث صيحات الموضة بأسعار مناسبة للجميع مع الحفاظ على أعلى معايير الجودة.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  نعمل باستمرار على توفير تشكيلة واسعة من المنتجات التي تلبي احتياجات وأذواق مختلف العملاء، من الملابس النسائية والرجالية إلى الأحذية والحقائب والإكسسوارات المتنوعة.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-amber-600 mb-4">رؤيتنا</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              نسعى لأن نكون الوجهة الأولى للتسوق العصري في اليمن، وتقديم تجربة تسوق استثنائية تجمع بين الجودة والسعر المناسب والخدمة المتميزة.
            </p>

            <h2 className="text-2xl font-bold text-amber-600 mb-4">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">الجودة</h3>
                <p className="text-gray-700">نلتزم بتقديم منتجات ذات جودة عالية تستحق ثقة عملائنا.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">الابتكار</h3>
                <p className="text-gray-700">نواكب أحدث صيحات الموضة العالمية ونجلبها إلى السوق المحلي.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">خدمة العملاء</h3>
                <p className="text-gray-700">نضع رضا العملاء في مقدمة أولوياتنا ونسعى دائمًا لتجاوز توقعاتهم.</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">الشفافية</h3>
                <p className="text-gray-700">نؤمن بالتعامل الصادق والشفاف مع عملائنا وشركائنا.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-amber-600 mb-4">لماذا تختار شي إن الذهبي؟</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8 mr-4">
              <li>تشكيلة واسعة من المنتجات العصرية والمتنوعة.</li>
              <li>أسعار مناسبة تناسب جميع الفئات.</li>
              <li>جودة عالية للمنتجات مع ضمان الاستبدال.</li>
              <li>خدمة عملاء متميزة على مدار الأسبوع.</li>
              <li>عروض وخصومات مستمرة.</li>
              <li>توصيل سريع إلى جميع مناطق صنعاء.</li>
            </ul>

            <h2 className="text-2xl font-bold text-amber-600 mb-4">تواصل معنا</h2>
            <p className="text-gray-700 leading-relaxed">
              نرحب بزيارتكم في معرضنا الواقع في صنعاء - شارع القيادة - بجوار كاك بنك، أو التواصل معنا عبر الرقم 777492635 للاستفسار عن المنتجات أو لطلب التوصيل.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
