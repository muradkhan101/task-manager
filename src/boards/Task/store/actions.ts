import { ITask } from '../../common/interfaces';
import { Action } from '../../../common/helpers';

export interface TaskPayload {
    task?: ITask;
    tasks?: Array<ITask>;
    updates?: any;
}

export interface TaskAction extends Action {
    payload: TaskPayload;
}

export const names = {
    AddTask: 'ADD_TASK',
    RemoveTask: 'REMOVE_TASK',
    UpdateTask: 'RENAME_TASK',
    ReorderTask: 'REORDER_TASKS',
    AddMultipleTasks: 'ADD_MULTIPLE_TASKS',
    AddTask$: 'ADD_TASK$',
    RemoveTask$: 'REMOVE_TASK$',
    UpdateTask$: 'RENAME_TASK$',
    ReorderTask$: 'REORDER_TASK$',
};

export class AddTask implements TaskAction {
    readonly type = names.AddTask;
    public payload: TaskPayload;
    constructor(task: ITask) {
        this.payload = { task };
    }

}
export class RemoveTask implements TaskAction {
    type = names.RemoveTask;
    public payload;
    constructor(taskId: number) {
        this.payload = { taskId };
    }
}
export class UpdateTask implements TaskAction {
    type = names.UpdateTask;
    public payload: TaskPayload;
    constructor(task: ITask, updates) {
        this.payload = { task, updates };
    }
}
export class ReorderTask implements TaskAction {
    type = names.ReorderTask;
    public payload: TaskPayload;
    constructor(task: ITask, updates) {
        this.payload = { task, updates };
    }
}
export class AddMultipleTasks implements Action {
    type = names.AddMultipleTasks;
    public payload: TaskPayload;
    constructor(tasks: Array<ITask>) {
        this.payload = { tasks };
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
