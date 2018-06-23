import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { createEpicMiddleware, combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { boards, BoardAction } from '@app/board/store';
import * as boardEpics from '@app/board/store/epics';
import { tasks, TaskAction } from '@app/task/store';
import * as taskEpics from '@app/task/store/epics';
import * as coreEpics from './epics';
import { taskOrderReducer, user } from './reducers';

import { IBoard, ITask, Theme } from '../common/interfaces';
import { User } from '@app/common';

// Figure how to fix the any issue and keep the array destructuring
const combinedEpics = combineEpics(
    ...Object.values(boardEpics) as any,
    ...Object.values(taskEpics) as any,
    ...Object.values(coreEpics) as any,
);
const epicMiddleware = createEpicMiddleware(combinedEpics);

export interface StoreState {
    tasks: Array<ITask>;
    boards: Array<IBoard>;
    user: User;
    theme: Theme;
}

function reduceReducers(...args) {
    return function (state, action) {
        return args.reduce((stateVal, reducer) => reducer(stateVal, action), state)
    };
}

const combinedReducers = combineReducers<StoreState>({
    tasks,
    boards: reduceReducers(boards, taskOrderReducer),
    user
});

const classToObject = store => next => action => {
    let actionObject = action;
    if ( !(action instanceof Observable) ) {
         actionObject = { ...action };
    }
    return next(actionObject);
};

export function configureStore() {
    const store = createStore<StoreState>(
        combinedReducers,
        applyMiddleware(classToObject, epicMiddleware),
    );
    return store;
}
