import { Usuario } from "src/app/models/usuario.model";

export interface ILoginState {
    usuario: Usuario | null,
    token: string | null,
    loading: boolean
}

export const initialLoginState: ILoginState = {
    usuario: null,
    token: null,
    loading: false
}