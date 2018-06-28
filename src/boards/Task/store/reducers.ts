import * as actions from './actions';
import { ITask } from '../../common/interfaces';

type TaskState = Array<ITask>;

export function tasks(state: TaskState = [], action: actions.TaskAction) {
    switch (action.type) {
        case (actions.names.AddTask): {
            return [...state, action.payload.task];
        }
        case (actions.names.RemoveTask): {
            return state.filter(task => task.ID !== (action as any).payload.taskId);
        }
        case (actions.names.UpdateTask): {
            return state.map(task => {
                if (task.ID === action.payload.task.ID) {
                    let newTask = Object.assign({}, task);
                    Object.entries(action.payload.updates)
                        .forEach(([key, val]) => newTask[key] = val);
                    return newTask;
                }
                return task;
            });
        }
        case (actions.names.AddMultipleTasks): {
            return [...state, ...action.payload.tasks];
        }
    }
    return state;
}
