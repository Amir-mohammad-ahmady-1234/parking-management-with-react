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
    <div className="vehicle-details-container w-4/5 h-[11rem] bg-white p-[20px] rounded-xl">
      <div className="size-full border border-black p-2 flex flex-col justify-between items-start capitalize text-[1.7rem] font-[600]">
        <h3 className="text-[1.3rem]">Available space: {AvailableSpace}</h3>
        <p className="text-[0.5em] mb-4 text-[red]">{Error}</p>
        <div className="vehicle-details w-full h-fit text-center text-[0.6em] flex items-center justify-center gap-10">
          <div className="space-x-2 text">
            <label>registration no</label>
            <input
              type={"text"}
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="ab-12-xy-1234"
              className="pl-[2px] border border-black w-[12rem] uppercase text-[1.3rem]"
            />
          </div>

          <div className="space-x-2">
            <label>color</label>
            <input
              type={"text"}
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="pl-[4px] border border-black w-[12rem] text-[1.3rem]"
            />
          </div>

          <div className="space-x-2">
            <label>vehicle type</label>
            <input
              type={"radio"}
              name="vehicle"
              value={vehicleSelected}
              onChange={(e) => setVehicleSelected('car')}
            />
            car
            <input
              type={"radio"}
              name="vehicle"
              value={vehicleSelected}
              onChange={(e) => setVehicleSelected('bike')}
            />
            bike
          </div>

          <button
            className="addBtn w-[4.5rem] h-[2.5rem] capitalize text-white font-bold text-xl rounded-lg hover:scale-105"
            onClick={onSelectedAvailableSpace}
          >
            <span className="text-center">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
