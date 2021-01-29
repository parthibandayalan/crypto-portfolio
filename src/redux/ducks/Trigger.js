//export const CHECK_COIN = "CHECK_COIN";
const SET_TRUE = "SET_TRUE";
const SET_FALSE = "SET_FALSE";

const initialState = {
  boolTrigger: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRUE:
      return {
        boolTrigger: true,
      };
    case SET_FALSE:
      return {
        boolTrigger: false,
      };
    default:
      return state;
  }
};

export const setTrigger = () => ({
  type: SET_TRUE,
});

export const resetTrigger = () => ({
  type: SET_FALSE,
});
