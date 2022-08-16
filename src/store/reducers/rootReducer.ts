import { combineReducers } from "redux";

import allImages from "./imagesReducers";

const rootReducer = combineReducers({
  images: allImages,
});

export default rootReducer;
