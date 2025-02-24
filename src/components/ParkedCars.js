import Table from "./Table";

export default function ParkedCars({
  isParkedTableOpen,
  filledSlot,
  setFilledSlot,
  setNumParkedAutomobiles,
  setIsAddAutomobileOpen,
  setIsErrorOpen1,
}) {
  return (
    <div className="w-4/5 h-fit bg-white p-[20px] rounded-xl">
      <div className="size-full border p-20 border-black">
        {isParkedTableOpen && filledSlot.length > 0 ? (
          <Table
            setFilledSlot={setFilledSlot}
            filledSlot={filledSlot}
            setNumParkedAutomobiles={setNumParkedAutomobiles}
            setIsAddAutomobileOpen={setIsAddAutomobileOpen}
            setIsErrorOpen1={setIsErrorOpen1}
          />
        ) : (
          <h1 className="uppercase text-[1.7rem] font-[600]">no parking</h1>
        )}
      </div>
    </div>
  );
}
