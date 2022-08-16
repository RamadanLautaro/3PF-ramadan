import { createReducer, on } from "@ngrx/store";
import { initialLoginState } from '../states/login.state';
import { LOGIN_ACTIONS } from '../actions/login.actions';

export const loginReducer = createReducer(
    initialLoginState,
    on(LOGIN_ACTIONS.Login.run, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(LOGIN_ACTIONS.Login.success, (state, {usuario}) => {
        return {
            ...state,
            loading: false,
            usuario
        }
    }),
    on(LOGIN_ACTIONS.Login.failed, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(LOGIN_ACTIONS.Logout.run, (state) => {
        return {
          ...state,
          usuario: null
        }
    }),
)