export enum TaskStatus { IN_PROGRESS, DONE }

export interface ITask {
    ID: number;
    Name: string;
    Description: string;
    CreatedBy: number;
    Owner: number;
    DueDate?: string;
    Status: TaskStatus;
    Board: number;
}

export interface IBoard {
    ID: number;
    Name: string;
    CreatedBy: number;
    CreateDate: string;
    Owner: number;
    Issues: Array<ITask>;
}
