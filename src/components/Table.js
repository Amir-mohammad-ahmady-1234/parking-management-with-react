import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Table({
  filledSlot,
  setFilledSlot,
  setNumParkedAutomobiles,
  setIsAddAutomobileOpen,
  setIsErrorOpen1,
}) {
  const [filters, setFilters] = useState({
    registration: "",
    vehicleType: "",
    color: "",
    slot: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredVehicles = filledSlot.filter((vehicle) => {
    return (
      vehicle.registration
        .toLowerCase()
        .includes(filters.registration.toLowerCase()) &&
      vehicle.vehicleType
        .toLowerCase()
        .includes(filters.vehicleType.toLowerCase()) &&
      vehicle.color.toLowerCase().includes(filters.color.toLowerCase()) &&
      vehicle.slot.toString().includes(filters.slot)
    );
  });

  function handleExitClicked(vehicle) {
    let isPay = null;

    const nowTime = Math.round(Date.now() / 1000) - vehicle.EnterTime;
    const payCalculate = Math.round(nowTime / 10);

    if (vehicle.vehicleType === "car") {
      isPay = window.confirm(
        `parking charges: ${30 + payCalculate}. Payment completed?`
      );
    }

    if (vehicle.vehicleType === "bike") {
      isPay = window.confirm(
        `parking charges: ${20 + payCalculate}. Payment completed?`
      );
    }

    if (isPay) {
      setFilledSlot((vehicls) => [
        ...vehicls.filter((item) => item.id !== vehicle.id),
      ]);

      if (vehicle.vehicleType === "car") {
        setNumParkedAutomobiles((prev) => prev - 1);
      } else if (vehicle.vehicleType === "bike") {
        setNumParkedAutomobiles((prev) => prev - 0.5);
      }

      setIsAddAutomobileOpen(true);
      setIsErrorOpen1(false);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              شماره جای پارک
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              شماره پلاک
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              رنگ
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              نوع وسیله نقلیه
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              زمان ورود
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              عملیات
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filledSlot.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.slot}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.registration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {vehicle.color}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vehicle.vehicleType === "car"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {vehicle.vehicleType === "car" ? "خودرو" : "موتورسیکلت"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(vehicle.EnterTime * 1000).toLocaleTimeString("fa-IR")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => handleExitClicked(vehicle)}
                  className="text-red-600 hover:text-red-900 transition-colors duration-200"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
