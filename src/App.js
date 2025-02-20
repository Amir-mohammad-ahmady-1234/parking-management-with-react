function App() {
  return (
    <div className="space-y-[30px] m-0 p-0 w-full min-h-screen flex-col justify-center bg-[url('./images/bg.jpg')] bg-top bg-[length:170%]">
      <header className="w-full h-[4rem] bg-[gray] flex justify-center items-center">
        <h1 className="font-bold text-[30px] capitalize">resalat parking</h1>
      </header>

      <main className="flex justify-center">
        <div className="w-3/4 h-fit bg-white p-[20px] rounded-xl">
          <div className="size-full border p-8 border-black capitalize flex justify-between items-center">
            <div className="space-x-2">
              <label className="text-xl font-[500]">
                total parking slots
              </label>
              <input
                type={"number"}
                className="border-[1px] border-black pl-1"
              />
            </div>
            <button className="size-fit px-[1.1rem] py-[6px] capitalize text-white font-bold text-xl rounded-lg bg-[red]">generate</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
