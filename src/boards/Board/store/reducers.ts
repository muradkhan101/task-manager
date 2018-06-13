import * as actions from './actions';
import { IBoard } from '../../common/interfaces';

type BoardState = Array<IBoard>;

export function boards(state: BoardState = [], action: actions.BoardAction) {
    switch (action.type) {
        case (actions.names.CreateBoard): {
            return [ ...state, action.payload.board ];
        }
        case (actions.names.RemoveBoard): {
            return state.filter((board: IBoard) => board.ID !== action.payload.board.ID);
        }
        case (actions.names.RenameBoard): {
            return state.map((board: IBoard) => {
                board.Name = board.ID === action.payload.board.ID
                    ? action.payload.updates.Name
                    : board.Name;
            });
        }
        case (actions.names.AddMultipleBoards): {
            return [ ...state, ...action.payload.boards ];
        }
    }
    return state;
}
