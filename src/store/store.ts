import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

export function configureStoreWithMiddlewares(
  preloadedState = {},
  showLogger = true
) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      if (showLogger)
        return [sagaMiddleware, ...getDefaultMiddleware(), logger];
      return [sagaMiddleware, ...getDefaultMiddleware()];
    },
    devTools: process.env.NODE_ENV === "production",
    preloadedState,
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStoreWithMiddlewares();

export type RootState = ReturnType<typeof store.getState>;

export default store;
