const initialState = { score: [], history: [] };

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("localtt")) || initialValue;

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD-SCORE": {
      console.log("Adding...", action.payload);
      const s = state;
      const player = state.score.find((e) => e.id === action.payload.id);
      player.points = player.points + action.payload.points;
      state.score.sort((a, b) => b.points - a.points);
      state.score.map((a) => {
        a.diff = a.points - state.score[0].points;
        return a;
      });

      return {
        ...state,
        history: [
          ...state.history,
          { player: player.name, points: action.payload.points },
        ],
      };
    }
    case "RESET": {
      console.log("Resetting...", action.payload);
      return { score: [], history: [] };
    }
    case "RESET-SCORE": {
      console.log("Resetting score...", state);
      state.score.forEach((e) => {
        e.points = 0;
        e.diff = 0;
      });
      console.log("New state:", state);
      return { ...state, history: [] };
    }
    case "ADD-PLAYER": {
      console.log("Adding player...", action.payload);

      // const s = state;
      // s.score = [
      //   ...s.score,
      //   {
      //     id: action.payload.id,
      //     name: action.payload.name,
      //     points: 0,
      //     diff: 0,
      //   },
      // ];
      // state = s;
      return {
        ...state,
        score: [
          ...state.score,
          {
            id: action.payload.id,
            name: action.payload.name,
            points: 0,
            diff: 0,
          },
        ],
      };
    }

    default: {
      return state;
    }
  }
};
