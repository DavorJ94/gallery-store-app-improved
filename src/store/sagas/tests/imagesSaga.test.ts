import Axios from "axios";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import { URL } from "../../../data/constants";
import {
  fetchImagesFail,
  fetchImagesSuccess,
} from "../../actions/imagesActions";
import { fetchImages } from "../imagesSaga";
import { imagesObj } from "./fake-data";

describe("Saga for fetching images", () => {
  test("fetching images success", () => {
    return expectSaga(fetchImages)
      .provide([[matchers.call.fn(Axios.get), imagesObj]])
      .call(Axios.get, URL)
      .put(fetchImagesSuccess(imagesObj.data))
      .run();
  });

  test("fetching images error", () => {
    const error = new Error("Fetching images error");
    return expectSaga(fetchImages)
      .provide([[matchers.call.fn(Axios.get), throwError(error)]])
      .call(Axios.get, URL)
      .put(
        fetchImagesFail(
          "Something went wrong fetching images: Fetching images error"
        )
      )
      .not.put(fetchImagesSuccess(imagesObj.data))
      .run();
  });
});
