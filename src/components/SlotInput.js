export default function SlotInput({slot, setSlot}) {
  return (
    <div className="space-x-2">
      <label className="text-xl font-[500]">total parking slots</label>
      <input
        type={"number"}
        className="border-[1px] border-black pl-1 font-[500]"
        value={slot}
        onChange={e => setSlot(e.target.value)}
      />
    </div>
  );
}
