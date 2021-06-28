const initialState = [];

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("localtt")) || initialValue;

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD-SCORE": {
      // console.log("Adding...", action.payload);
      const player = state.find((e) => e.id === action.payload.id);
      player.score = player.score + action.payload.points;
      state.sort((a, b) => b.score - a.score);
      state.map((a) => {
        a.diff = a.score - state[0].score;
        return a;
      });

      return [...state];
    }
    case "RESET": {
      // console.log("Resetting...", action.payload);
      return [];
    }
    case "RESET-SCORE": {
      // console.log("Resetting score...", state);
      state.forEach((e) => {
        e.score = 0;
        e.diff = 0;
      });
      // console.log("New state:", state);
      return [...state];
    }
    case "ADD-PLAYER": {
      // console.log("Adding player...", action.payload);
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          score: 0,
          diff: 0,
        },
      ];
    }

    default: {
      return state;
    }
  }
};
