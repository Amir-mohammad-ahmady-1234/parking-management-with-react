import React from "react";

function SlotSelection({ children, Error }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        {children}
      </div>
      {Error}
    </div>
  );
}

export default SlotSelection;
