import { ActionsObservable } from 'redux-observable';
import { http } from '@app/common';

import { IBoard, ITask } from '../common/interfaces';
import * as actions from './actions';
import { AddMultipleBoards } from '@app/board/store';
import { AddMultipleTasks } from '@app/task/store';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

const getAllQuery = (userId: number) => `graphql?query={user(id:${userId}){`
    + 'ID,Email,FirstName,LastName,'
    + 'Boards{ID,Name,CreatedBy,CreateDate,Owner},'
    + 'Issues{ID,Name,Description,DueDate,CreatedBy,Owner,Board,CreateDate}}}';

export const getAll = (action$) =>
    action$.ofType(actions.names.GetAllUserInfo$)
        .mergeMap(action => http.get(getAllQuery(action.payload.ID))
            // Double check this part
            // Split observable into two and concatMap to dispatch other actions
            .map((res: any) => res.data.user)
            .mergeMap((res: any) => concat(
                of(new AddMultipleBoards(res.Boards)),
                of(new AddMultipleTasks(res.Issues))
            ))
        );
