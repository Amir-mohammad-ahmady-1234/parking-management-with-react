import { useState } from "react";

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
  const [slot, setSlot] = useState("");
  const [isAddAutomobileOpen, setIsAddAutomobileOpen] = useState(false);
  const [numParkedAutomobiles, setNumParkedAutomobiles] = useState(0);
  const [filledSlot, setFilledSlot] = useState([]);

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

  // drived state
  const AvailableSpace = slot - numParkedAutomobiles;

  function handleIsAddCarOpen() {
    if (AvailableSpace > 0) {
      setIsAddAutomobileOpen((is) => !is);
      setIsErrorOpen1("");
    } else {
      setIsErrorOpen1("Enter or add the total number of parking spaces");
    }
  }

  function handleSelectedAvailableSpace() {
    if (!pattern.test(licensePlate)) {
      setIsRegistrationError(
        "Enter registration number in correct format - AB-12-XY-1234"
      );
      return;
    } else {
      setIsRegistrationError("");
    }

    if (!vehicleColor) {
      setIsColorError("Enter correct colour value");
      return;
    } else {
      setIsColorError("");
    }

    if (!vehicleSelected) {
      setIsVehicleSelectedError("Please select vehicle type");
      return;
    } else {
      setIsVehicleSelectedError("");
    }

    if (vehicleSelected === "car") {
      setNumParkedAutomobiles((prev) =>
        AvailableSpace >= 1 ? prev + 1 : prev
      );
    } else if (vehicleSelected === "bike") {
      setNumParkedAutomobiles((prev) =>
        AvailableSpace >= 0.5 ? prev + 0.5 : prev
      );
    }

    if (vehicleSelected === "car" && AvailableSpace === 0.5) {
      setIsErrorOpen2("space not enough to accomodate new vehicle");
      return;
    } else {
      setIsErrorOpen2("");
    }

    if (
      (vehicleSelected === "car" && AvailableSpace <= 1) ||
      (vehicleSelected === "bike" && AvailableSpace <= 0.5)
    ) {
      setIsAddAutomobileOpen(false);
      setIsErrorOpen2(false);
    }

    setLicensePlate("");
    setVehicleColor("");
    // setVehicleSelected("");

    const isSlotNumRound = isRound(slot - AvailableSpace);

    let newVehicle = {
      id: crypto.randomUUID(),
      slot:
        isSlotNumRound || vehicleSelected === "car"
          ? Math.ceil(slot - AvailableSpace + 1)
          : Math.ceil(slot - AvailableSpace),
      registration: licensePlate,
      color: vehicleColor,
      vehicleType: vehicleSelected,
    };

    setFilledSlot((items) => [...items, newVehicle]);
  }

  function isRound(num) {
    return num === Math.round(num);
  }

  return (
    <div className="parking-container space-y-[30px] m-0 p-0 w-full min-h-[100vh] flex-col justify-center bg-[url('./images/bg.jpg')] bg-cover bg-[length:170%] bg-no-repeat">
      <Header />

      <Main>
        <SlotSelection Error={isErrorOpen1 && <Error message={isErrorOpen1} />}>
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

        {isAddAutomobileOpen && slot > 0 && (
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
        )}

        <ParkedCars />
        <ShowAllParkingSpaces slot={slot} filledSlot={filledSlot} />
      </Main>
    </div>
  );
}
export default App;
