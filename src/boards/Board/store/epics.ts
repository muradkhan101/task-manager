import { ActionsObservable } from 'redux-observable';
import * as actions from './actions';
import { http } from '../../../common/helpers';
import 'rxjs/add/operator/mergeMap';
import { IBoard } from '../../common/interfaces';

const createBoardMutation = (board: IBoard) => 'graphql?query=mutation{createBoard(board:'
    + `{Name:"${board.Name}",`
    + `CreatedBy:${board.CreatedBy},`
    + `CreateDate:${Date.now() / 1000},`
    + `Owner:${board.Owner},`
    + 'ID:-1})'
    + '{ID,Name,CreatedBy,CreateDate,Owner,Issues}}';

const updateBoardMutations = (board: IBoard, updates) => 'graphql?query=mutation{updateBoard(board:'
    + `{Name:"${updates.NAme || board.Name}",`
    + `ID:${board.ID},`
    + `Owner:${updates.Owner || board.Owner}})`
    + '{ID,Name,CreatedBy,CreateDate,Owner,Issues}}';

const getBoardQuery = (id: number) => `graphql?query={board(id:${id}){`
    + 'ID,Name,CreatedBy,CreateDate,Owner,Issues{'
    + 'ID,Name,Description,DueDate,CreatedBy,Owner,Board,CreateDate}}}';

type AsyncBoardAction = ActionsObservable<actions.BoardAction>;

export const addBoard = (action$: AsyncBoardAction) =>
    action$.ofType(actions.names.CreateBoard$)
        .mergeMap( action => http.get<IBoard>(createBoardMutation(action.payload.board))
            .map(res => new actions.CreateBoard(res))
        );

export const renameBoard = (action$: AsyncBoardAction) =>
    action$.ofType(actions.names.RenameBoard$)
        .mergeMap( action => http.get<IBoard>(updateBoardMutations(action.payload.board, action.payload.updates))
            .map(res => new actions.RenameBoard(res, action.payload.updates))
    );

export const getBoard = (action$) =>
    action$.ofType(actions.names.GetBoard$)
        .mergeMap( action => http.get<IBoard>(getBoardQuery(action.payload.id))
            .map(res => new actions.CreateBoard(res))
    );
