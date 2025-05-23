
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const CartWidget = () => {
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  
  const itemsCount = getCartItemsCount();
  
  const handleCartClick = () => {
    navigate('/cart');
  };
  
  return (
    <Button variant="ghost" size="icon" className="relative" onClick={handleCartClick}>
      <ShoppingCart className="h-5 w-5" />
      {itemsCount > 0 && (
        <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
          {itemsCount}
        </span>
      )}
    </Button>
  );
};

export default CartWidget;
