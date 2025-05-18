
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold text-amber-500 mb-4">شي إن الذهبي</h2>
            <p className="mb-4 text-gray-300">
              متجر شي إن الذهبي يقدم أحدث صيحات الموضة والأزياء النسائية والرجالية بأفضل الأسعار والجودة العالية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-amber-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-amber-500 mb-4">روابط سريعة</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-500">الرئيسية</Link>
              </li>
              <li>
                <Link to="/products/women" className="text-gray-300 hover:text-amber-500">ملابس نسائية</Link>
              </li>
              <li>
                <Link to="/products/men" className="text-gray-300 hover:text-amber-500">ملابس رجالية</Link>
              </li>
              <li>
                <Link to="/offers" className="text-gray-300 hover:text-amber-500">العروض والخصومات</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-amber-500">سياسة الخصوصية</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-bold text-amber-500 mb-4">تواصل معنا</h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">777492635</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">info@sheingolden.com</span>
              </li>
              <li className="text-gray-300">
                <span className="block font-medium mb-1">العنوان:</span>
                <span>صنعاء - شارع القيادة - بجوار كاك بنك</span>
              </li>
              <li className="mt-4">
                <Link 
                  to="https://wa.me/777492635" 
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Phone className="w-4 h-4 ml-2" />
                  <span>اطلب عبر واتساب</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} شي إن الذهبي. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
