
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductForm from "./ProductForm";
import ProductsList from "./ProductsList";
import CategoryManager from "./CategoryManager";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">لوحة التحكم</h2>
        <Button variant="outline" onClick={onLogout} className="text-red-600 border-red-600 hover:bg-red-50">
          تسجيل الخروج
        </Button>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="add-product">إضافة منتج</TabsTrigger>
          <TabsTrigger value="categories">الأقسام</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="p-4 border rounded-md">
          <ProductsList />
        </TabsContent>
        
        <TabsContent value="add-product" className="p-4 border rounded-md">
          <ProductForm />
        </TabsContent>
        
        <TabsContent value="categories" className="p-4 border rounded-md">
          <CategoryManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
