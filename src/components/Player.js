import { useState } from "react";
export const Player = ({ id, playerName }) => {
  const [points, setPoints] = useState(0);

  const handleClick = (event) => {
    event.preventDefault();
    alert(`You clicked on ${playerName}`);
  };
  return (
    <>
      <div
        className="max-w-md md:w-8/12 w-full bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg mt-3"
        onClick={(e) => handleClick(e)}>
        <div className="flex justify-between">
          <div className="text-xl text-red-700 font-bold">
            <h3>{playerName}</h3>
          </div>
          <div className="text-xl text-green-900">
            <h4>{points}</h4>
          </div>
        </div>
      </div>
    </>
  );
};
