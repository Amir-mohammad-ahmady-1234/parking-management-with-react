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

function App() {
  const [slot, setSlot] = useState("");
  const [isAddAutomobileOpen, setIsAddAutomobileOpen] = useState(false);
  const [numParkedAutomobiles, setNumParkedAutomobiles] = useState(0);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  // drived state
  const AvailableSpace = slot - numParkedAutomobiles;

  function handleIsAddCarOpen() {
    if (slot > 0) {
      setIsAddAutomobileOpen((is) => !is);
      setIsErrorOpen(false);
    } else {
      setIsErrorOpen(true);
    }
  }

  return (
    <div className="parking-container space-y-[30px] m-0 p-0 w-full min-h-[100vh] flex-col justify-center bg-[url('./images/bg.jpg')] bg-cover bg-[length:170%] bg-no-repeat">
      <Header />

      <Main>
        <SlotSelection Error={isErrorOpen ? <Error /> : ""}>
          <SlotInput
            slot={slot}
            setSlot={setSlot}
            setIsErrorOpen={setIsErrorOpen}
          />
          <SlotGenerationBtn
            onIsAddCarOpen={handleIsAddCarOpen}
            slot={slot}
            isAddAutomobileOpen={isAddAutomobileOpen}
          />
        </SlotSelection>

        {isAddAutomobileOpen && slot > 0 && (
          <AddAutomobile AvailableSpace={AvailableSpace} />
        )}

        <ParkedCars />
        <ShowAllParkingSpaces slot={slot} />
      </Main>
    </div>
  );
}
export default App;
