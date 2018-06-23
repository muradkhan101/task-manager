import * as actions from './actions';
import { IBoard, ITask } from '../common/interfaces';
import { User } from '@app/common';

type BoardState = Array<IBoard>;

export function user(state: User = {theme: 'light'} as User, action) {
    switch (action.type) {
        case (actions.names.SaveUserData): {
            return action.payload;
        }
        case (actions.names.UpdateBoardOrder): {
            return {
                ...state,
                BoardOrder: Array.isArray(action.payload.order)
                    ? action.payload.order
                    : JSON.parse(action.payload.order)
            };
        }
        case (actions.names.UpdateTheme): {
            return {
                ...state,
                theme: action.payload.theme
            };
        }
    }
    return state;
}

export function taskOrderReducer(state: BoardState = [], action: actions.UpdateOrderAction) {
    switch (action.type) {
        case (actions.names.UpdateTaskOrder): {
            return state.map(board => {
                if (board.ID === action.payload.ID) {
                    board.TaskOrder = Array.isArray(action.payload.order)
                        ? action.payload.order
                        : JSON.parse(action.payload.order);
                }
                return board;
            });
        }
    }
    return state;
}
