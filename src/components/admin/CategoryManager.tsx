
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image, FolderPlus, ChevronDown, ChevronUp, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Category, DEFAULT_CATEGORIES, Product } from "@/types/product";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<{id: string, name: string, imageData?: string} | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newSubcategoryData, setNewSubcategoryData] = useState<{parentId: string, name: string, imageData?: string} | null>(null);
  const [viewingCategoryProducts, setViewingCategoryProducts] = useState<string | null>(null);
  const { toast } = useToast();

  // Load categories and products from localStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load categories
    const storedCategories = localStorage.getItem("categories");
    let allCategories = [...DEFAULT_CATEGORIES];
    
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        
        // Merge categories, removing duplicates and keeping ones with images
        parsedCategories.forEach((storedCat: Category) => {
          const existingIndex = allCategories.findIndex(c => c.id === storedCat.id);
          if (existingIndex >= 0) {
            // Update existing category with stored data
            allCategories[existingIndex] = storedCat;
          } else {
            // Add new category if it doesn't exist and has valid ID
            if (storedCat.id && storedCat.id.trim() !== "") {
              allCategories.push(storedCat);
            }
          }
        });
        
        setCategories(allCategories);
      } catch (error) {
        console.error("Error parsing categories", error);
        setCategories(DEFAULT_CATEGORIES);
      }
    } else {
      setCategories(DEFAULT_CATEGORIES);
      // Save default categories to localStorage for future use
      localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
    }

    // Load products
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error("Error parsing products", error);
        setProducts([]);
      }
    }
  };

  // Save categories to localStorage
  const saveCategories = (updatedCategories: Category[]) => {
    // Filter out any categories with empty IDs before saving
    const validCategories = updatedCategories.filter(cat => cat.id && cat.id.trim() !== "");
    localStorage.setItem("categories", JSON.stringify(validCategories));
    setCategories(validCategories);
  };

  // Handle image upload for new category
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit' | 'subcategory') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result.toString();
          
          if (type === 'new') {
            setNewCategoryImage(imageData);
          } else if (type === 'edit' && editingCategory) {
            setEditingCategory({
              ...editingCategory,
              imageData
            });
          } else if (type === 'subcategory' && newSubcategoryData) {
            setNewSubcategoryData({
              ...newSubcategoryData,
              imageData
            });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new category
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    // Create a URL-friendly ID from the name
    const id = newCategoryName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
    
    // Don't add if ID would be empty
    if (!id) {
      toast({
        title: "خطأ",
        description: "لا يمكن إنشاء قسم بدون معرف صالح",
        variant: "destructive",
      });
      return;
    }
    
    const newCategory: Category = { 
      id, 
      name: newCategoryName.trim(),
      imageData: newCategoryImage || undefined
    };
    
    const updatedCategories = [...categories, newCategory];
    
    saveCategories(updatedCategories);
    setNewCategoryName("");
    setNewCategoryImage("");
    
    toast({
      title: "تم الإضافة",
      description: `تم إضافة قسم "${newCategoryName}" بنجاح`,
    });
    
    // Trigger a reload event for the main site
    window.dispatchEvent(new Event('storage'));
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Start adding subcategory
  const handleStartAddSubcategory = (category: Category) => {
    setNewSubcategoryData({
      parentId: category.id,
      name: "",
      imageData: undefined
    });
  };

  // Cancel adding subcategory
  const handleCancelAddSubcategory = () => {
    setNewSubcategoryData(null);
  };

  // Add subcategory
  const handleAddSubcategory = () => {
    if (!newSubcategoryData || !newSubcategoryData.name.trim()) return;
    
    // Create a URL-friendly ID for the subcategory
    const subcategoryId = `${newSubcategoryData.parentId}-${newSubcategoryData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")}`;
    
    // Don't add if ID would be empty
    if (subcategoryId === newSubcategoryData.parentId + "-") {
      toast({
        title: "خطأ",
        description: "لا يمكن إنشاء قسم فرعي بدون معرف صالح",
        variant: "destructive",
      });
      return;
    }
    
    const newSubcategory: Category = {
      id: subcategoryId,
      name: newSubcategoryData.name.trim(),
      parentId: newSubcategoryData.parentId,
      imageData: newSubcategoryData.imageData
    };
    
    const updatedCategories = [...categories, newSubcategory];
    
    saveCategories(updatedCategories);
    setNewSubcategoryData(null);
    
    // Ensure parent category is expanded to show the new subcategory
    if (!expandedCategories.includes(newSubcategoryData.parentId)) {
      setExpandedCategories([...expandedCategories, newSubcategoryData.parentId]);
    }
    
    toast({
      title: "تم الإضافة",
      description: `تم إضافة قسم فرعي "${newSubcategoryData.name}" بنجاح`,
    });
    
    // Trigger a reload event for the main site
    window.dispatchEvent(new Event('storage'));
  };

  // Start editing category
  const handleStartEdit = (category: Category) => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      imageData: category.imageData
    });
  };

  // Save category edit
  const handleSaveEdit = () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
    
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id 
        ? { 
            ...cat, 
            name: editingCategory.name,
            image: editingCategory.imageData,
            imageData: editingCategory.imageData
          } 
        : cat
    );
    
    saveCategories(updatedCategories);
    setEditingCategory(null);
    
    toast({
      title: "تم التعديل",
      description: "تم تعديل القسم بنجاح",
    });
    
    // Trigger a reload event for the main site
    window.dispatchEvent(new Event('storage'));
  };

  // Delete category
  const handleDeleteCategory = (categoryId: string) => {
    // Check if category is used in products
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const categoryProducts = products.filter((p: any) => p.category === categoryId);
    
    if (categoryProducts.length > 0) {
      const confirmDelete = window.confirm(
        `هذا القسم يحتوي على ${categoryProducts.length} منتج. هل تريد حذف القسم وجميع المنتجات؟`
      );
      
      if (!confirmDelete) return;
      
      // Delete all products in this category
      const updatedProducts = products.filter((p: any) => p.category !== categoryId);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      
      toast({
        title: "تم الحذف",
        description: `تم حذف القسم و ${categoryProducts.length} منتج`,
      });
    }
    
    // Check if category has subcategories
    const subcategories = categories.filter(cat => cat.parentId === categoryId);
    
    if (subcategories.length > 0) {
      const confirmDelete = window.confirm(
        `هذا القسم يحتوي على ${subcategories.length} قسم فرعي. هل تريد حذف القسم وجميع الأقسام الفرعية؟`
      );
      
      if (!confirmDelete) return;
      
      // Delete all subcategories and their products
      subcategories.forEach(subcat => {
        const subcatProducts = products.filter((p: any) => p.category === subcat.id);
        const remainingProducts = products.filter((p: any) => p.category !== subcat.id);
        localStorage.setItem("products", JSON.stringify(remainingProducts));
      });
    } else {
      if (!window.confirm("هل أنت متأكد من حذف هذا القسم؟")) {
        return;
      }
    }
    
    // Delete category and all its subcategories
    const updatedCategories = categories.filter(
      cat => cat.id !== categoryId && cat.parentId !== categoryId
    );
    saveCategories(updatedCategories);
    
    toast({
      title: "تم الحذف",
      description: "تم حذف القسم بنجاح",
    });
    
    // Trigger a reload event for the main site
    window.dispatchEvent(new Event('storage'));
  };

  // Get subcategories for a given parent category
  const getSubcategories = (parentId: string) => {
    return categories.filter(cat => cat.parentId === parentId);
  };

  // Check if a category is a main category (not a subcategory)
  const isMainCategory = (category: Category) => {
    return !category.parentId;
  };

  // Get products count for a category
  const getCategoryProductsCount = (categoryId: string) => {
    return products.filter(p => p.category === categoryId).length;
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      const updatedProducts = products.filter(p => p.id !== productId);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      
      toast({
        title: "تم الحذف",
        description: "تم حذف المنتج بنجاح",
      });
      
      // Trigger a reload event for the main site
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Render a single category
  const renderCategory = (category: Category) => {
    const isExpanded = expandedCategories.includes(category.id);
    const subcategories = getSubcategories(category.id);
    const isEditing = editingCategory?.id === category.id;
    const isAddingSubcategory = newSubcategoryData?.parentId === category.id;
    const productsCount = getCategoryProductsCount(category.id);
    const categoryProducts = products.filter(p => p.category === category.id);
    
    return (
      <Card key={category.id} className={isMainCategory(category) ? "" : "ml-6 mt-2"}>
        <CardContent className="p-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">تعديل القسم</h4>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingCategory(null)}
                >
                  إلغاء
                </Button>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm mb-1">اسم القسم</label>
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      name: e.target.value
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">صورة القسم</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'edit')}
                    />
                    {editingCategory.imageData && (
                      <div className="w-12 h-12 overflow-hidden rounded-md border">
                        <img 
                          src={editingCategory.imageData} 
                          alt="معاينة" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveEdit} 
                  className="bg-green-600 hover:bg-green-700"
                >
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          ) : isAddingSubcategory ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">إضافة قسم فرعي جديد</h4>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelAddSubcategory}
                >
                  إلغاء
                </Button>
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm mb-1">اسم القسم الفرعي</label>
                  <Input
                    value={newSubcategoryData.name}
                    onChange={(e) => setNewSubcategoryData({
                      ...newSubcategoryData,
                      name: e.target.value
                    })}
                    placeholder="أدخل اسم القسم الفرعي"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">صورة القسم الفرعي (اختياري)</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, 'subcategory')}
                    />
                    {newSubcategoryData.imageData && (
                      <div className="w-12 h-12 overflow-hidden rounded-md border">
                        <img 
                          src={newSubcategoryData.imageData} 
                          alt="معاينة" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddSubcategory} 
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  إضافة القسم الفرعي
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {category.imageData ? (
                  <div className="w-12 h-12 overflow-hidden rounded-md border">
                    <img 
                      src={category.imageData} 
                      alt={category.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <span className="text-lg">{category.name}</span>
                  <div className="flex gap-2 text-xs text-gray-500">
                    {subcategories.length > 0 && (
                      <span>{subcategories.length} قسم فرعي</span>
                    )}
                    {productsCount > 0 && (
                      <span>• {productsCount} منتج</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {productsCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setViewingCategoryProducts(
                      viewingCategoryProducts === category.id ? null : category.id
                    )}
                    title="عرض المنتجات"
                  >
                    <Package className="h-4 w-4" />
                  </Button>
                )}
                
                {isMainCategory(category) && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleStartAddSubcategory(category)}
                    title="إضافة قسم فرعي"
                  >
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleStartEdit(category)}
                  title="تعديل"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleDeleteCategory(category.id)}
                  title="حذف"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                {subcategories.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleCategoryExpansion(category.id)}
                    title={isExpanded ? "طي" : "توسيع"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        {viewingCategoryProducts === category.id && categoryProducts.length > 0 && (
          <div className="px-4 pb-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <h4 className="font-medium mb-3">المنتجات في هذا القسم:</h4>
              <div className="space-y-2">
                {categoryProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.imageData} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.price} ر.س</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {isExpanded && subcategories.length > 0 && (
          <div className="pl-4 pb-4">
            {subcategories.map(renderCategory)}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">إضافة قسم جديد</h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Input
              placeholder="اسم القسم"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            
            <div>
              <label className="block text-sm mb-1">صورة القسم (اختياري)</label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'new')}
                />
                {newCategoryImage && (
                  <div className="w-12 h-12 overflow-hidden rounded-md border">
                    <img 
                      src={newCategoryImage} 
                      alt="معاينة" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleAddCategory}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 ml-1" /> إضافة قسم جديد
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">الأقسام الحالية</h3>
        
        {categories.length > 0 ? (
          <div className="grid gap-3">
            {categories.filter(isMainCategory).map(renderCategory)}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">لا توجد أقسام</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
