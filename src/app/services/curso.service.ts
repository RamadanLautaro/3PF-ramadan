import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Observable, map, BehaviorSubject } from 'rxjs';
import { Curso } from '../models/curso.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //LISTADO DE CURSOS
  listaCursos: Curso[] = [];


  cursos$ = new BehaviorSubject<Curso[]>(this.listaCursos);
  constructor(private httpClient: HttpClient) { }

  
  //AGREGAR CURSO
  agregarCurso(curso: any): Observable<Curso[]> {
    let cursosOrderIdDesc = Object.values(this.httpClient.get<Curso[]>(environment.apiUrl + 'cursos')).sort
    (function (a, b) {if (a.id < b.id) return 1; if (a.id > b.id) return -1; return 0;})

    //obtengo el id mas grande y le sumo 1
    curso.id = cursosOrderIdDesc[0].id + 1;

    return this.httpClient.post<Curso[]>(environment.apiUrl + 'cursos', curso, 
    {headers: new HttpHeaders ({"authorization": "token"})})
    .pipe(catchError((error) => {
      console.log(error);
      throw new Error();
    }));
  }

  //ELIMINAR CURSO
  eliminarCurso(id: number): Observable<Curso[]> {
    return this.httpClient.delete<Curso[]>(environment.apiUrl + 'cursos/' + id,
    {headers: new HttpHeaders ({"authorization": "token"})})
    .pipe(catchError((error) => {
      console.log(error);
      throw new Error();
    }));
  }

  //EDITAR CURSO
  editarCurso(curso: any): Observable<Curso[]> {
    return this.httpClient.put<Curso[]>(environment.apiUrl + 'cursos/' + curso.id, curso,
    {headers: new HttpHeaders ({"authorization": "token"})})
    .pipe(catchError((error) => {
      console.log(error);
      throw new Error();
    }));
  }

  //OBTENER CURSOS
  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.apiUrl + 'cursos',
    {headers: new HttpHeaders ({"authorization": "token"})})
    .pipe(catchError((error) => {
      console.log(error);
      throw new Error();
    }));
  }
}
