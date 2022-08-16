import { all } from "redux-saga/effects";

import imagesSagas from "./imagesSaga";

export default function* rootSaga() {
  yield all([...imagesSagas]);
}
