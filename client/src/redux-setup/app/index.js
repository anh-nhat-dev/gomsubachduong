const initState = {
  menu: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, menu: action.payload };
    default:
      return state;
  }
}

export { reducer };
