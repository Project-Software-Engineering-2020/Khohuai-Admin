import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//Reducer
import invoiceReducer from "./reducer/invoiceReducer";
import invoiceDetailReducer from "./reducer/invoiceDetailReducer";
import invoiceUser from "./reducer/invoiceOfUser";
import userRudecer from "./reducer/invoiceReducer";
import lotteryReducer from "./reducer/lotteryReducer";

// ******Combine Reducers******
const rootReducer = combineReducers({
  invoice:invoiceReducer,
  invoice_detail:invoiceDetailReducer,
  invoice_user:invoiceUser,
  user:userRudecer,
  lottery:lotteryReducer,
  
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