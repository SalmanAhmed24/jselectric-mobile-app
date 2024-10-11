const INITIAL_STATE = {
  user: {},
};
export const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "USERINFO":
      return {
        ...state,
        user: actions.payload,
      };
    default:
      return state;
  }
};
