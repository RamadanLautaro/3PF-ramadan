import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //LISTADO DE USUARIOS
  listaUsuarios: Usuario[] = [];
  header : any = {"authorization": "token"}

  usuarios$ = new BehaviorSubject<Usuario[]>(this.listaUsuarios);
  constructor(private httpClient: HttpClient) { }


  login(username:string, password:string): Observable<Usuario | null>{
    return this.httpClient.get<Usuario[]>(environment.apiUrl + 'usuarios',
    {headers: new HttpHeaders (this.header)})
    .pipe(
      map((usuarios) => {
        return usuarios.find(usuario =>  usuario.usuario == username && usuario.password == password) || null
      }),
      catchError((error) => {
        throw new Error(error)
      })
    );
  }
}
