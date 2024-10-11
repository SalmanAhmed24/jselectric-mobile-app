const INITIAL_STATE = {
  flag: false,
};
export const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REFRESH_HOME":
      return {
        ...state,
        flag: !action.payload,
      };
    default:
      return state;
  }
};
