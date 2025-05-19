
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image, FolderPlus, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Category, DEFAULT_CATEGORIES } from "@/types/product";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<{id: string, name: string, imageData?: string} | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newSubcategoryData, setNewSubcategoryData] = useState<{parentId: string, name: string, imageData?: string} | null>(null);
  const { toast } = useToast();

  // Load categories from localStorage
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        // Filter out any categories with empty IDs
        const validCategories = parsedCategories.filter(
          (cat: Category) => cat.id && cat.id.trim() !== ""
        );
        
        setCategories(validCategories);
        
        // If we filtered out invalid categories, update localStorage
        if (validCategories.length !== parsedCategories.length) {
          localStorage.setItem("categories", JSON.stringify(validCategories));
        }
      } catch (error) {
        console.error("Error parsing categories", error);
        setCategories(DEFAULT_CATEGORIES);
        localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
      }
    } else {
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
    }
  }, []);

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
  };

  // Delete category
  const handleDeleteCategory = (categoryId: string) => {
    // Check if category is used in products
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const isUsed = products.some((p: any) => p.category === categoryId);
    
    if (isUsed) {
      toast({
        title: "لا يمكن الحذف",
        description: "هذا القسم مستخدم في بعض المنتجات",
        variant: "destructive",
      });
      return;
    }
    
    // Check if category has subcategories
    const hasSubcategories = categories.some(cat => cat.parentId === categoryId);
    
    if (hasSubcategories) {
      toast({
        title: "لا يمكن الحذف",
        description: "يجب حذف الأقسام الفرعية أولاً",
        variant: "destructive",
      });
      return;
    }
    
    if (window.confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      saveCategories(updatedCategories);
      
      toast({
        title: "تم الحذف",
        description: "تم حذف القسم بنجاح",
      });
    }
  };

  // Get subcategories for a given parent category
  const getSubcategories = (parentId: string) => {
    return categories.filter(cat => cat.parentId === parentId);
  };

  // Check if a category is a main category (not a subcategory)
  const isMainCategory = (category: Category) => {
    return !category.parentId;
  };

  // Render a single category
  const renderCategory = (category: Category) => {
    const isExpanded = expandedCategories.includes(category.id);
    const subcategories = getSubcategories(category.id);
    const isEditing = editingCategory?.id === category.id;
    const isAddingSubcategory = newSubcategoryData?.parentId === category.id;
    
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
                  {subcategories.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {subcategories.length} قسم فرعي
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
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
