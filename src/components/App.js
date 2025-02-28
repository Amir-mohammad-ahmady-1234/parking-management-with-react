import { useState, useEffect } from "react"; // useEffect اضافه شد

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
    let parkedCount = 0
      filledSlot.filter(vehicle => {
        if (vehicle.vehicleType === 'car') {
          parkedCount++
        } else if (vehicle.vehicleType === 'bike') {
          parkedCount += 0.5
        }
      })    

      return parkedCount
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

  // // useEffect to check Available Space and close the box
  useEffect(() => {
    if (AvailableSpace <= 0) {
      setIsAddAutomobileOpen(false);
    }
  }, [AvailableSpace]);

  // useEffect to first cliked on add new vehicle
  useEffect(
    function () {
      if (filledSlot.length > 0) {
        setIsParkedTableOpen(true);
      }
    },
    [filledSlot]
  );

  // local storage added
  useEffect(
    function () {
      localStorage.setItem("filledSlot", JSON.stringify(filledSlot));
    },
    [filledSlot]
  );

  useEffect(
    function () {
      localStorage.setItem("slot", JSON.stringify(slot));
    },
    [slot]
  );

  function handleIsAddCarOpen() {
    if (AvailableSpace > 0) {
      setIsAddAutomobileOpen((is) => !is);
      setIsErrorOpen1("");
      // Clear all errors when the box is opened
      setIsRegistrationError("");
      setIsColorError("");
      setIsVehicleSelectedError("");
      setIsErrorOpen2("");
    } else {
      setIsErrorOpen1("Enter or add the total number of parking spaces");
    }
  }

  function handleSelectedAvailableSpace() {
    // Check for duplicate license plate
    const isDuplicate = filledSlot.some(
      (vehicle) => vehicle.registration === licensePlate
    );

    if (isDuplicate) {
      setIsRegistrationError("License plate is duplicate");
      return;
    } else {
      setIsRegistrationError("");
    }

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

    // Find the first available slot based on vehicle type
    let newSlot = 1;
    let isSlotFound = false;

    while (!isSlotFound && newSlot <= slot) {
      const vehiclesInSlot = filledSlot.filter((v) => v.slot === newSlot);

      if (vehicleSelected === "car") {
        // For cars, the slot must be completely empty
        if (vehiclesInSlot.length === 0) {
          isSlotFound = true;
        } else {
          newSlot++;
        }
      } else if (vehicleSelected === "bike") {
        // For bikes, the slot can have up to 2 bikes and no cars
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
      setIsErrorOpen2("No available slot for the selected vehicle type");
      return;
    } else {
      setIsErrorOpen2("");
    }

    // Update the number of parked vehicles
    if (vehicleSelected === "car") {
      setNumParkedAutomobiles((prev) => prev + 1);
    } else if (vehicleSelected === "bike") {
      setNumParkedAutomobiles((prev) => prev + 0.5);
    }

    // Create the new vehicle object
    const newVehicle = {
      id: crypto.randomUUID(),
      slot: newSlot,
      registration: licensePlate,
      color: vehicleColor,
      vehicleType: vehicleSelected,
      EnterTime: Math.round(Date.now() / 1000),
    };

    // Add the new vehicle to the filledSlot array
    setFilledSlot((prev) => [...prev, newVehicle]);

    // Reset the form fields
    setLicensePlate("");
    setVehicleColor("");
    // setVehicleSelected("");
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

        <ParkedCars
          isParkedTableOpen={isParkedTableOpen}
          filledSlot={filledSlot}
          setFilledSlot={setFilledSlot}
          setNumParkedAutomobiles={setNumParkedAutomobiles}
          setIsAddAutomobileOpen={setIsAddAutomobileOpen}
          setIsErrorOpen1={setIsErrorOpen1}
        />
        <ShowAllParkingSpaces slot={slot} filledSlot={filledSlot} />
      </Main>
    </div>
  );
}

export default App;
