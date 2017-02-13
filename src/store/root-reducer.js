import score from '../components/score/score.redux'
import { combineReducers } from 'redux';

console.log('root reducer?');
const rootReducer = combineReducers({
  score,
});

export default rootReducer;
