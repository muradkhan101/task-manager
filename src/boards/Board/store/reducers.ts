import * as actions from './actions';
import { IBoard, ITask } from '../../common/interfaces';
import { safeParse } from '@app/common';

type BoardState = Array<IBoard>;

export function boards(state: BoardState = [], action: actions.BoardAction) {
    switch (action.type) {
        case (actions.names.CreateBoard): {
            action.payload.board.TaskOrder = Array.isArray(action.payload.board.TaskOrder)
                ? action.payload.board.TaskOrder
                : safeParse(action.payload.board.TaskOrder as any);
            return [ ...state, action.payload.board ];
        }
        case (actions.names.RemoveBoard): {
            return state.filter((board: IBoard) => board.ID !== (action as any).payload.boardId);
        }
        case (actions.names.UpdateBoard): {
            return state.map((board: IBoard) => {
                board.Name = board.ID === action.payload.board.ID
                    ? action.payload.updates.Name
                    : board.Name;
            });
        }
        case (actions.names.AddMultipleBoards): {
            return [ ...state, ...action.payload.boards.map(board => {
                board.TaskOrder = Array.isArray(board.TaskOrder)
                    ? board.TaskOrder
                    : safeParse(board.TaskOrder as any);
                return board;
            }) ];
        }
    }
    return state;
}

export const getBoardIssues = (issues: Array<ITask>, boardId: number) =>
    issues.filter(issue => issue.Board === boardId);
