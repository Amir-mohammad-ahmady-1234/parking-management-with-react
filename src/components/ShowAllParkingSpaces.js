import carImg from "../images/car.png";
import bikeImg from "../images/bike.png";

export default function ShowAllParkingSpaces({ slot, filledSlot }) {
  return (
    <div className="w-4/5 h-fit bg-white p-[20px] rounded-xl">
      <div className="size-full border p-2 border-black flex flex-wrap gap-[2em]">
        {+slot > 0 &&
          Array.from({ length: +slot }, (_, i) => {
            return (
              <div
                className="w-[7em] h-[12em] rounded-lg border border-black text-center flex flex-col items-center justify-start"
                key={i}
              >
                <h4 className="font-bold">{i + 1}</h4>
                {filledSlot.length > 0 &&
                  filledSlot.map((vehicle) => {
                    return vehicle.slot === i + 1 &&
                      vehicle.vehicleType === "car" ? (
                      <img
                        src={carImg}
                        alt="vehicle img"
                        className='w-[90px] h-[168px]'
                        key={vehicle.id}
                      />
                    ) : vehicle.slot === i + 1 &&
                      vehicle.vehicleType === "bike" ? (
                      <img
                        src={bikeImg}
                        alt="vehicle img"
                        className='w-[36px] h-[80px]'
                        key={vehicle.id}
                      />
                    ) : (
                      ""
                    );
                  })}
                {/* <img src={carImg} alt="vehicle img" className='w-[90px] h-[168px]' /> */}
                {/* <img src={bikeImg} alt="vehicle img" className='w-[36px] h-[80px]' /> */}
                {/* <img src={bikeImg} alt="vehicle img" className='w-[36px] h-[80px] justify-self-center' /> */}
              </div>
            );
          })
          }
      </div>
    </div>
  );
}
