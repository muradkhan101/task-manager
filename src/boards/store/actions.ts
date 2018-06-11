import { Action } from '@app/common';

export const names = {
    GetAllUserInfo$: 'GET_ALL_USER_INFO$'
}

export interface MetaAction extends Action {
    payload: { ID: number };
}

export class GetAllUserInfo implements Action {
    type = names.GetAllUserInfo$;
    payload: { ID: number };
    constructor(ID: number) {
        this.payload = { ID };
    }
}