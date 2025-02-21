export default function SlotSelection({ children, Error }) {
  return (
    <div className="w-4/5 h-fit bg-white p-[20px] rounded-xl">
      <div className="slot-selected size-full border p-8 border-black capitalize flex flex-col space-y-4">
        <div className="flex justify-between items-center">{children}</div>
        <div className="text-[red] text-[0.9em] font-[500]">{Error}</div>
      </div>
    </div>
  );
}
