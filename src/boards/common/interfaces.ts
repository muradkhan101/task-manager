export enum TaskStatus { IN_PROGRESS, DONE }

export interface ITask {
    ID: number;
    Board: number;
    CreateDate: string;
    CreatedBy: number;
    Description: string;
    DueDate?: string;
    Name: string;
    Owner: number;
    Status: TaskStatus;
}

export interface IBoard {
    ID: number;
    CreateDate: string;
    CreatedBy: number;
    Issues: Array<ITask>;
    Name: string;
    Owner: number;
}
