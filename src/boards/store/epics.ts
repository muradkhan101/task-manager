import { ActionsObservable } from 'redux-observable';
import { http, Theme } from '@app/common';

import { IBoard, ITask } from '../common/interfaces';
import * as actions from './actions';
import { AddMultipleBoards } from '@app/board/store';
import { AddMultipleTasks } from '@app/task/store';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { filterOnProperty } from '@app/common';

const getAllQuery = (userId: number) => `graphql?query={user(id:${userId}){`
    + 'ID,Email,FirstName,LastName,BoardOrder,'
    + 'Boards{ID,Name,CreatedBy,CreateDate,Owner,TaskOrder},'
    + 'Issues{ID,Name,Description,DueDate,CreatedBy,Owner,Board,CreateDate}}}';

const updateBoardOrderMutation = (userId: number, boardOrder: Array<number>) => `graphql?query=mutation{`
    + `updateBoardOrder(UserId:${userId},BoardOrder:"${JSON.stringify(boardOrder)}")`
    + `{ID,BoardOrder}}`;

const updateTaskOrderMutation = (boardId: number, taskOrder: Array<number>) => `graphql?query=mutation{`
    + `updateTaskOrder(BoardId:${boardId},TaskOrder:"${JSON.stringify(taskOrder)}")`
    + `{ID,TaskOrder}}`;

const updateThemeMutation = (userId: number, newTheme: Theme) => `graphql?query=mutation{`
    + `updateTheme(UserId:${userId},Theme:${newTheme})`
    + '{ID,Theme}}';

function safeParse(json: string) {
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error(e);
        return '';
    }
}

export const getAll = (action$) =>
    action$.ofType(actions.names.GetAllUserInfo$)
        .mergeMap(action => http.get(getAllQuery(action.payload.ID))
            // Double check this part
            // Split observable into two and concatMap to dispatch other actions
            .pipe(filterOnProperty('user'))
            .mergeMap((res: any) => concat(
                of(new AddMultipleBoards(res.Boards)),
                of(new AddMultipleTasks(res.Issues)),
                of(new actions.SaveUserData({
                    ...res,
                    BoardOrder: safeParse(res.BoardOrder)
                }))
            ))
        );

export const updateBoardOrder = (action$) =>
        action$.ofType(actions.names.UpdateBoardOrder$)
            .mergeMap( ({payload}) => http.get(updateBoardOrderMutation(payload.ID, payload.order))
                .pipe(filterOnProperty('updateBoardOrder'))
                .map((res: any) => new actions.UpdateBoardOrder(res.ID, safeParse(res.BoardOrder)))
        );

export const updateTaskOrder = (action$) =>
    action$.ofType(actions.names.UpdateTaskOrder$)
        .mergeMap(({ payload }) => http.get(updateTaskOrderMutation(payload.ID, payload.order))
            .pipe(filterOnProperty('updateTaskOrder'))
            .map((res: any) => new actions.UpdateTaskOrder(res.ID, safeParse(res.TaskOrder)))
        );

export const updateTheme = (action$) =>
        action$.ofType(actions.names.UpdateTheme$)
            .mergeMap(({ payload }) => http.get(updateThemeMutation(payload.ID, payload.theme))
                .pipe(filterOnProperty('updateTheme'))
                .map((res: any) => new actions.UpdateTheme(res.ID, res.Theme))
            );
