import Axios from "axios";
import { call, fork, put, takeLeading } from "redux-saga/effects";

import { URL } from "../../data/constants";
import { Item } from "../../types/sharedTypes";
import { Actions } from "../actions";
import { fetchImagesFail, fetchImagesSuccess } from "../actions/imagesActions";

export function* fetchImages() {
  try {
    const response: { data: Item[] } = yield call(Axios.get, URL);
    for (let i = 0; i < response.data.length; i += 1) {
      response.data[i].willBuy = false;
    }
    yield put(fetchImagesSuccess(response.data));
  } catch (err) {
    if (err instanceof Error)
      yield put(
        fetchImagesFail(`Something went wrong fetching images: ${err.message}`)
      );
  }
}

export function* fetchImagesSaga() {
  yield takeLeading(Actions.FETCH_IMAGES, fetchImages);
}

const imagesSagas = [fork(fetchImagesSaga)];

export default imagesSagas;
