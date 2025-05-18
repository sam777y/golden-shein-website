
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (password: string) => {
    if (password === "admin123") { // Simple password protection
      localStorage.setItem("adminToken", Date.now().toString());
      setIsLoggedIn(true);
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    navigate("/admin");
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">لوحة التحكم</h1>
        
        {isLoggedIn ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        )}
      </div>
    </Layout>
  );
};

export default Admin;
