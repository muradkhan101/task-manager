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
    TaskDragStart: 'TASK_DRAG_START',
    TaskDragEnd: 'TASK_DRAG_END',
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
    public payload: TaskPayload;
    constructor(task: ITask) {
        this.payload = { task };
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

export class TaskDragStart implements Action {
    type = names.TaskDragStart;
    public payload;
    constructor(task: ITask, boardId: number) {
        this.payload = { task, boardId };
    }
}
export class TaskDragEnd implements Action {
    type = names.TaskDragEnd;
    public payload;
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
