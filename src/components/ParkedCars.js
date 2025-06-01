import React from "react";
import Table from "./Table";

function ParkedCars({ filledSlot }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          خودروهای پارک شده
        </h2>
        <p className="text-sm text-gray-600">
          لیست تمام خودروهای پارک شده در پارکینگ
        </p>
      </div>

      {filledSlot.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            هیچ خودرویی پارک نشده است
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            برای شروع، یک خودرو جدید اضافه کنید.
          </p>
        </div>
      ) : (
        <Table filledSlot={filledSlot} />
      )}
    </div>
  );
}

export default ParkedCars;
