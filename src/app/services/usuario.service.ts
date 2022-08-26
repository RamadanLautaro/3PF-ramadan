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


  //LOGIN
  login(username:string, password:string): Observable<Usuario | null> {
    return this.httpClient.get<Usuario[]>(environment.apiUrl + 'usuarios',
    {headers: new HttpHeaders (this.header)})
    .pipe(
      map((usuarios) => {
        return usuarios.find(usuario => usuario.usuario == username && usuario.password == password) || null
      }),
      catchError((error) => {
        throw new Error(error)
      })
    );
  }

  //AGREGAR USUARIO
  agregarUsuario(usuario: any): Observable<Usuario[]> {
    let usuariosOrderIdDesc = Object.values(this.httpClient.get<Usuario[]>(environment.apiUrl + 'usuarios')).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    usuario.id = usuariosOrderIdDesc[0].id + 1;

    return this.httpClient.post<Usuario[]>(environment.apiUrl + 'usuarios', usuario, 
    {headers: new HttpHeaders ()})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //ELIMINAR USUARIO
  eliminarUsuario(id: number): Observable<Usuario[]> {
    return this.httpClient.delete<Usuario[]>(environment.apiUrl + 'usuarios/' + id,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //EDITAR USUARIO
  editarUsuario(usuario: any): Observable<Usuario[]> {
    return this.httpClient.put<Usuario[]>(environment.apiUrl + 'usuarios/' + usuario.id, usuario,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //OBTENER USUARIOS
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(environment.apiUrl + 'usuarios',
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }
}
