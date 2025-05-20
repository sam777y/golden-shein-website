
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Product, Category } from "@/types/product";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface OfferFormProps {
  editProduct?: Product;
  onSave?: () => void;
}

const OfferForm = ({ editProduct, onSave }: OfferFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [isOffer, setIsOffer] = useState(true);
  const [imageData, setImageData] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // تحميل البيانات إذا كان تعديل منتج موجود
    if (editProduct) {
      setName(editProduct.name);
      setDescription(editProduct.description);
      setPrice(editProduct.price.toString());
      setCategory(editProduct.category);
      setImageData(editProduct.imageData);
      setIsOffer(editProduct.isOffer || false);
      setOldPrice(editProduct.oldPrice ? editProduct.oldPrice.toString() : "");
      setDiscount(editProduct.discount ? editProduct.discount.toString() : "");
      setQuantity(editProduct.quantity ? editProduct.quantity.toString() : "100");
    }

    // تحميل الأقسام من localStorage
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        const validCategories = parsedCategories.filter(
          (cat: Category) => cat.id && cat.id.trim() !== ""
        );
        setCategories(validCategories);
      } catch (error) {
        console.error("Error parsing categories", error);
      }
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

  const calculateDiscount = () => {
    if (price && oldPrice && parseFloat(oldPrice) > parseFloat(price)) {
      const discountValue = 
        ((parseFloat(oldPrice) - parseFloat(price)) / parseFloat(oldPrice)) * 100;
      setDiscount(Math.round(discountValue).toString());
    }
  };

  const updatePriceBasedOnDiscount = () => {
    if (oldPrice && discount) {
      const discountMultiplier = 1 - (parseFloat(discount) / 100);
      const calculatedPrice = parseFloat(oldPrice) * discountMultiplier;
      setPrice(calculatedPrice.toFixed(2));
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
      isOffer: true,
      oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
      discount: discount ? parseInt(discount) : undefined,
      quantity: quantity ? parseInt(quantity) : 100,
    };

    // تحميل المنتجات الموجودة أو تهيئة مصفوفة جديدة
    const existingProducts = localStorage.getItem("products");
    let products: Product[] = existingProducts ? JSON.parse(existingProducts) : [];

    if (editProduct) {
      // تحديث منتج موجود
      products = products.map(p => p.id === editProduct.id ? productData : p);
    } else {
      // إضافة منتج جديد
      products.push(productData);
    }

    localStorage.setItem("products", JSON.stringify(products));

    toast({
      title: editProduct ? "تم تعديل المنتج" : "تم إضافة المنتج",
      description: `تم ${editProduct ? "تعديل" : "إضافة"} منتج "${name}" بنجاح`,
    });

    // إعادة تعيين النموذج إذا كانت إضافة منتج جديد
    if (!editProduct) {
      setName("");
      setDescription("");
      setPrice("");
      setOldPrice("");
      setDiscount("");
      setCategory("");
      setImageData("");
      setQuantity("100");
    }

    if (onSave) onSave();
  };

  // الحصول على اسم القسم للعرض لعرضه في القائمة المنسدلة
  const getCategoryDisplayName = (cat: Category) => {
    if (!cat.parentId) return cat.name;
    
    // البحث عن القسم الأب
    const parent = categories.find(c => c.id === cat.parentId);
    if (parent) {
      return `${parent.name} ← ${cat.name}`;
    }
    
    return cat.name;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        {editProduct ? "تعديل منتج العرض" : "إضافة منتج عرض جديد"}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="oldPrice" className="block text-sm font-medium mb-1">
              السعر الأصلي
            </label>
            <Input
              id="oldPrice"
              type="number"
              value={oldPrice}
              onChange={(e) => {
                setOldPrice(e.target.value);
                setTimeout(calculateDiscount, 100);
              }}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label htmlFor="discount" className="block text-sm font-medium mb-1">
              نسبة الخصم (%)
            </label>
            <Input
              id="discount"
              type="number"
              value={discount}
              onChange={(e) => {
                setDiscount(e.target.value);
                setTimeout(updatePriceBasedOnDiscount, 100);
              }}
              min="0"
              max="100"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              السعر بعد الخصم
            </label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setTimeout(calculateDiscount, 100);
              }}
              min="0"
              step="0.01"
              required
              className="font-bold text-amber-600"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            الكمية المتاحة
          </label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
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
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox
            id="isOffer"
            checked={isOffer}
            onCheckedChange={(checked) => setIsOffer(checked as boolean)}
          />
          <Label htmlFor="isOffer">منتج عرض خاص</Label>
        </div>
      </div>
      
      <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
        {editProduct ? "تعديل المنتج" : "إضافة المنتج"}
      </Button>
    </form>
  );
};

export default OfferForm;
