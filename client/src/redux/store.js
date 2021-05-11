import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

//Reducer
import invoiceReducer from "./reducer/invoiceReducer";
import invoiceDetailReducer from "./reducer/invoiceDetailReducer";
import invoiceUser from "./reducer/invoiceOfUser";
import userRudecer from "./reducer/userReducer";
import lotteryReducer from "./reducer/lotteryReducer";
import chartReducer from "./reducer/chartReducer";
import ngudReducer from "./reducer/ngudReducer";
import headerReducer from "./reducer/headerReducer";
import authReducer from "./reducer/authReducer";
import reward from "./reducer/rewardReducer";
import tokenReducer from "./reducer/tokenReducer"


// ******Combine Reducers******
const rootReducer = combineReducers({
  auth:authReducer,
  invoice:invoiceReducer,
  invoice_detail:invoiceDetailReducer,
  invoice_user:invoiceUser,
  user:userRudecer,
  lottery:lotteryReducer,
  chart:chartReducer,
  ngud:ngudReducer,
  header:headerReducer,
  reward:reward,
  token:tokenReducer
});

const PersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["token"],
};

const persitReducer = persistReducer(PersistConfig, rootReducer);

// ******Create Store******
const store = createStore(
  persitReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persister = persistStore(store);

export { store, persister };