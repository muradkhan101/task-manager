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
    AddBoard: 'ADD_BOARD',
    RemoveBoard: 'REMOVE_BOARD',
    RenameBoard: 'RENAME_BOARD',
    ReorderBoards: 'REORDER_BOARDS',
};

export class AddBoard implements Action {
    readonly type = names.AddBoard;
    constructor(public payload: BoardPayload) { }

}
export class RemoveBoard implements Action {
    type = names.RemoveBoard;
    public board: IBoard;
    constructor(public payload: BoardPayload) { }
}
export class RenameBoard implements Action {
    type = names.RenameBoard;
    public board: IBoard;
    constructor(public payload: BoardPayload) { }
}

export class ReorderBoards implements Action {
    type = names.ReorderBoards;
    public board: IBoard;
    constructor(public payload: BoardPayload) { }
}
