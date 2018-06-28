import { IBoard, ITask } from '../../common/interfaces';
import { Action } from '../../../common/helpers';

export interface BoardPayload {
    board?: IBoard;
    boards?: Array<IBoard>;
    updates ?: any;
}

export interface BoardAction extends Action {
    payload: BoardPayload;
}

export const names = {
    CreateBoard: 'CREATE_BOARD',
    RemoveBoard: 'REMOVE_BOARD',
    UpdateBoard: 'RENAME_BOARD',
    ReorderBoards: 'REORDER_BOARDS',
    AddMultipleBoards: 'ADD_MULTIPLE_BOARDS',
    CreateBoard$: 'CREATE_BOARD$',
    RemoveBoard$: 'REMOVE_BOARD$',
    UpdateBoard$: 'RENAME_BOARD$',
    ReorderBoards$: 'REORDER_BOARDS$',
    GetBoard$: 'GET_BOARD$',
};

export class CreateBoard implements BoardAction {
    readonly type = names.CreateBoard;
    public payload: BoardPayload;
    constructor(board: IBoard) {
        this.payload = { board };
    }

}
export class RemoveBoard implements Action {
    type = names.RemoveBoard;
    public payload;
    constructor(boardId: number) {
        this.payload = { boardId };
    }
}
export class UpdateBoard implements BoardAction {
    type = names.UpdateBoard;
    public payload: BoardPayload;
    constructor(board: IBoard, updates = {}) {
        this.payload = { board, updates };
    }
}
export class ReorderBoards implements BoardAction {
    type = names.ReorderBoards;
    public payload: BoardPayload;
    constructor(board: IBoard, updates = {}) {
        this.payload = { board, updates };
    }
}
export class AddMultipleBoards implements BoardAction {
    type = names.AddMultipleBoards;
    public payload;
    constructor(boards: Array<IBoard>) {
        this.payload = { boards };
    }
}
export class CreateBoard$ extends CreateBoard {
    type = names.CreateBoard$;
}
export class RemoveBoard$ extends RemoveBoard {
    type = names.RemoveBoard$;
}
export class UpdateBoard$ extends UpdateBoard {
    type = names.UpdateBoard$;
}
export class ReorderBoards$ extends ReorderBoards {
    type = names.ReorderBoards$;
}
export class GetBoard$ implements Action {
    type = names.GetBoard$;
    public payload;
    constructor(id: number) {
        this.payload = { id };
    }
}