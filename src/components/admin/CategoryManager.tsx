import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Category, DEFAULT_CATEGORIES } from "@/types/product";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<{id: string, name: string} | null>(null);
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
    
    const newCategory = { id, name: newCategoryName.trim() };
    const updatedCategories = [...categories, newCategory];
    
    saveCategories(updatedCategories);
    setNewCategoryName("");
    
    toast({
      title: "تم الإضافة",
      description: `تم إضافة قسم "${newCategoryName}" بنجاح`,
    });
  };

  // Start editing category
  const handleStartEdit = (category: Category) => {
    setEditingCategory(category);
  };

  // Save category edit
  const handleSaveEdit = () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
    
    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id ? { ...cat, name: editingCategory.name } : cat
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
    
    if (window.confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      saveCategories(updatedCategories);
      
      toast({
        title: "تم الحذف",
        description: "تم حذف القسم بنجاح",
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">إضافة قسم جديد</h3>
        <div className="flex gap-2">
          <Input
            placeholder="اسم القسم"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button 
            onClick={handleAddCategory}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 ml-1" /> إضافة
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">الأقسام الحالية</h3>
        
        {categories.length > 0 ? (
          <div className="grid gap-3">
            {categories.map(category => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {editingCategory?.id === category.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({
                            ...editingCategory,
                            name: e.target.value
                          })}
                        />
                        <Button 
                          onClick={handleSaveEdit} 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          حفظ
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="text-lg">{category.name}</span>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleStartEdit(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
