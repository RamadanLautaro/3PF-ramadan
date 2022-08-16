import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/models/usuario.model";

export const LOGIN_ACTIONS = {
    Login: {
        run: createAction('[Login] iniciar sesión', props<{usuario: string, password: string}>()),
        success: createAction('[Login] iniciar sesión success', props<{usuario: Usuario | null}>()),
        failed: createAction('[Login] iniciar sesión failed', props<{error: string}>())
    },
    Logout:{
        run: createAction('[Logout] cerrar sesión'),
    }
}