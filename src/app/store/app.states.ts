import { ILoginState, initialLoginState } from "./states/login.state";

export interface IAppState {
  login: ILoginState
}

export const initialAppState : IAppState = {
  login: initialLoginState
}