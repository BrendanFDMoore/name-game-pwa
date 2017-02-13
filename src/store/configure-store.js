import { createStore } from 'redux';
import rootReducer from './root-reducer';


export default (initialState) => {
  console.log('configure store?');
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
