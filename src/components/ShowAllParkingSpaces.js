export default function ShowAllParkingSpaces({ slot }) {
  return (
    <div className="w-4/5 h-fit bg-white p-[20px] rounded-xl">
      <div className="size-full border p-2 border-black flex flex-wrap gap-[2em]">
        {+slot > 0 &&
          Array.from({ length: +slot }, (_, i) => {
            return (
              <div className="w-[7em] h-[12em] rounded-lg border border-black text-center" key={i}>
                <h4 className="font-bold">{i + 1}</h4> 
              </div>
            );
          })}
      </div>
    </div>
  );
}
