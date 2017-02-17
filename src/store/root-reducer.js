import { combineReducers } from 'redux';
import score from '../components/score/score.redux'
import game from '../components/game/game.redux'

const rootReducer = combineReducers({
  game,
  score,
});

export default rootReducer;
