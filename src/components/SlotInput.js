import React from 'react';

function SlotInput({ slot, setSlot, setIsErrorOpen1 }) {
  return (
    <div className="card max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          تنظیم تعداد جای پارک
        </h2>
        <p className="text-sm text-gray-600">
          لطفاً تعداد کل جای پارک را وارد کنید
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="slotCount" className="block text-sm font-medium text-gray-700 mb-1">
            تعداد جای پارک
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="slotCount"
              value={slot}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0) {
                  setSlot(value);
                  setIsErrorOpen1("");
                }
              }}
              min="0"
              className="input"
              placeholder="تعداد جای پارک را وارد کنید"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>هر جای پارک می‌تواند یک خودرو یا دو موتورسیکلت را در خود جای دهد</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotInput;
