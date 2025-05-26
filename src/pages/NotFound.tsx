
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              الصفحة غير موجودة
            </h2>
            <p className="text-gray-600 mb-6">
              عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
              <br />
              <span className="text-sm text-gray-500 mt-2 block">
                المسار المطلوب: {location.pathname}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Home className="w-4 h-4 ml-2" />
                العودة للصفحة الرئيسية
              </Button>
            </Link>
            
            <Link to="/products">
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 ml-2" />
                تصفح المنتجات
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-2">صفحات مفيدة:</h3>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-blue-600 hover:text-blue-800">
                <ArrowRight className="w-3 h-3 inline ml-1" />
                من نحن
              </Link>
              <Link to="/contact" className="block text-blue-600 hover:text-blue-800">
                <ArrowRight className="w-3 h-3 inline ml-1" />
                اتصل بنا
              </Link>
              <Link to="/offers" className="block text-blue-600 hover:text-blue-800">
                <ArrowRight className="w-3 h-3 inline ml-1" />
                العروض الخاصة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
