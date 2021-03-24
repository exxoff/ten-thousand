import "./App.css";
import { Player } from "./components/Player";

function App() {
  return (
    <div className="App">
      <div className="flex-col mt-9 container mx-auto">
        <div className="flex space-x-3 bg-gray-500 justify-center">
          <button className="border-gray-700 rounded-md bg-blue-700 py-1 px-3 text-white font-bold">
            Reset
          </button>
          <button className="border-gray-700 rounded-md bg-blue-700 py-1 px-3 text-white font-bold">
            Reset score
          </button>
          <button className="border-gray-700 rounded-md bg-blue-700 py-1 px-3 text-white font-bold">
            Add Player
          </button>
        </div>
        <div className="flex flex-col items-center mx-2">
          <Player playerName="Per" />
          <Player playerName="Titti" />
        </div>
      </div>
    </div>
  );
}

export default App;
