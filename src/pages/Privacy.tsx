
import React from "react";
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">سياسة الخصوصية</h1>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="prose prose-amber max-w-none">
              <p className="text-gray-700 mb-6">
                نحن في متجر "شي إن الذهبي" نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. تصف سياسة الخصوصية هذه كيفية جمعنا واستخدامنا للمعلومات التي تقدمها لنا عند استخدام موقعنا الإلكتروني.
              </p>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">المعلومات التي نجمعها</h2>
              <p className="text-gray-700 mb-4">
                نحن نجمع المعلومات التي تقدمها لنا عند:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-6 mb-6">
                <li>إنشاء حساب على موقعنا</li>
                <li>إجراء طلب شراء</li>
                <li>التسجيل في نشرتنا الإخبارية</li>
                <li>التواصل معنا عبر نموذج الاتصال</li>
                <li>المشاركة في استطلاعات الرأي أو المسابقات</li>
              </ul>

              <p className="text-gray-700 mb-4">
                قد تشمل هذه المعلومات:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-6 mb-6">
                <li>الاسم الكامل</li>
                <li>عنوان البريد الإلكتروني</li>
                <li>رقم الهاتف</li>
                <li>عنوان الشحن والفواتير</li>
                <li>معلومات الدفع (نحن لا نخزن بيانات بطاقات الائتمان)</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">كيف نستخدم معلوماتك</h2>
              <p className="text-gray-700 mb-4">
                نستخدم المعلومات التي نجمعها للأغراض التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-6 mb-6">
                <li>معالجة وإتمام طلبات الشراء الخاصة بك</li>
                <li>إرسال تأكيدات الطلبات وتحديثات الشحن</li>
                <li>التواصل معك بخصوص استفساراتك أو طلباتك</li>
                <li>إرسال معلومات تسويقية (إذا اخترت الاشتراك)</li>
                <li>تحسين موقعنا وخدماتنا</li>
                <li>الامتثال للالتزامات القانونية</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">حماية المعلومات</h2>
              <p className="text-gray-700 mb-6">
                نحن نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الضياع أو الوصول غير المصرح به أو الإفصاح أو التغيير. ومع ذلك، يرجى العلم بأنه لا توجد طريقة نقل عبر الإنترنت أو طريقة تخزين إلكترونية آمنة بنسبة 100%.
              </p>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">الكوكيز وتقنيات التتبع</h2>
              <p className="text-gray-700 mb-6">
                نستخدم ملفات تعريف الارتباط (الكوكيز) وتقنيات مماثلة لتحسين تجربة المستخدم على موقعنا وتحليل كيفية استخدام الزوار لموقعنا. يمكنك تعديل إعدادات المتصفح الخاص بك لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على قدرتك على استخدام بعض ميزات موقعنا.
              </p>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">مشاركة المعلومات</h2>
              <p className="text-gray-700 mb-4">
                نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-6 mb-6">
                <li>مع شركاء الخدمة الذين يساعدوننا في تشغيل موقعنا وتقديم الخدمات (مثل شركات الشحن ومعالجي المدفوعات)</li>
                <li>عندما يكون ذلك مطلوبًا قانونًا (مثل الامتثال لأمر قانوني أو حماية حقوقنا القانونية)</li>
                <li>بموافقتك الصريحة</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">حقوقك</h2>
              <p className="text-gray-700 mb-4">
                لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mr-6 mb-6">
                <li>الوصول إلى البيانات الشخصية التي نحتفظ بها عنك</li>
                <li>تصحيح أي بيانات غير دقيقة</li>
                <li>طلب حذف بياناتك الشخصية</li>
                <li>الاعتراض على معالجة بياناتك</li>
                <li>طلب تقييد معالجة بياناتك</li>
                <li>طلب نقل بياناتك إلى مزود خدمة آخر</li>
              </ul>

              <p className="text-gray-700 mb-6">
                لممارسة أي من هذه الحقوق، يرجى التواصل معنا باستخدام معلومات الاتصال الموجودة أدناه.
              </p>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">التعديلات على سياسة الخصوصية</h2>
              <p className="text-gray-700 mb-6">
                قد نقوم بتعديل سياسة الخصوصية هذه من وقت لآخر. سنقوم بنشر أي تغييرات على هذه الصفحة وسنبلغك بأي تغييرات مهمة من خلال إشعار بارز على موقعنا.
              </p>

              <h2 className="text-2xl font-bold text-amber-600 mt-8 mb-4">اتصل بنا</h2>
              <p className="text-gray-700">
                إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية لدينا، يرجى الاتصال بنا على:
              </p>
              <ul className="list-none text-gray-700 space-y-2 mt-4">
                <li><strong>الهاتف:</strong> 777492635</li>
                <li><strong>البريد الإلكتروني:</strong> info@sheingolden.com</li>
                <li><strong>العنوان:</strong> صنعاء - شارع القيادة - بجوار كاك بنك</li>
              </ul>

              <p className="text-gray-700 mt-8">
                آخر تحديث: {new Date().toLocaleDateString('ar-YE')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
