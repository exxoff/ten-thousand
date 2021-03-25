import { useState, useContext, useRef } from "react";
import ReactModal from "react-modal";
import { AppContext } from "../context/AppContext";
import dice from "../static/dice.png";

export const PlayerCard = ({ playerName, id }) => {
  const [isOpen, setOpen] = useState(false);
  // const [points, setPoints] = useState(0);
  // const [newPoints, setNewPoints] = useState(0);
  const { state, dispatch } = useContext(AppContext);

  const player = state.find((e) => e.id === id);
  const handleClick = (event) => {
    event.preventDefault();
    setOpen(true);
    // alert(`You clicked on ${playerName}`);
  };

  const pointInput = useRef(null);

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

  // const handleChange = (event) => {
  //   setNewPoints(event.target.value);
  // };
  const modalAfterOpen = () => {
    pointInput.current.focus();
  };
  const contentLabel = `Add points to ${playerName}`;
  const closeModal = () => {
    setOpen(false);
  };

  const addPoints = () => {
    // if (Number(newPoints) === 0) {
    //   setPoints(0);
    // } else {
    //   setPoints(Number(points) + Number(newPoints));
    // }
    dispatch({
      type: "ADD-SCORE",
      payload: {
        id: id,
        name: playerName,
        points: Number(pointInput.current.value),
      },
    });
    closeModal();
  };

  // const addPoints = () => {
  //   onAddPoints(newPoints);
  //   closeModal();
  // };
  return (
    <>
      <div
        className="max-w-md md:w-8/12 w-full bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg mt-1 md:mt-3"
        onClick={(e) => handleClick(e, 0, playerName)}>
        <div className="flex justify-between">
          <div className=" flex">
            <div className="text-xl text-red-700 font-bold font-custom ml-3">
              {playerName}
            </div>
          </div>
          <div className="text-xl text-green-900 font-custom">
            <h4>{player.score}</h4>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={modalAfterOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={contentLabel}>
        <div className="flex flex-col">
          <h2 className="font-bold">{contentLabel}</h2>
          <div className="flex flex-row justify-evenly">
            <form onSubmit={() => addPoints()}>
              <input
                className="mr-3"
                type="number"
                id="addpoints"
                name="addpoints"
                ref={pointInput}
                // onChange={(e) => handleChange(e)}
              />
            </form>

            <div
              className="cursor-pointer bg-blue-700 text-white rounded justify-center px-2"
              onClick={() => addPoints()}>
              Add
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
