import { cloneDeep } from "lodash";

const initState = {
  items: [],
  views: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const product = action.payload;
      const cart = state.items;
      let check = false;
      cart.map((item) => {
        if (item.id === product.id) {
          check = true;
          item.qty += product.qty;
        }
        return item;
      });

      if (!check) {
        cart.push(product);
      }

      return { ...state, items: cart };
    case "DELETE_CART_ITEM":
      const cart1 = state.items.filter((item) => item.id !== action.payload);
      return { ...state, items: cart1 };
    case "UPDATE_CART_ITEM":
      const { id, qty } = action.payload;
      const cart2 = state.items.map((item) => {
        if (item.id === id) {
          item.qty = qty;
        }
        return item;
      });
      return { ...state, items: cart2 };
    case "RESET_CART":
      return { ...state, items: [] };
    case "VIEW":
      return updateViews(state, action.payload);
    default:
      return state;
  }
}

const updateViews = (state, payload) => {
  const views = state.views ? cloneDeep(state.views) : [];

  const isExit = views.find((view) => view._id === payload._id);

  if (isExit || !payload._id) {
    return state;
  }

  if (views.length >= 10) {
    views.shift();
  }

  views.push(payload);

  return { ...state, views };
};

// eslint-disable-next-line import/no-anonymous-default-export
export { reducer };
