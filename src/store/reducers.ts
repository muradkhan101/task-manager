import * as actions from './actions';
import { IBoard, ITask } from '../boards/common/interfaces';
import { User } from '@app/common';

type BoardState = Array<IBoard>;

export function user(state: User = {} as User, action) {
    switch (action.type) {
        case (actions.names.SaveUserData): {
            return action.payload;
        }
        case (actions.names.UpdateBoardOrder): {
            return {
                ...state,
                BoardOrder: action.payload.order
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
                    board.TaskOrder = action.payload.order;
                }
                return board;
            });
        }
    }
    return state;
}
