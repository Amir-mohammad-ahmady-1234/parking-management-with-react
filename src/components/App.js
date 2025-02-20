import Header from "./Header";
import Main from "./Main";
import SlotSelection from "./SlotSelection";
import SlotInput from "./SlotInput";
import SlotGenerationBtn from "./SlotGenerationBtn";
import ParkedCars from "./ParkedCars";
import ShowAllParkingSpaces from "./ShowAllParkingSpaces";

function App() {
  return (
    <div className="parking-container space-y-[30px] m-0 p-0 w-full min-h-screen flex-col justify-center bg-[url('./images/bg.jpg')] bg-top bg-[length:170%] bg-no-repeat">
      <Header />

      <Main>
        <SlotSelection>
          <SlotInput />
          <SlotGenerationBtn />
        </SlotSelection>

        <ParkedCars />
        <ShowAllParkingSpaces />
      </Main>
    </div>
  );
}
export default App;
