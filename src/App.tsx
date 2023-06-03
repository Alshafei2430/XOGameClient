import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="bg-gradient-to-r from-purple-500  to-pink-500 flex flex-col h-screen">
      <div className="h-full mx-auto w-full my-10 max-w-4xl">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
