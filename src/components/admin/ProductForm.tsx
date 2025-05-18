
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Product, Category, DEFAULT_CATEGORIES } from "@/types/product";

interface ProductFormProps {
  editProduct?: Product;
  onSave?: () => void;
}

const ProductForm = ({ editProduct, onSave }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageData, setImageData] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Populate form if editing an existing product
    if (editProduct) {
      setName(editProduct.name);
      setDescription(editProduct.description);
      setPrice(editProduct.price.toString());
      setCategory(editProduct.category);
      setImageData(editProduct.imageData);
    }

    // Load categories from localStorage or use defaults
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        // Validate categories - ensure all categories have a valid id
        const validCategories = parsedCategories.filter(
          (cat: Category) => cat.id && cat.id.trim() !== ""
        );
        setCategories(validCategories);
        
        // If we have filtered out invalid categories, update localStorage
        if (validCategories.length !== parsedCategories.length) {
          localStorage.setItem("categories", JSON.stringify(validCategories));
        }
      } catch (error) {
        console.error("Error parsing categories from localStorage", error);
        setCategories(DEFAULT_CATEGORIES);
        localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
      }
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
    }
  }, [editProduct]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageData(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageData) {
      toast({
        title: "خطأ",
        description: "يرجى إضافة صورة للمنتج",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار قسم للمنتج",
        variant: "destructive",
      });
      return;
    }

    const productData: Product = {
      id: editProduct?.id || Date.now().toString(),
      name,
      description,
      price: parseFloat(price),
      imageData,
      category,
      createdAt: editProduct?.createdAt || Date.now(),
    };

    // Get existing products or initialize
    const existingProducts = localStorage.getItem("products");
    let products: Product[] = existingProducts ? JSON.parse(existingProducts) : [];
    
    if (editProduct) {
      // Update existing product
      products = products.map(p => p.id === editProduct.id ? productData : p);
    } else {
      // Add new product
      products.push(productData);
    }
    
    localStorage.setItem("products", JSON.stringify(products));
    
    toast({
      title: editProduct ? "تم تعديل المنتج" : "تم إضافة المنتج",
      description: `تم ${editProduct ? "تعديل" : "إضافة"} منتج "${name}" بنجاح`,
    });

    // Reset form if adding new product
    if (!editProduct) {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageData("");
    }

    if (onSave) onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        {editProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            اسم المنتج
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            وصف المنتج
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            سعر المنتج
          </label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            القسم
          </label>
          <Select
            value={category}
            onValueChange={setCategory}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  cat.id && cat.id.trim() !== "" ? (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ) : null
                ))
              ) : (
                <SelectItem value="no-categories">لا توجد أقسام</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            صورة المنتج
          </label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
            required={!editProduct}
          />
          {imageData && (
            <div className="mt-2">
              <p className="text-sm mb-1">معاينة الصورة:</p>
              <img
                src={imageData}
                alt="معاينة"
                className="w-32 h-32 object-cover border rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      
      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
        {editProduct ? "تعديل المنتج" : "إضافة المنتج"}
      </Button>
    </form>
  );
};

export default ProductForm;
