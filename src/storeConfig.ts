import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { createEpicMiddleware, combineEpics, Epic } from 'redux-observable';

import { boards, BoardAction } from '@app/board/store';
import * as boardEpics from '@app/board/store/epics';
import { tasks, TaskAction } from '@app/task/store';
import * as taskEpics from '@app/task/store/epics';

const combinedReducers = combineReducers({ tasks, boards });

// Figure how to fix the any issue and keep the array destructuring
const combinedEpics = combineEpics(
    ...Object.values(boardEpics) as any,
    ...Object.values(taskEpics) as any,
);
const epicMiddleware = createEpicMiddleware(combinedEpics);

export function configureStore() {
    const store = createStore(
        combinedReducers,
        applyMiddleware(epicMiddleware),
    );
    return store;
};
