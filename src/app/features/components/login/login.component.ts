import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { LOGIN_ACTIONS } from '../../../store/actions/login.actions';
import { LOGIN_SELECTORS } from '../../../store/selectors/login.selectors';
import { Usuario } from '../../../models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.router.navigate([''])
  }

  formularioLogin = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  errorLogin: boolean = false;
  usuarioLogueado$ = this.store.select(LOGIN_SELECTORS.selectGetUser)
  loading$ = this.store.select(LOGIN_SELECTORS.selectGetLoading)

  validarLogin() {
    this.errorLogin = false;

    this.store.dispatch(LOGIN_ACTIONS.Login.run({
      usuario: this.formularioLogin.value.usuario!,
      password: this.formularioLogin.value.password!
    }))

    if (this.usuarioLogueado$ != null && localStorage.getItem("token") === null) {
      this.errorLogin = true;
      setTimeout(() => {this.errorLogin = false;}, 1700);
    }
  }
}
