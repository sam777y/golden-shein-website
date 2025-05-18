
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-600">شي إن الذهبي</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-800 hover:text-amber-600 font-medium">
              الرئيسية
            </Link>
            <div className="relative group">
              <span className="text-gray-800 hover:text-amber-600 font-medium cursor-pointer">
                المنتجات
              </span>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-2 space-y-1">
                  <Link to="/products/women" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md">
                    ملابس نسائية
                  </Link>
                  <Link to="/products/men" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md">
                    ملابس رجالية
                  </Link>
                  <Link to="/products/shoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md">
                    أحذية
                  </Link>
                  <Link to="/products/bags" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md">
                    شنط
                  </Link>
                  <Link to="/products/accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md">
                    إكسسوارات
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/offers" className="text-gray-800 hover:text-amber-600 font-medium">
              العروض والخصومات
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-amber-600 font-medium">
              من نحن
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-amber-600 font-medium">
              تواصل معنا
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-amber-600">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-amber-600">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Link 
              to="https://wa.me/777492635" 
              target="_blank" 
              className="hidden md:flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Phone className="w-4 h-4 ml-2" />
              <span>777492635</span>
            </Link>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden text-gray-700">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-800 hover:text-amber-600 font-medium py-2">
                الرئيسية
              </Link>
              <Link to="/products/women" className="text-gray-800 hover:text-amber-600 font-medium py-2 pr-4">
                ملابس نسائية
              </Link>
              <Link to="/products/men" className="text-gray-800 hover:text-amber-600 font-medium py-2 pr-4">
                ملابس رجالية
              </Link>
              <Link to="/products/shoes" className="text-gray-800 hover:text-amber-600 font-medium py-2 pr-4">
                أحذية
              </Link>
              <Link to="/products/bags" className="text-gray-800 hover:text-amber-600 font-medium py-2 pr-4">
                شنط
              </Link>
              <Link to="/products/accessories" className="text-gray-800 hover:text-amber-600 font-medium py-2 pr-4">
                إكسسوارات
              </Link>
              <Link to="/offers" className="text-gray-800 hover:text-amber-600 font-medium py-2">
                العروض والخصومات
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-amber-600 font-medium py-2">
                من نحن
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-amber-600 font-medium py-2">
                تواصل معنا
              </Link>
              <Link 
                to="https://wa.me/777492635" 
                className="flex items-center py-2 text-green-600"
              >
                <Phone className="w-4 h-4 ml-2" />
                <span>اطلب عبر واتساب</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
