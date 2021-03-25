import { useState, useRef, useReducer, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { AppReducer, initializer } from "./context/AppReducer";
import { PlayerCard } from "./components/PlayerCard";
import ReactModal from "react-modal";

function App() {
  const [state, dispatch] = useReducer(AppReducer, [], initializer);
  const [isOpen, setOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState("");

  const playerInput = useRef(null);

  const setDisabled = (button) => {
    button.classList.remove("border-gray-400");

    button.disabled = true;
    button.classList.add("border-gray-200");
    button.classList.add("text-gray-200");
  };
  const setEnabled = (button) => {
    button.classList.add("border-gray-400");

    button.disabled = false;
    button.classList.remove("border-gray-200");
    button.classList.remove("text-gray-200");
  };
  useEffect(() => {
    // if (state.length === 0) {

    //   setDisabled(document.getElementById("btnResetScore"));
    // }

    if (state.some((p) => p.score !== 0)) {
      setEnabled(document.getElementById("btnResetScore"));
      setDisabled(document.getElementById("btnNewPlayer"));
    }

    localStorage.setItem("localtt", JSON.stringify(state));
  }, [state]);

  const addPlayer = () => {
    dispatch({
      type: "ADD-PLAYER",
      payload: {
        id: state.length,
        name: newPlayer,
        score: 0,
      },
    });
    setEnabled(document.getElementById("btnReset"));
    closeModal();
  };

  const onReset = () => {
    setDisabled(document.getElementById("btnReset"));
    setDisabled(document.getElementById("btnResetScore"));
    setEnabled(document.getElementById("btnNewPlayer"));
    dispatch({
      type: "RESET",
    });
  };

  const onResetScore = () => {
    dispatch({
      type: "RESET-SCORE",
    });
    setDisabled(document.getElementById("btnResetScore"));
    setEnabled(document.getElementById("btnNewPlayer"));
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
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <div className="flex flex-col container mx-auto h-screen">
          <div className="mb-auto">
            <div className="text-3xl mx-auto font-custom mt-5 text-center">
              10 000 score sheet
            </div>
            <div className="flex space-x-3 justify-center mt-5">
              <button
                id="btnNewPlayer"
                className="rounded-md border-solid border-2 border-gray-400 px-1 py-1 font-bold font-custom text-sm md:text-lg md:px-3"
                onClick={() => openModal()}>
                Add Player
              </button>
              <button
                id="btnResetScore"
                className="rounded-md border-solid border-2 border-gray-400 px-1 py-1 font-bold font-custom text-sm md:text-lg md:px-3"
                onClick={() => onResetScore()}>
                Reset score
              </button>
              <button
                id="btnReset"
                className="rounded-md border-solid border-2 border-gray-400 px-1 py-1 font-bold font-custom text-sm md:text-lg md:px-3"
                onClick={() => onReset()}>
                Reset
              </button>
            </div>
            <div className="flex flex-col items-center mx-2">
              {state.map((player) => (
                <PlayerCard
                  playerName={player.name}
                  id={player.id}
                  key={player.id}
                  score={player.score}
                />
              ))}
              <div className="italic text-xs font-custom mt-6">
                <ul className="">
                  <li>Add players by hitting the button.</li>
                  <li>
                    Update score by tapping the player card and type in the
                    score for the round
                  </li>
                  <li>Reset deletes all users.</li>
                  <li>
                    If you need to correct a score, it's possible to use
                    negative values
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
                    maxLength="15"
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
          <div className="text-center italic text-xs md:text-sm">
            v. 2.0.1 Source:{" "}
            <a href="https://github.com/exxoff/ten-thousand">Github</a>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
