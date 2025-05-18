
import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { Product, Category } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Load products and categories from localStorage
  const loadData = () => {
    const storedProducts = localStorage.getItem("products");
    const storedCategories = localStorage.getItem("categories");
    
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Error parsing products from localStorage", error);
        setProducts([]);
      }
    }
    
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        // Validate categories - ensure all have valid ids
        const validCategories = parsedCategories.filter(
          (cat: Category) => cat.id && cat.id.trim() !== ""
        );
        setCategories(validCategories);
      } catch (error) {
        console.error("Error parsing categories from localStorage", error);
        setCategories([]);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Find category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  // Handle delete product
  const handleDelete = (productId: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      const updatedProducts = products.filter(p => p.id !== productId);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      
      toast({
        title: "تم الحذف",
        description: "تم حذف المنتج بنجاح",
      });
    }
  };

  // Handle edit product
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  // Handle save after edit
  const handleSaveEdit = () => {
    setIsEditDialogOpen(false);
    loadData();
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Select 
          value={categoryFilter} 
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="جميع الأقسام" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأقسام</SelectItem>
            {categories.map((category) => (
              category.id && category.id.trim() !== "" ? (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ) : null
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">الصورة</TableHead>
                <TableHead>اسم المنتج</TableHead>
                <TableHead className="hidden md:table-cell">القسم</TableHead>
                <TableHead className="text-center">السعر</TableHead>
                <TableHead className="text-left">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.imageData} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getCategoryName(product.category)}
                  </TableCell>
                  <TableCell className="text-center">{product.price.toLocaleString()} ريال</TableCell>
                  <TableCell>
                    <div className="flex space-s-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-muted-foreground">لا توجد منتجات متاحة</p>
        </div>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تعديل المنتج</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm 
              editProduct={selectedProduct} 
              onSave={handleSaveEdit} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsList;
