
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Product, Category, DEFAULT_CATEGORIES } from "@/types/product";
import { X, Plus, Images } from "lucide-react";

interface ProductFormProps {
  editProduct?: Product;
  onSave?: () => void;
}

const ProductForm = ({ editProduct, onSave }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageData, setImageData] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Dimensions state
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  
  // Sizes state
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Populate form if editing an existing product
    if (editProduct) {
      setName(editProduct.name);
      setDescription(editProduct.description);
      setPrice(editProduct.price.toString());
      setOldPrice(editProduct.oldPrice?.toString() || "");
      setCategory(editProduct.category);
      setImageData(editProduct.imageData);
      setAdditionalImages(editProduct.additionalImages || []);
      
      // Set dimensions
      if (editProduct.dimensions) {
        setLength(editProduct.dimensions.length?.toString() || "");
        setWidth(editProduct.dimensions.width?.toString() || "");
        setHeight(editProduct.dimensions.height?.toString() || "");
      }
      
      // Set sizes
      setSizes(editProduct.sizes || []);
    }

    // Load categories from localStorage or use defaults
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        const validCategories = parsedCategories.filter(
          (cat: Category) => cat.id && cat.id.trim() !== ""
        );
        setCategories(validCategories);
        
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

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result.toString());
            if (newImages.length === files.length) {
              setAdditionalImages([...additionalImages, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
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

    // Calculate discount if old price is provided
    const currentPrice = parseFloat(price);
    const previousPrice = oldPrice ? parseFloat(oldPrice) : undefined;
    const discount = previousPrice && previousPrice > currentPrice 
      ? Math.round(((previousPrice - currentPrice) / previousPrice) * 100)
      : undefined;

    const productData: Product = {
      id: editProduct?.id || Date.now().toString(),
      name,
      description,
      price: currentPrice,
      oldPrice: previousPrice,
      discount,
      isOffer: !!discount,
      imageData,
      additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
      category,
      createdAt: editProduct?.createdAt || Date.now(),
      dimensions: (length || width || height) ? {
        length: length ? parseFloat(length) : undefined,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
      } : undefined,
      sizes: sizes.length > 0 ? sizes : undefined,
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
      setOldPrice("");
      setCategory("");
      setImageData("");
      setAdditionalImages([]);
      setLength("");
      setWidth("");
      setHeight("");
      setSizes([]);
      setNewSize("");
    }

    if (onSave) onSave();
  };

  // Function to format category name display for nested categories
  const getCategoryDisplayName = (cat: Category) => {
    if (!cat.parentId) return cat.name;
    
    // Find parent category
    const parent = categories.find(c => c.id === cat.parentId);
    if (parent) {
      return `${parent.name} ← ${cat.name}`;
    }
    
    return cat.name;
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              السعر الحالي
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
            <label htmlFor="oldPrice" className="block text-sm font-medium mb-1">
              السعر القديم (اختياري)
            </label>
            <Input
              id="oldPrice"
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              min="0"
              step="0.01"
              placeholder="السعر قبل الخصم"
            />
          </div>
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
                      {getCategoryDisplayName(cat)}
                    </SelectItem>
                  ) : null
                ))
              ) : (
                <SelectItem value="no-categories" disabled>لا توجد أقسام</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            الصورة الرئيسية
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
              <p className="text-sm mb-1">معاينة الصورة الرئيسية:</p>
              <img
                src={imageData}
                alt="معاينة"
                className="w-32 h-32 object-cover border rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="additionalImages" className="block text-sm font-medium mb-1">
            صور إضافية (اختياري)
          </label>
          <Input
            id="additionalImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImageChange}
            className="mb-2"
          />
          {additionalImages.length > 0 && (
            <div className="mt-2">
              <p className="text-sm mb-2">الصور الإضافية:</p>
              <div className="flex flex-wrap gap-2">
                {additionalImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`صورة إضافية ${index + 1}`}
                      className="w-20 h-20 object-cover border rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeAdditionalImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            الأبعاد (اختياري) - بالسنتيمتر
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="length" className="block text-xs text-gray-600 mb-1">
                الطول
              </label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min="0"
                step="0.1"
                placeholder="الطول"
              />
            </div>
            <div>
              <label htmlFor="width" className="block text-xs text-gray-600 mb-1">
                العرض
              </label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min="0"
                step="0.1"
                placeholder="العرض"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-xs text-gray-600 mb-1">
                الارتفاع
              </label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="0"
                step="0.1"
                placeholder="الارتفاع"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            المقاسات المتاحة (اختياري)
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="أدخل مقاس (مثال: S, M, L, XL)"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addSize}
              disabled={!newSize.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {sizes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                >
                  <span className="text-sm">{size}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => removeSize(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
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
