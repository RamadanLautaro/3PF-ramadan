import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Inscripcion } from '../../../../models/inscripcion.model';
import { Alumno } from '../../../../models/alumno.model';
import { Curso } from '../../../../models/curso.model';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { AlumnoService } from '../../../../services/alumno.service';
import { CursoService } from '../../../../services/curso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { LOGIN_SELECTORS } from '../../../../store/selectors/login.selectors';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaInscripciones: Inscripcion[] = [];
  listaAlumnos: Alumno[] = [];
  listaCursos: Curso[] = [];
  dataSource = this.listaInscripciones;
  displayedColumns: string[] = ['idAlumno', 'idCurso', 'fechaInscripcion', 'idUsuario', 'acciones'];

  constructor(private inscripcionService: InscripcionService, private alumnoService: AlumnoService, private cursoService: CursoService, private store: Store) {}

  ngOnInit(): void {
    this.obtenerInscripciones();
    this.obtenerAlumnos();
    this.obtenerCursos();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
  alumnoSeleccionado: any = null;
  cursoSeleccionado: any | null = null;
  reiniciarSelect() {
    this.alumnoSeleccionado = null;
    this.cursoSeleccionado = null;
  }

  
  //FILTRAR INSCRIPCIONES
  filtro: string = ""
  filtrar = () => {
    this.dataSource = this.listaInscripciones.filter(x => x.id.toString().toLowerCase().includes(this.filtro.toLowerCase())
    || x.idAlumno.toString().toLowerCase().includes(this.filtro.toLowerCase()) 
    || x.idCurso.toString().toLowerCase().includes(this.filtro.toLowerCase())
    || x.idUsuario.toString().toLowerCase().includes(this.filtro.toLowerCase())
    || x.nombreAlumno.toLowerCase().includes(this.filtro.toLowerCase()) 
    || x.nombreCurso.toLowerCase().includes(this.filtro.toLowerCase())
    || x.nombreUsuario.toLowerCase().includes(this.filtro.toLowerCase()))
  }


  //FORMULARIO INSCRIPCIÓN: AGREGAR
  formularioAgregarInscripcion = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    idAlumno: new FormControl(0, [Validators.required, Validators.min(1)]),
    idCurso: new FormControl(0, [Validators.required, Validators.min(1)]),
    fechaInscripcion: new FormControl(new Date(''), [Validators.required]),
    idUsuario: new FormControl(0, [Validators.required]),
    nombreAlumno: new FormControl(' ', [Validators.required]),
    nombreCurso: new FormControl(' ', [Validators.required]),
    nombreUsuario: new FormControl(' ', [Validators.required])
  })

   //FORMULARIO INSCRIPCIÓN: EDITAR
   formularioEditarInscripcion = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    idAlumno: new FormControl(0, [Validators.required]),
    idCurso: new FormControl(0, [Validators.required]),
    fechaInscripcion: new FormControl(new Date(''), [Validators.required]),
    idUsuario: new FormControl(0, [Validators.required]),
    nombreAlumno: new FormControl('', [Validators.required]),
    nombreCurso: new FormControl('', [Validators.required]),
    nombreUsuario: new FormControl('', [Validators.required])
  })

  //DATOS DEL USUARIO LOGUEADO
  usuarioLogueado_id$ = this.store.select(LOGIN_SELECTORS.selectGetUserId).subscribe(x => {
    this.formularioAgregarInscripcion.controls.idUsuario.setValue(parseInt(x!.toString()));
    this.formularioEditarInscripcion.controls.idUsuario.setValue(parseInt(x!.toString()));
  });
  usuarioLogueado_nombre$ = this.store.select(LOGIN_SELECTORS.selectGetUserNombre).subscribe(x => {
    this.formularioAgregarInscripcion.controls.nombreUsuario.setValue(x!);
    this.formularioEditarInscripcion.controls.nombreUsuario.setValue(x!);
  });

  //EDITAR INSCRIPCIÓN: CARGAR FORMULARIO
  cargarFormularioEditarInscripcion(inscripcion: Inscripcion){
    this.formularioEditarInscripcion.controls.id.setValue(inscripcion.id);
    this.formularioEditarInscripcion.controls.idAlumno.setValue(inscripcion.idAlumno);
    this.formularioEditarInscripcion.controls.idCurso.setValue(inscripcion.idCurso);
    this.formularioEditarInscripcion.controls.fechaInscripcion.setValue(inscripcion.fechaInscripcion);
    this.formularioEditarInscripcion.controls.nombreAlumno.setValue(inscripcion.nombreAlumno);
    this.formularioEditarInscripcion.controls.nombreCurso.setValue(inscripcion.nombreCurso);
  }

  
  //AGREGAR INSCRIPCIÓN
  agregarInscripcion() {
    let alumno = this.listaAlumnos.filter(x => x.id === this.alumnoSeleccionado)
    let curso = this.listaCursos.filter(x => x.id === this.cursoSeleccionado)

    this.formularioAgregarInscripcion.controls.idAlumno.setValue(alumno[0].id);
    this.formularioAgregarInscripcion.controls.idCurso.setValue(curso[0].id);
    this.formularioAgregarInscripcion.controls.nombreAlumno.setValue(alumno[0].nombre + alumno[0].apellido);
    this.formularioAgregarInscripcion.controls.nombreCurso.setValue(curso[0].nombre);

    this.subscription.add(
      this.inscripcionService.agregarInscripcion(this.formularioAgregarInscripcion.value).subscribe(
        {
          next: (inscripciones) => {
            this.dataSource = inscripciones;
            this.error = false;
            this.obtenerInscripciones();
            Swal.fire({
              title: '¡Listo!',
              text: 'Inscripción agregada correctamente...',
              icon: 'success',
              confirmButtonText: 'ACEPTAR'
            })
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          },
          complete: () => {
            this.alumnoSeleccionado = null;
            this.cursoSeleccionado = null;
            this.formularioAgregarInscripcion.controls.fechaInscripcion.reset()
            this.formularioAgregarInscripcion.controls.idAlumno.setErrors(null);
            this.formularioAgregarInscripcion.controls.idCurso.setErrors(null);
            this.formularioAgregarInscripcion.controls.fechaInscripcion.setErrors(null);
          }
        }
      )
    )
  }

  //ELIMINAR INSCRIPCIÓN
  eliminarInscripcion(id: any) {
    this.subscription.add(
      this.inscripcionService.eliminarInscripcion(id).subscribe(
        {
          next: (inscripciones) => {
            this.dataSource = inscripciones;
            this.error = false;
            this.obtenerInscripciones();
            Swal.fire({
              title: '¡Listo!',
              text: 'Inscripción eliminada correctamente...',
              icon: 'success',
              confirmButtonText: 'ACEPTAR'
            })
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //EDITAR INSCRIPCIÓN
  editarInscripcion() {
    if (this.alumnoSeleccionado != undefined) {
      let alumno = this.listaAlumnos.filter(x => x.id === this.alumnoSeleccionado)
      this.formularioEditarInscripcion.controls.idAlumno.setValue(alumno[0].id);
      this.formularioEditarInscripcion.controls.nombreAlumno.setValue(alumno[0].nombre + alumno[0].apellido);
    }
 
    if (this.cursoSeleccionado != undefined) {
      let curso = this.listaCursos.filter(x => x.id === this.cursoSeleccionado)
      this.formularioEditarInscripcion.controls.idCurso.setValue(curso[0].id);
      this.formularioEditarInscripcion.controls.nombreCurso.setValue(curso[0].nombre);
    }

    this.subscription.add(
      this.inscripcionService.editarInscripcion(this.formularioEditarInscripcion.value).subscribe(
        {
          next: (inscripciones) => {
            this.dataSource = inscripciones;
            this.error = false;
            this.obtenerInscripciones();
            Swal.fire({
              title: '¡Listo!',
              text: 'Inscripción editada correctamente...',
              icon: 'success',
              confirmButtonText: 'ACEPTAR'
            })
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //OBTENER INSCRIPCIONES
  obtenerInscripciones() {
    this.subscription.add(
      this.inscripcionService.obtenerInscripciones().subscribe(
        {
          next: (inscripciones) => {
            this.dataSource = inscripciones;
            this.listaInscripciones = inscripciones;
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //OBTENER ALUMNOS
  obtenerAlumnos() {
    this.subscription.add(
      this.alumnoService.obtenerAlumnos().subscribe(
        {
          next: (alumnos) => {
            this.listaAlumnos = alumnos;
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //OBTENER CURSOS
  obtenerCursos() {
    this.subscription.add(
      this.cursoService.obtenerCursos().subscribe(
        {
          next: (cursos) => {
            this.listaCursos = cursos;
            this.error = false;
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }
}