export default function SlotInput({ slot, setSlot, setIsErrorOpen1 }) {
  function handleChangeSlotInput(e) {
    setSlot(e.target.value);
    slot >= 0 && setIsErrorOpen1("");
  }
  return (
    <div className="space-x-2">
      <label className="text-xl font-[500]">total parking slots</label>
      <input
        type={"number"}
        className="border-[1px] border-black pl-1 font-[500]"
        value={slot < 0 ? 0 : slot}
        onChange={(e) => handleChangeSlotInput(e)}
      />
    </div>
  );
}
