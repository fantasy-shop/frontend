import { combineReducers } from "@reduxjs/toolkit";

/* reducers */
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import companyReducer from "../features/company/companySlice";


const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  company: companyReducer,
});

export default rootReducer;
