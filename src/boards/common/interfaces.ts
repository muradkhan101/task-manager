export enum TaskStatus { IN_PROGRESS, DONE }

export interface ITask {
    ID: number;
    Title: string;
    Description: string;
    DueDate?: string;
    Status: TaskStatus;
    Board: number;
}

export interface IBoard {
    ID: number;
    Name: string;
    Issues: Array<ITask>;
}
