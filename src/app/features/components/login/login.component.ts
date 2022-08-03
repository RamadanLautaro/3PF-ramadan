import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate([''])
  }

  formularioLogin = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  usuarioPrueba = {usuario: 'admin', password: 'admin'};
  errorLogin: boolean = false;

  validarLogin() {
    if (JSON.stringify(this.formularioLogin.value) === JSON.stringify(this.usuarioPrueba)) {
      var hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7);
      localStorage.setItem("token", hash);
    }
    else
    {
      this.errorLogin = true;
      setTimeout(() => {this.errorLogin = false;}, 1700);
    }

    this.router.navigate([''])
  }
}
