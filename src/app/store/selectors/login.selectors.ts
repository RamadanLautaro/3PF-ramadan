import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILoginState } from '../states/login.state';

const selectLoginState = createFeatureSelector<ILoginState>('login');
const selectGetUser = createSelector(selectLoginState, (state) => state.usuario)
const selectGetLoading = createSelector(selectLoginState, (state) => state.loading)

export const LOGIN_SELECTORS = {
    selectGetUser,
    selectGetLoading
}