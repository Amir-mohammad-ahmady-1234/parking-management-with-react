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
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Registration Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Vehicle Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Slot
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
              <input
                type="text"
                name="registration"
                value={filters.registration}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Reg. Number"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                name="vehicleType"
                value={filters.vehicleType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Vehicle Type"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                name="color"
                value={filters.color}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Color"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                name="slot"
                value={filters.slot}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Slot"
              />
            </td>
            <td className="px-6 py-4">
              <div className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Filter
              </div>
            </td>
          </tr>

          {filteredVehicles.map((vehicle) => (
            <tr className="hover:bg-gray-50 transition-colors" key={vehicle.id}>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.registration}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.vehicleType}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.color}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {vehicle.slot}
              </td>
              <td className="px-6 py-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => handleExitClicked(vehicle)}
                >
                  Exit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}