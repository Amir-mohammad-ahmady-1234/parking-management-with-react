import React from "react";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">
              سیستم مدیریت پارکینگ
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-600">مدیریت هوشمند پارکینگ</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
