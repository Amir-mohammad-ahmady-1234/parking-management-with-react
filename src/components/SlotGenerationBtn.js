import React from "react";

function SlotGenerationBtn({ onIsAddCarOpen, slot, isAddAutomobileOpen }) {
  return (
    <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse">
      <button
        onClick={onIsAddCarOpen}
        disabled={slot <= 0}
        className={`btn ${
          slot <= 0
            ? "bg-gray-300 cursor-not-allowed"
            : isAddAutomobileOpen
            ? "btn-secondary"
            : "btn-primary"
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isAddAutomobileOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M12 6v6m0 0v6m0-6h6m-6 0H6"
              }
            />
          </svg>
          <span>{isAddAutomobileOpen ? "بستن فرم" : "افزودن خودرو"}</span>
        </div>
      </button>
    </div>
  );
}

export default SlotGenerationBtn;
