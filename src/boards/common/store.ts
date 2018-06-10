import { combineReducers, createStore } from 'redux';
import { boards } from '../Board/store/reducers';
import { tasks } from '../Task/store/reducers';

export const combinedReducers = combineReducers({
    boards,
    tasks,
});

const store = createStore(combinedReducers);
