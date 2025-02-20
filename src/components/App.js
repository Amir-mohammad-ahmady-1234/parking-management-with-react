import Header from "./Header";
import Main from "./Main";
import SlotSelection from "./SlotSelection";
import SlotInput from "./SlotInput";
import SlotGenerationBtn from "./SlotGenerationBtn";
import ParkedCars from "./ParkedCars";
import ShowAllParkingSpaces from "./ShowAllParkingSpaces";
import { useState } from "react";

function App() {
  const [slot, setSlot] = useState('')
  return (
    <div className="parking-container space-y-[30px] m-0 p-0 w-full min-h-[100vh] flex-col justify-center bg-[url('./images/bg.jpg')] bg-cover bg-[length:170%] bg-no-repeat">
      <Header />

      <Main>
        <SlotSelection>
          <SlotInput slot={slot} setSlot={setSlot} />
          <SlotGenerationBtn />
        </SlotSelection>

        <ParkedCars />
        <ShowAllParkingSpaces slot={slot} />
      </Main>
    </div>
  );
}
export default App;
