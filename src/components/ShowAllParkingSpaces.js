import React from "react";
import carImg from "../images/car.png";
import bikeImg from "../images/bike.png";

function ShowAllParkingSpaces({ slot, filledSlot, onRemoveVehicle }) {
  const getVehiclesInSlot = (slotNumber) => {
    return filledSlot.filter((vehicle) => vehicle.slot === slotNumber);
  };

  const getSlotStatus = (slotNumber) => {
    const vehicles = getVehiclesInSlot(slotNumber);
    if (vehicles.length === 0) return "empty";
    if (vehicles.some((v) => v.vehicleType === "car")) return "car";
    if (vehicles.length === 2) return "full";
    return "partial";
  };

  const getSlotColor = (status) => {
    switch (status) {
      case "empty":
        return "bg-gray-100";
      case "car":
        return "bg-blue-100";
      case "full":
        return "bg-green-100";
      case "partial":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  const getSlotText = (status) => {
    switch (status) {
      case "empty":
        return "خالی";
      case "car":
        return "خودرو";
      case "full":
        return "پر";
      case "partial":
        return "نیمه پر";
      default:
        return "خالی";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          وضعیت جای پارک‌ها
        </h2>
        <p className="text-sm text-gray-600">
          نمایش وضعیت تمام جای پارک‌های موجود
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: slot }, (_, i) => i + 1).map((slotNumber) => {
          const status = getSlotStatus(slotNumber);
          const vehicles = getVehiclesInSlot(slotNumber);

          return (
            <div
              key={slotNumber}
              className={`${getSlotColor(
                status
              )} rounded-lg p-4 relative group`}
            >
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <span className="text-lg font-semibold mb-2">
                  جای پارک {slotNumber}
                </span>
                <span className="text-sm mb-4">{getSlotText(status)}</span>

                <div className="flex flex-col items-center gap-2 w-full">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="relative group/item w-full flex justify-center"
                    >
                      <div className="relative">
                        {vehicle.vehicleType === "car" ? (
                          <img
                            src={carImg}
                            alt="خودرو"
                            className="w-[90px] h-[168px] object-contain"
                          />
                        ) : (
                          <img
                            src={bikeImg}
                            alt="موتورسیکلت"
                            className="w-[36px] h-[80px] object-contain"
                          />
                        )}
                        <button
                          onClick={() => onRemoveVehicle(vehicle.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover/item:opacity-100"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {vehicles.length > 0 && (
                  <div className="mt-2 text-xs text-center">
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="text-gray-600">
                        {vehicle.registration}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowAllParkingSpaces;
