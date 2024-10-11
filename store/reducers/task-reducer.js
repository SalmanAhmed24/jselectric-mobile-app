const INITIAL_STATE = {
  tasks: [],
};
export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};
