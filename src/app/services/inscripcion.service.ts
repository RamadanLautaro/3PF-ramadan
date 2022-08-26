import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map, BehaviorSubject } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  //LISTADO DE INSCRIPCIONES
  listaInscripciones: Inscripcion[] = [];
  header : any = {"authorization": "token"}

  inscripciones$ = new BehaviorSubject<Inscripcion[]>(this.listaInscripciones);
  constructor(private httpClient: HttpClient) { }

  
  //AGREGAR INSCRIPCIÓN
  agregarInscripcion(inscripcion: any): Observable<Inscripcion[]> {
    let inscripcionesOrderIdDesc = Object.values(this.httpClient.get<Inscripcion[]>(environment.apiUrl + 'inscripciones')).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    inscripcion.id = inscripcionesOrderIdDesc[0].id + 1;

    return this.httpClient.post<Inscripcion[]>(environment.apiUrl + 'inscripciones', inscripcion, 
    {headers: new HttpHeaders ()})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //ELIMINAR INSCRIPCIÓN
  eliminarInscripcion(id: number): Observable<Inscripcion[]> {
    return this.httpClient.delete<Inscripcion[]>(environment.apiUrl + 'inscripciones/' + id,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //EDITAR INSCRIPCIÓN
  editarInscripcion(inscripcion: any): Observable<Inscripcion[]> {
    return this.httpClient.put<Inscripcion[]>(environment.apiUrl + 'inscripciones/' + inscripcion.id, inscripcion,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //OBTENER INSCRIPCIONES
  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(environment.apiUrl + 'inscripciones',
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }
}
