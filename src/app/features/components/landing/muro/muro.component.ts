import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOGIN_SELECTORS } from '../../../../store/selectors/login.selectors';


@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.css']
})
export class MuroComponent implements OnInit {

  
  constructor(private store: Store) { }

  ngOnInit(): void {}


  usuarioLogueado_isAdmin$ = this.store.select(LOGIN_SELECTORS.selectGetUserIsAdmin)
}
