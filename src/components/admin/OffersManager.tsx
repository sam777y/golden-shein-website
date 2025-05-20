
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Product } from "@/types/product";
import { Search, Edit, Trash, ShoppingCart } from "lucide-react";
import OfferForm from "./OfferForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const OffersManager = () => {
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const { toast } = useToast();

  // تحميل منتجات العروض من localStorage
  const loadOffers = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        const allProducts: Product[] = JSON.parse(storedProducts);
        // تصفية المنتجات التي تعتبر عروضاً
        const offers = allProducts.filter(product => product.isOffer || product.discount);
        setOfferProducts(offers);
      } catch (error) {
        console.error("Error loading offer products:", error);
        setOfferProducts([]);
      }
    } else {
      setOfferProducts([]);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  // تحرير منتج
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  // حذف منتج
  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // تأكيد حذف منتج
  const confirmDelete = () => {
    if (selectedProduct) {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products: Product[] = JSON.parse(storedProducts);
        const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        
        setOfferProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
        
        toast({
          title: "تم حذف المنتج",
          description: `تم حذف منتج "${selectedProduct.name}" بنجاح`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  // تصفية المنتجات حسب البحث
  const filteredProducts = offerProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">إدارة العروض الخاصة</h2>
        <Button 
          className="bg-amber-600 hover:bg-amber-700"
          onClick={() => setIsAddOfferOpen(true)}
        >
          <ShoppingCart className="ml-2 h-5 w-5" />
          إضافة عرض جديد
        </Button>
      </div>
      
      {/* بحث */}
      <div className="mb-6 relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-4 pr-10"
          placeholder="ابحث في العروض..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* جدول العروض */}
      {filteredProducts.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الخصم</TableHead>
                <TableHead>القسم</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <img 
                        src={product.imageData} 
                        alt={product.name} 
                        className="w-10 h-10 rounded object-cover ml-2" 
                      />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-bold text-amber-600">{product.price} ريال</span>
                      {product.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {product.oldPrice} ريال
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.discount ? `${product.discount}%` : "-"}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-600"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-50 rounded-md">
          <p className="text-gray-500">
            لا توجد عروض{searchTerm ? " تطابق البحث" : ""}
          </p>
        </div>
      )}

      {/* مربع حوار تعديل المنتج */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تعديل منتج العرض</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              {selectedProduct && (
                <OfferForm 
                  editProduct={selectedProduct}
                  onSave={() => {
                    setIsEditDialogOpen(false);
                    loadOffers();
                  }}
                />
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* مربع حوار حذف المنتج */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف منتج العرض</DialogTitle>
          </DialogHeader>
          <p>
            هل أنت متأكد من رغبتك في حذف منتج "{selectedProduct?.name}"؟
          </p>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
            >
              حذف
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* مربع حوار إضافة عرض جديد */}
      <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>إضافة عرض جديد</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              <OfferForm 
                onSave={() => {
                  setIsAddOfferOpen(false);
                  loadOffers();
                }}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OffersManager;
