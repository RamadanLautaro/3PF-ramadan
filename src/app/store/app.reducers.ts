import { ActionReducerMap, createAction } from '@ngrx/store';
import { IAppState } from "./app.states";
import { loginReducer } from './reducers/login.reducer';

export const appReducers: ActionReducerMap<IAppState> = {
    login: loginReducer
}

export const emptyAction = createAction("emptyAction")