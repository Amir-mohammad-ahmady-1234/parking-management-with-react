export default function SlotGenerationBtn({
  onIsAddCarOpen,
  isAddAutomobileOpen,
  slot,
}) {
  return (
    <button
      className="generate-btn w-[7rem] h-[2.5rem] capitalize text-white font-bold text-xl rounded-lg hover:scale-105"
      onClick={onIsAddCarOpen}
    >
      <span className="text-center">
        {isAddAutomobileOpen && slot > 0 ? "close" : "generate"}
      </span>
    </button>
  );
}
