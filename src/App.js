import { useState, useRef } from "react";
import "./App.css";
import { PlayerCard } from "./components/PlayerCard";
import ReactModal from "react-modal";

function App() {
  const [players, setPlayers] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState("");

  const playerInput = useRef(null);

  const addPlayer = () => {
    console.log(players.length);
    const num = players.length + 1;
    const p = { id: num, name: newPlayer };
    setPlayers((players) => [...players, p]);
    closeModal();
  };

  const onReset = () => {
    setPlayers([]);
  };

  const onResetScore = () => {
    setPlayers(...players);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const openModal = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setNewPlayer(event.target.value);
  };
  const modalAfterOpen = () => {
    playerInput.current.focus();
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <div className="flex flex-col mt-4 container mx-auto mb">
        <div className="text-3xl justify-center mx-auto font-custom">
          10 000 score sheet
        </div>
        <div className="flex space-x-3 justify-center mt-5">
          <button
            className="rounded-md bg-blue-700 py-1 px-3 text-white font-bold font-custom"
            onClick={() => onReset()}>
            Reset
          </button>
          {/* <button
            className="rounded-md bg-blue-700 py-1 px-3 text-white font-bold"
            onClick={() => onResetScore()}>
            Reset score
          </button> */}
          <button
            className="rounded-md bg-blue-700 py-1 px-3 text-white font-bold font-custom"
            onClick={() => openModal()}>
            Add Player
          </button>
        </div>
        <div className="flex flex-col items-center mx-2">
          {players.map((player) => (
            <PlayerCard playerName={player.name} key={player.id} />
          ))}
          <div className="italic items-center mx-auto text-xs font-custom mt-6">
            <ul className="justify-center">
              <li>Add players by hitting the button.</li>
              <li>
                Update score by tapping the player card and type in the score
                for the round
              </li>
              <li>Reset deletes all users.</li>
              <li>
                To reset just the score, tap the user and type a 0 (zero).
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={isOpen}
        onAfterOpen={modalAfterOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Player">
        <div className="flex flex-col">
          <h2 className="font-bold">Add player</h2>
          <div className="flex flex-row justify-evenly">
            <form onSubmit={() => addPlayer()}>
              <input
                className="mr-3"
                type="text"
                ref={playerInput}
                onChange={(e) => handleChange(e)}
              />
            </form>

            <div
              className="cursor-pointer bg-blue-700 text-white rounded justify-center px-2"
              onClick={() => addPlayer()}>
              Add
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default App;
