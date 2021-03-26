import { combineReducers } from 'redux';
import { modalReducer } from '../components/modals/modalReducer';

const rootReducer = combineReducers({
  modals: modalReducer,
});

export default rootReducer;
