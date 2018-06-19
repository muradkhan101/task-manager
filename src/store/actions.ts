import { Action, User } from '@app/common';

export const names = {
    SaveUserData: 'SAVE_USER_DATA',
    UpdateBoardOrder: 'UPDATE_BOARD_ORDER',
    UpdateTaskOrder: 'UPDATE_TASK_ORDER',
    GetAllUserInfo$: 'GET_ALL_USER_INFO$',
    UpdateBoardOrder$: 'UPDATE_BOARD_ORDER$',
    UpdateTaskOrder$: 'UPDATE_TASK_ORDER$',
};

export interface UpdateOrderAction extends Action {
    type: string;
    payload: { ID: number, order: Array<number> };
}

export class SaveUserData implements Action {
    type = names.SaveUserData;
    payload: User;
    constructor(res: User) {
        this.payload = res;
    }
}

export class GetAllUserInfo$ implements Action {
    type = names.GetAllUserInfo$;
    payload: { ID: number };
    constructor(ID: number) {
        this.payload = { ID };
    }
}

export class UpdateBoardOrder implements UpdateOrderAction {
    type = names.UpdateBoardOrder;
    payload: { ID: number, order: Array<number> };
    constructor(ID, order) {
        this.payload = { ID, order };
    }
}

export class UpdateTaskOrder implements UpdateOrderAction {
    type = names.UpdateTaskOrder;
    payload: { ID: number, order: Array<number> };
    constructor(ID, order) {
        this.payload = { ID, order };
    }
}

export class UpdateBoardOrder$ extends UpdateBoardOrder {
    type = names.UpdateBoardOrder$;
}

export class UpdateTaskOrder$ extends UpdateBoardOrder {
    type = names.UpdateTaskOrder$;
}
