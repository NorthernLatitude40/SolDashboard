// src/components/DashboardLayout.tsx
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const DashboardLayout: React.FC = () => {
  const location = useLocation();

  // 简单菜单项（如需扩展可外部化）
  const menus = [
    { to: "/", label: "Home" },
    { to: "/pools", label: "Pool List" },
    { to: "/serum", label: "Serum List" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
   

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center gap-4">
              {menus.map((m) => {
                const active = location.pathname === m.to;
                return (
                  <div className="flex h-14 items-center justify-between">
                  <Link
                    key={m.to}
                    to={m.to}
                    className={`px-3 py-1 rounded-md text-sm mx-2 ${
                      active ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {m.label}
                  </Link>
                  </div>
                );
              })}
            </nav>
          
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
