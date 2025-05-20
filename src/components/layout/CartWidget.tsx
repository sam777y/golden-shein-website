
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const CartWidget = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  
  const itemsCount = getCartItemsCount();
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemsCount > 0 && (
            <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
              {itemsCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>سلة التسوق</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-[80vh]">
          {cart.length > 0 ? (
            <>
              <div className="flex-1 overflow-auto">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex items-start py-3 border-b">
                      <div className="h-16 w-16 rounded overflow-hidden">
                        <img 
                          src={item.product.imageData} 
                          alt={item.product.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="mr-4 flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm text-gray-500">
                            <span>{item.product.price} ريال × {item.quantity}</span>
                          </div>
                          <div className="text-amber-600 font-medium">
                            {(item.product.price * item.quantity).toFixed(2)} ريال
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 text-sm p-1"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>الإجمالي:</span>
                  <span className="text-amber-600">{getCartTotal().toFixed(2)} ريال</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SheetClose asChild>
                    <Link to="/cart">
                      <Button variant="outline" className="w-full">
                        عرض السلة
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/cart">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        إتمام الشراء
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
              <h4 className="text-lg font-medium mb-2">سلة التسوق فارغة</h4>
              <p className="text-gray-500 mb-6">أضف بعض المنتجات إلى سلة التسوق.</p>
              <SheetClose asChild>
                <Link to="/products">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    تسوق الآن
                  </Button>
                </Link>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartWidget;
