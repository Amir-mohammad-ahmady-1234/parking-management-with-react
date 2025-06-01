import React from "react";

export default function AddAutomobile({
  AvailableSpace,
  licensePlate,
  setLicensePlate,
  vehicleColor,
  setVehicleColor,
  vehicleSelected,
  setVehicleSelected,
  onSelectedAvailableSpace,
  Error,
}) {
  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          ثبت خودرو جدید
        </h2>
        <p className="text-sm text-gray-600">
          فضای باقیمانده: {AvailableSpace} جای پارک
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSelectedAvailableSpace();
        }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="licensePlate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            شماره پلاک
          </label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="مثال: AB-12-XY-1234"
            className="input"
          />
        </div>

        <div>
          <label
            htmlFor="vehicleColor"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            رنگ خودرو
          </label>
          <input
            type="text"
            id="vehicleColor"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            placeholder="رنگ خودرو را وارد کنید"
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نوع وسیله نقلیه
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setVehicleSelected("car")}
              className={`btn ${
                vehicleSelected === "car" ? "btn-primary" : "btn-secondary"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
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
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <span>خودرو</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setVehicleSelected("bike")}
              className={`btn ${
                vehicleSelected === "bike" ? "btn-primary" : "btn-secondary"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>موتورسیکلت</span>
              </div>
            </button>
          </div>
        </div>

        {Error}

        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            ثبت خودرو
          </button>
        </div>
      </form>
    </div>
  );
}
