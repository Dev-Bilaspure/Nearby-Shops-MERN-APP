import { combineReducers } from "redux";
import shopsReducer from "./shopsReducer";


const reducers = combineReducers({
  shops: shopsReducer
})

export default reducers