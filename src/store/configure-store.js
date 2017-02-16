import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from './root-reducer';
import rootSaga, { INITIALIZE } from '../sagas'

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  const store = compose(
    _getMiddleware(history),
    ..._getEnhancers()
  )(createStore)(rootReducer, initialState);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  store.runSaga(rootSaga);  

  store.dispatch(INITIALIZE);
  return store;
}

function _getMiddleware(history) {
  let middleware = [
    sagaMiddleware,
  ];

  return applyMiddleware(...middleware);
}

function _getEnhancers() {
  return process.env.CLIENT &&
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
    [window.__REDUX_DEVTOOLS_EXTENSION__()] :
    [];
}

export default configureStore

