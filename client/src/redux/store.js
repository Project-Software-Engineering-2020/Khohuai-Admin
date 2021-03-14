import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//Reducer
import invoiceReducer from "./reducer/invoiceReducer";
import userRudecer from "./reducer/invoiceReducer";
import lotteryReducer from "./reducer/lotteryReducer";

// ******Combine Reducers******
const rootReducer = combineReducers({
  invoice:invoiceReducer,
  user:userRudecer,
  lottery:lotteryReducer
});

const PersistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
};

const persitReducer = persistReducer(PersistConfig, rootReducer);

// ******Create Store******
const store = createStore(
  persitReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persister = persistStore(store);

export { store, persister };