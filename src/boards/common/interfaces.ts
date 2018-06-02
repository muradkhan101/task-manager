export enum TaskStatus { IN_PROGRESS, DONE }

export interface ITask {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}

export interface IBoard {
    id: number;
    name: string;
    issues: Array<ITask>;
}
