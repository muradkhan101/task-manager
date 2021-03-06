import { Action, User, Theme } from '@app/common';
import { ITask, IBoard } from '../common/interfaces';

export const names = {
    SaveUserData: 'SAVE_USER_DATA',
    UpdateBoardOrder: 'UPDATE_BOARD_ORDER',
    UpdateTaskOrder: 'UPDATE_TASK_ORDER',
    UpdateTheme: 'UPDATE_THEME',
    StartDragBoard: 'START_DRAG_BOARD',
    StartDragTask: 'START_DRAG_TASK',
    EndDrag: 'DRAG_END',
    GetAllUserInfo$: 'GET_ALL_USER_INFO$',
    UpdateBoardOrder$: 'UPDATE_BOARD_ORDER$',
    UpdateTaskOrder$: 'UPDATE_TASK_ORDER$',
    UpdateTheme$: 'UPDATE_THEME$',
};

export interface UpdateOrderAction extends Action {
    type: string;
    payload: { ID: number, order: Array<number> };
}

export class SaveUserData implements Action {
    type = names.SaveUserData;
    payload: User;
    constructor(res: User) {
        this.payload = res;
    }
}

export class GetAllUserInfo$ implements Action {
    type = names.GetAllUserInfo$;
    payload: { ID: number };
    constructor(ID: number) {
        this.payload = { ID };
    }
}

export class UpdateBoardOrder implements UpdateOrderAction {
    type = names.UpdateBoardOrder;
    payload: { ID: number, order: Array<number> };
    constructor(ID, order) {
        this.payload = { ID, order };
    }
}

export class UpdateTaskOrder implements UpdateOrderAction {
    type = names.UpdateTaskOrder;
    payload: { ID: number, order: Array<number> };
    constructor(ID, order) {
        this.payload = { ID, order };
    }
}

export class UpdateBoardOrder$ extends UpdateBoardOrder {
    type = names.UpdateBoardOrder$;
}

export class UpdateTaskOrder$ extends UpdateBoardOrder {
    type = names.UpdateTaskOrder$;
}

export class UpdateTheme implements Action {
    type = names.UpdateTheme;
    payload: { ID: number, theme: Theme };
    constructor(ID: number, theme: Theme) {
        this.payload = { ID, theme };
    }
}

export class UpdateTheme$ extends UpdateTheme {
    type = names.UpdateTheme$;
}

export class StartDragTask implements Action {
    type = names.StartDragTask;
    public payload;
    constructor(task: ITask, boardId: number) {
        this.payload = { task, boardId };
    }
}
export class StartDragBoard implements Action {
    type = names.StartDragBoard;
    public payload;
    constructor(board: IBoard) {
        this.payload = { board };
    }
}
export class EndDrag implements Action {
    type = names.EndDrag;
    public payload;
}