import { IBoard } from '../../common/interfaces';
import { Action } from '../../../common/helpers';

export interface BoardPayload {
    board: IBoard;
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
    GotAllUserInfo: 'GOT_ALL_USER_INFO',
    CreateBoard$: 'CREATE_BOARD$',
    RemoveBoard$: 'REMOVE_BOARD$',
    RenameBoard$: 'RENAME_BOARD$',
    ReorderBoards$: 'REORDER_BOARDS$',
    GetBoard$: 'GET_BOARD$',
    GetAllUserInfo$: 'GET_ALL_USER_INFO$',
};

export class CreateBoard implements Action {
    readonly type = names.CreateBoard;
    public payload: BoardPayload;
    constructor(board: IBoard) {
        this.payload = { board };
    }

}
export class RemoveBoard implements Action {
    type = names.RemoveBoard;
    public payload: BoardPayload;
    constructor(board: IBoard) {
        this.payload = { board };
    }
}
export class RenameBoard implements Action {
    type = names.RenameBoard;
    public payload: BoardPayload;
    constructor(board: IBoard, updates = {}) {
        this.payload = { board, updates };
    }
}
export class ReorderBoards implements Action {
    type = names.ReorderBoards;
    public payload: BoardPayload;
    constructor(board: IBoard, updates = {}) {
        this.payload = { board, updates };
    }
}
export class GotAllUserInfo implements Action {
    type = names.GotAllUserInfo;
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
export class GetAllUserInfo$ implements Action {
    type = names.GetAllUserInfo$;
    public payload;
    constructor(id: number) {
        this.payload = { id };
    }
}
