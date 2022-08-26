import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOGIN_SELECTORS } from '../../../store/selectors/login.selectors';
import { LOGIN_ACTIONS } from '../../../store/actions/login.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.verificarUsuario();
  }

  isLogged : boolean = false;
  usuarioLogueado_nombre$ = this.store.select(LOGIN_SELECTORS.selectGetUserNombre)
  usuarioLogueado_isAdmin$ = this.store.select(LOGIN_SELECTORS.selectGetUserIsAdmin)


  verificarUsuario() {
    if (localStorage.getItem("token"))
      this.isLogged = true;
    else
      this.isLogged = false;
  }

  logout() {
    this.store.dispatch(LOGIN_ACTIONS.Logout.run())
    this.router.navigate([''])
    document.location.reload()
  }

  showFiller = false;
}
