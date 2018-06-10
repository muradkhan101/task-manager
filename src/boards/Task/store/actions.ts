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
    AddTask$: 'ADD_BOARD$',
    RemoveTask$: 'REMOVE_BOARD$',
    UpdateTask$: 'RENAME_BOARD$',
    ReorderTask$: 'REORDER_BOARDS$',
};

export class AddTask implements Action {
    readonly type = names.AddTask;
    public payload: TaskPayload;
    constructor(task: ITask) {
        this.payload = { task };
    }

}
export class RemoveTask implements Action {
    type = names.RemoveTask;
    public payload: TaskPayload;
    constructor(task: ITask) {
        this.payload = { task };
    }
}
export class UpdateTask implements Action {
    type = names.UpdateTask;
    public payload: TaskPayload;
    constructor(task: ITask, updates) {
        this.payload = { task, updates };
    }
}
export class ReorderTask implements Action {
    type = names.ReorderTask;
    public payload: TaskPayload;
    constructor(task: ITask, updates) {
        this.payload = { task, updates };
    }
}
export class AddTask$ extends AddTask {
    type = names.AddTask$;
}

export class RemoveTask$ extends RemoveTask {
    type = names.RemoveTask$;
}
export class UpdateTask$ extends UpdateTask {
    type = names.UpdateTask$;
}
export class ReorderTask$ extends ReorderTask {
    type =names. ReorderTask$;
}
