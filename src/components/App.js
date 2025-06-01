import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import SlotSelection from "./SlotSelection";
import SlotInput from "./SlotInput";
import SlotGenerationBtn from "./SlotGenerationBtn";
import ParkedCars from "./ParkedCars";
import ShowAllParkingSpaces from "./ShowAllParkingSpaces";
import AddAutomobile from "./AddAutomobile";
import Error from "./Error";

const pattern = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/i;

function App() {
  const [slot, setSlot] = useState(function () {
    const storedStorage = localStorage.getItem("slot");
    if (storedStorage) {
      return JSON.parse(storedStorage);
    } else {
      return 0;
    }
  });

  const [isAddAutomobileOpen, setIsAddAutomobileOpen] = useState(false);
  const [filledSlot, setFilledSlot] = useState(function () {
    const storedStorage = localStorage.getItem("filledSlot");
    if (storedStorage) {
      return JSON.parse(storedStorage);
    } else {
      return [];
    }
  });

  const [numParkedAutomobiles, setNumParkedAutomobiles] = useState(function () {
    let parkedCount = 0;
    filledSlot.forEach((vehicle) => {
      if (vehicle.vehicleType === "car") {
        parkedCount++;
      } else if (vehicle.vehicleType === "bike") {
        parkedCount += 0.5;
      }
    });
    return parkedCount;
  });

  const [isParkedTableOpen, setIsParkedTableOpen] = useState(false);

  // Errors state
  const [isErrorOpen1, setIsErrorOpen1] = useState("");
  const [isErrorOpen2, setIsErrorOpen2] = useState("");
  const [isRegistrationError, setIsRegistrationError] = useState("");
  const [isColorError, setIsColorError] = useState("");
  const [isVehicleSelectedError, setIsVehicleSelectedError] = useState("");

  // add new Vehicle states
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleSelected, setVehicleSelected] = useState("");

  // derived state
  const AvailableSpace = slot - numParkedAutomobiles;

  useEffect(() => {
    if (AvailableSpace <= 0) {
      setIsAddAutomobileOpen(false);
    }
  }, [AvailableSpace]);

  useEffect(() => {
    if (filledSlot.length > 0) {
      setIsParkedTableOpen(true);
    }
  }, [filledSlot]);

  useEffect(() => {
    localStorage.setItem("filledSlot", JSON.stringify(filledSlot));
  }, [filledSlot]);

  useEffect(() => {
    localStorage.setItem("slot", JSON.stringify(slot));
  }, [slot]);

  function handleIsAddCarOpen() {
    if (AvailableSpace > 0) {
      setIsAddAutomobileOpen((is) => !is);
      setIsErrorOpen1("");
      setIsRegistrationError("");
      setIsColorError("");
      setIsVehicleSelectedError("");
      setIsErrorOpen2("");
    } else {
      setIsErrorOpen1("لطفاً تعداد جای پارک را وارد کنید");
    }
  }

  function handleSelectedAvailableSpace() {
    const isDuplicate = filledSlot.some(
      (vehicle) => vehicle.registration === licensePlate
    );

    if (isDuplicate) {
      setIsRegistrationError("این شماره پلاک قبلاً ثبت شده است");
      return;
    }

    if (!pattern.test(licensePlate)) {
      setIsRegistrationError("فرمت شماره پلاک صحیح نیست - مثال: AB-12-XY-1234");
      return;
    }

    if (!vehicleColor) {
      setIsColorError("لطفاً رنگ خودرو را وارد کنید");
      return;
    }

    if (!vehicleSelected) {
      setIsVehicleSelectedError("لطفاً نوع وسیله نقلیه را انتخاب کنید");
      return;
    }

    let newSlot = 1;
    let isSlotFound = false;

    while (!isSlotFound && newSlot <= slot) {
      const vehiclesInSlot = filledSlot.filter((v) => v.slot === newSlot);

      if (vehicleSelected === "car") {
        if (vehiclesInSlot.length === 0) {
          isSlotFound = true;
        } else {
          newSlot++;
        }
      } else if (vehicleSelected === "bike") {
        if (
          vehiclesInSlot.length < 2 &&
          vehiclesInSlot.every((v) => v.vehicleType === "bike")
        ) {
          isSlotFound = true;
        } else {
          newSlot++;
        }
      }
    }

    if (!isSlotFound) {
      setIsErrorOpen2("جای پارک مناسب برای این نوع وسیله نقلیه موجود نیست");
      return;
    }

    if (vehicleSelected === "car") {
      setNumParkedAutomobiles((prev) => prev + 1);
    } else if (vehicleSelected === "bike") {
      setNumParkedAutomobiles((prev) => prev + 0.5);
    }

    const newVehicle = {
      id: crypto.randomUUID(),
      slot: newSlot,
      registration: licensePlate,
      color: vehicleColor,
      vehicleType: vehicleSelected,
      EnterTime: Math.round(Date.now() / 1000),
    };

    setFilledSlot((prev) => [...prev, newVehicle]);
    setLicensePlate("");
    setVehicleColor("");
    setVehicleSelected("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <SlotSelection
              Error={isErrorOpen1 && <Error message={isErrorOpen1} />}
            >
              <SlotInput
                slot={slot}
                setSlot={setSlot}
                setIsErrorOpen1={setIsErrorOpen1}
              />
              <SlotGenerationBtn
                onIsAddCarOpen={handleIsAddCarOpen}
                slot={slot}
                isAddAutomobileOpen={isAddAutomobileOpen}
              />
            </SlotSelection>
          </div>

          {isAddAutomobileOpen && slot > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <AddAutomobile
                AvailableSpace={AvailableSpace}
                licensePlate={licensePlate}
                setLicensePlate={setLicensePlate}
                vehicleColor={vehicleColor}
                setVehicleColor={setVehicleColor}
                vehicleSelected={vehicleSelected}
                setVehicleSelected={setVehicleSelected}
                onSelectedAvailableSpace={handleSelectedAvailableSpace}
                Error={
                  isRegistrationError ? (
                    <Error message={isRegistrationError} />
                  ) : isColorError ? (
                    <Error message={isColorError} />
                  ) : isVehicleSelectedError ? (
                    <Error message={isVehicleSelectedError} />
                  ) : isErrorOpen2 ? (
                    <Error message={isErrorOpen2} />
                  ) : (
                    ""
                  )
                }
              />
            </div>
          )}

          {isParkedTableOpen && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ParkedCars filledSlot={filledSlot} />
            </div>
          )}

          {slot > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ShowAllParkingSpaces
                slot={slot}
                filledSlot={filledSlot}
                onRemoveVehicle={(id) => {
                  const vehicle = filledSlot.find((v) => v.id === id);
                  if (vehicle) {
                    if (vehicle.vehicleType === "car") {
                      setNumParkedAutomobiles((prev) => prev - 1);
                    } else if (vehicle.vehicleType === "bike") {
                      setNumParkedAutomobiles((prev) => prev - 0.5);
                    }
                    setFilledSlot((prev) => prev.filter((v) => v.id !== id));
                  }
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
