import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { LOGIN_ACTIONS } from '../actions/login.actions';
import { UsuarioService } from 'src/app/services/usuario.service';
import { emptyAction } from '../app.reducers';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginEffects {
    constructor(private router: Router, private actions$: Actions, private usuarioService : UsuarioService) { }

    
    loginEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.Login.run),
            mergeMap((action) => {
                return this.usuarioService.login(action.usuario, action.password).pipe(
                map((usuario) => {
                    return usuario ? LOGIN_ACTIONS.Login.success({usuario}) : LOGIN_ACTIONS.Login.failed({error: "error..."})
                }))
            })
        )
    })


    loginSuccessEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.Login.success),
            map((_) => {
                var hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7);
                localStorage.setItem("token", hash);
                this.router.navigate([''])
                return emptyAction();
            })
        )
    })

    loginFailedEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.Login.failed),
            map((_) => {
                return emptyAction();
            })
        )
    })

    logoutEffets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.Logout.run),
            map((_) => {
                localStorage.removeItem('token')
                this.router.navigate(['login'])
                return emptyAction()
            })
        )
    })
}