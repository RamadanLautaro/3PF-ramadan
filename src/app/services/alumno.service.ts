import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, of, from, Observable, map, BehaviorSubject } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  //LISTADO DE ALUMNOS
  listaAlumnos: Alumno[] = [];
  header : any = {"authorization": "token"}


  alumnos$ = new BehaviorSubject<Alumno[]>(this.listaAlumnos);
  constructor(private httpClient: HttpClient) { }

  
  //AGREGAR ALUMNO
  agregarAlumno(alumno: any): Observable<Alumno[]> {
    let alumnosOrderIdDesc = Object.values(this.httpClient.get<Alumno[]>(environment.apiUrl + 'alumnos')).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    alumno.id = alumnosOrderIdDesc[0].id + 1;

    return this.httpClient.post<Alumno[]>(environment.apiUrl + 'alumnos', alumno, 
    {headers: new HttpHeaders ()})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //ELIMINAR ALUMNO
  eliminarAlumno(id: number): Observable<Alumno[]> {
    return this.httpClient.delete<Alumno[]>(environment.apiUrl + 'alumnos/' + id,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //EDITAR ALUMNO
  editarAlumno(alumno: any): Observable<Alumno[]> {
    return this.httpClient.put<Alumno[]>(environment.apiUrl + 'alumnos/' + alumno.id, alumno,
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }

  //OBTENER ALUMNOS
  obtenerAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(environment.apiUrl + 'alumnos',
    {headers: new HttpHeaders (this.header)})
    .pipe(catchError((error) => {
      throw new Error(error);
    }));
  }
}
