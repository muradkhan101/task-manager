import * as actions from './actions';
import { IBoard } from '../../common/interfaces';

export function boards(state = [], action: actions.BoardAction) {
    switch (action.type) {
        case (actions.names.AddBoard): {
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
    }
    return state;
}
