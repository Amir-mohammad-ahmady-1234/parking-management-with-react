export default function SlotSelection({ children }) {
  return (
    <div className="w-3/4 h-fit bg-white p-[20px] rounded-xl">
      <div className="slot-selected size-full border p-8 border-black capitalize flex justify-between items-center">
        {children}
      </div>
    </div>
  );
}
