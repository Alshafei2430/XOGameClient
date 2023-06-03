import { useState, useEffect } from "react";
import { socket } from "../socket";

const GameBoard = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill("")); // Represents the game board state
  const [currentPlayer, setCurrentPlayer] = useState<string>("X"); // Tracks the current player ('X' or 'O')

  const [result, setResult] = useState<string>("");

  const handleCellClick = (index: number) => {
    // Emit the makeMove event to the server
    socket.emit("makeMove", index);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    socket.emit("resetBoard");
  };

  useEffect(() => {
    socket.on("connect", () => console.log("connected"));

    socket.on(
      "moveMade",
      ({ index, player }: { index: number; player: string }) => {
        const updatedBoard = [...board];
        updatedBoard[index] = player;
        setBoard(updatedBoard);
        setCurrentPlayer(player === "X" ? "O" : "X");
      }
    );

    socket.on("gameOver", ({ result }: { result: string }) => {
      // Handle the game over event
      // You can display the winner or perform any necessary actions
      setResult(result);
      setCurrentPlayer("");
    });

    socket.on("boardReset", () => {
      setBoard(Array(9).fill(""));
      setResult("");
    });

    return () => {
      socket.off("connect");
    };
  }, [board]);

  return (
    <div className="rounded p-4 shadow-lg font-thin text-gray-700 h-full  bg-slate-100 border-4 border-pink-400 flex flex-col">
      <h2 className="text-center my-2 text-4xl ">
        {!result && (
          <p>
            Player to play <span className="font-bold">{currentPlayer}</span>
          </p>
        )}
      </h2>

      <h1 className="text-4xl text-center">{result && <p>{result}</p>}</h1>

      <div className="grid-cols-3 grid gap-2 my-4">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`hover:shadow-xl border-2 text-violet-600 bg-indigo-300 border-gray-300 rounded flex items-center justify-center text-[150px] cursor-pointer h-56 ${
              result ? "pointer-events-none" : ""
            }`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="flex justify-between mx-4">
        {/* <h1 className="text-4xl">{draw && <p>{draw}</p>}</h1> */}
        <button
          className="bg-pink-400 px-4 py-2 rounded-full text-white uppercase font-bold shadow-sm hover:shadow-lg"
          onClick={handleReset}
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
