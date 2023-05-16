import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const createStore = () => {
  // const sagaMiddleware = createSagaMiddleware();
  // const middlewares = [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    // middleware: middlewares,
    devTools: process.env.NEXT_PUBLIC_NODE_ENV === "development",
  });
  // 여기서 type 에러 발생 시 "redux.d.ts" 정의 필요
  // store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(createStore, {
  debug: process.env.NEXT_PUBLIC_NODE_ENV === "development",
});

const store = createStore();
// "useSelector()"에서 사용하는 타입
export type RootState = ReturnType<typeof store.getState>;

// "_app.ts"에서 "wrapper.withRedux()"로 감싸주면 됨
export default wrapper;
