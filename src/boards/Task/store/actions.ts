import { ITask } from '../../common/interfaces';
import { Action } from '../../../common/helpers';

export interface TaskPayload {
    task: ITask;
    updates?: any;
}

export interface TaskAction extends Action {
    payload: TaskPayload;
}

export const names = {
    AddTask: 'ADD_BOARD',
    RemoveTask: 'REMOVE_BOARD',
    UpdateTask: 'RENAME_BOARD',
    ReorderTask: 'REORDER_BOARDS',
};

export class AddTask implements Action {
    readonly type = names.AddTask;
    constructor(public payload: TaskPayload) { }

}
export class RemoveTask implements Action {
    type = names.RemoveTask;
    constructor(public payload: TaskPayload) { }
}
export class UpdateTask implements Action {
    type = names.UpdateTask;
    constructor(public payload: TaskPayload) { }
}

export class ReorderTask implements Action {
    type = names.ReorderTask;
    constructor(public payload: TaskPayload) { }
}
