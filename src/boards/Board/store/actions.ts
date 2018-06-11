import { IBoard } from '../../common/interfaces';
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
    RenameBoard: 'RENAME_BOARD',
    ReorderBoards: 'REORDER_BOARDS',
    AddMultipleBoards: 'ADD_MULTIPLE_BOARDS',
    CreateBoard$: 'CREATE_BOARD$',
    RemoveBoard$: 'REMOVE_BOARD$',
    RenameBoard$: 'RENAME_BOARD$',
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
export class RemoveBoard implements BoardAction {
    type = names.RemoveBoard;
    public payload: BoardPayload;
    constructor(board: IBoard) {
        this.payload = { board };
    }
}
export class RenameBoard implements BoardAction {
    type = names.RenameBoard;
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
export class RenameBoard$ extends RenameBoard {
    type = names.RenameBoard$;
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