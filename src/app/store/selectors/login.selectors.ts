import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ILoginState } from '../states/login.state';

const selectLoginState = createFeatureSelector<ILoginState>('login');
const selectGetUserId = createSelector(selectLoginState, (state) => state.usuario?.id)
const selectGetUserNombre = createSelector(selectLoginState, (state) => state.usuario?.nombre)
const selectGetUserIsAdmin = createSelector(selectLoginState, (state) => state.usuario?.isAdmin)
const selectGetUser = createSelector(selectLoginState, (state) => state.usuario)
const selectGetLoading = createSelector(selectLoginState, (state) => state.loading)

export const LOGIN_SELECTORS = {
    selectGetUserId,
    selectGetUserNombre,
    selectGetUserIsAdmin,
    selectGetUser,
    selectGetLoading
}