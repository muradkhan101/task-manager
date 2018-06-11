import { ActionsObservable } from 'redux-observable';
import { IBoard, ITask } from '../common/interfaces';
import * as actions from './actions';
import { http } from '@app/common';

const getAllQuery = (userId: number) => `graphql?query={user(id:${userId}){`
    + 'Name,Email,FirstName,LastName,Boards{'
    + 'ID,Name,CreatedBy,CreateDate,Owner,Issues{'
    + 'ID,Name,Description,DueDate,CreatedBy,Owner,Board,CreateDate}}}}';

export const getAll = (action$) =>
    action$.ofType(actions.names.GetAllUserInfo$)
        .mergeMap(action => http.get(getAllQuery(action.payload.id))
            // Double check this part
            // Split observable into two and concatMap to dispatch other actions
            .map((res: any) => res.data.user.boards)
            .map((boards: Array<IBoard>) => new actions.GotAllUserInfo(boards))
        );
