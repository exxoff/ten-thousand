import { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";

export const PlayerCard = ({ playerName }) => {
  const [isOpen, setOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [newPoints, setNewPoints] = useState(0);

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
  const modalIsOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setNewPoints(event.target.value);
  };
  const modalAfterOpen = () => {
    pointInput.current.focus();
  };
  const contentLabel = `Add points to ${playerName}`;
  const closeModal = () => {
    setOpen(false);
  };

  const addPoints = () => {
    console.log(`Current points: ${points}`);
    console.log(`New points: ${newPoints}`);
    if (Number(newPoints) === 0) {
      setPoints(0);
    } else {
      setPoints(Number(points) + Number(newPoints));
    }
    closeModal();
  };

  // const addPoints = () => {
  //   onAddPoints(newPoints);
  //   closeModal();
  // };
  return (
    <>
      <div
        className="max-w-md md:w-8/12 w-full bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg mt-3"
        onClick={(e) => handleClick(e, 0, playerName)}>
        <div className="flex justify-between">
          <div className="text-xl text-red-700 font-bold font-custom">
            <h3>{playerName}</h3>
          </div>
          <div className="text-xl text-green-900 font-custom">
            <h4>{points}</h4>
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
                onChange={(e) => handleChange(e)}
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
