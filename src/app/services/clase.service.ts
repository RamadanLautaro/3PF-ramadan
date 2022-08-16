import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map, BehaviorSubject } from 'rxjs';
import { Clase } from '../models/clase.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  //LISTADO DE CLASES
  listaClases: Clase[] = [];
  header : any = {"authorization": "token"}

  clases$ = new BehaviorSubject<Clase[]>(this.listaClases);
  constructor(private httpClient: HttpClient) { }

  
  //AGREGAR CLASE
  agregarClase(clase: any): Observable<Clase[]> {
    let clasesOrderIdDesc = Object.values(this.httpClient.get<Clase[]>(environment.apiUrl + 'clases')).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    clase.id = clasesOrderIdDesc[0].id + 1;

    return this.httpClient.post<Clase[]>(environment.apiUrl + 'clases', clase, 
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //ELIMINAR CLASE
  eliminarClase(id: number): Observable<Clase[]> {
    return this.httpClient.delete<Clase[]>(environment.apiUrl + 'clases/' + id,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //EDITAR CLASE
  editarClase(clase: any): Observable<Clase[]> {
    return this.httpClient.put<Clase[]>(environment.apiUrl + 'clases/' + clase.id, clase,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //OBTENER CLASES
  obtenerClases(): Observable<Clase[]> {
    return this.httpClient.get<Clase[]>(environment.apiUrl + 'clases',
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }
}
