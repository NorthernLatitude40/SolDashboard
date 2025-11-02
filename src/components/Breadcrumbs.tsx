// src/components/Breadcrumbs.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const routeNameMap: Record<string, string> = {
  "/": "Home",
  "/pools": "Pool List",
  "/serum": "Serum List",
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean); // ["pools"] 或 ["serum"]

  return (
    <nav className="text-gray-600 text-sm mb-4" aria-label="breadcrumb">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="font-semibold">{routeNameMap[to] || value}</span>
              ) : (
                <Link to={to} className="hover:text-blue-500">
                  {routeNameMap[to] || value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
