import { ActionsObservable } from 'redux-observable';
import * as actions from './actions';
import { http } from '../../../common/helpers';
import 'rxjs/add/operator/mergeMap';
import { ITask } from '../../common/interfaces';

const createTaskMutation = (task: ITask) => 'graphql?query=mutation{createIssue(issue:'
    + `{ID:-1,`
    + `CreatedBy:${task.CreatedBy},`
    + `Name:"${task.Name}",`
    + `Description:"${task.Description}",`
    + `Board:${task.Board},`
    + `Owner:${task.Owner},`
    + `CreateDate:${Math.floor(Date.now() / 1000)}})`
    + '{ID,Name,Description,Board,CreateDate,Owner,CreatedBy}}';

const updateTaskMutation = (task: ITask, updates) => 'graphql?query=mutation{createIssue(issue:'
    + `{ID:${task.ID},`
    + `CreatedBy:${updates.CreatedBy || task.CreatedBy},`
    + `Name:"${updates.Name || task.Name}",`
    + `Description:"${updates.Description || task.Description}",`
    + `Board:${updates.Board || task.Board},`
    + `Owner:${updates.Owner || task.CreatedBy},`
    + `CreateDate:${Math.floor(Date.now() / 1000)}})`
    + '{ID,Name,Description,Board,CreateDate,Owner,CreatedBy}}';


type AsyncTaskAction = ActionsObservable<actions.TaskAction>;

export const addBoard = (action$: AsyncTaskAction) =>
    action$.ofType(actions.names.AddTask$)
        .mergeMap(action => http.get<ITask>(createTaskMutation(action.payload.task))
            .map(res => new actions.AddTask(res))
        );

export const renameBoard = (action$: AsyncTaskAction) =>
    action$.ofType(actions.names.UpdateTask$)
        .mergeMap(action => http.get<ITask>(updateTaskMutation(action.payload.task, action.payload.updates))
            .map(res => new actions.UpdateTask(res, action.payload.updates))
        );
