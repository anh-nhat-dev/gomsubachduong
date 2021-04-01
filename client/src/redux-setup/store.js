import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { reducer as CartReducer } from "./cart";
import { reducer as AppReducer } from "./app";

const persistConfig = {
  key: "__redux_persis",
  whitelist: ["Cart"],
  storage,
};
const reducers = combineReducers({
  Cart: CartReducer,
  App: AppReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, devToolsEnhancer());

persistStore(store);

export default store;
