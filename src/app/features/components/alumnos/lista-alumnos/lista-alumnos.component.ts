import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Alumno } from '../../../../models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaAlumnos: Alumno[] = [];
  dataSource = this.listaAlumnos;
  displayedColumns: string[] = ['legajo', 'nombre-apellido', 'edad', 'email', 'acciones'];


  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
  //FORMULARIO ALUMNO: AGREGAR
  formularioAgregarAlumno = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    legajo: new FormControl(null, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl(null, [Validators.required, Validators.max(110)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

   //FORMULARIO ALUMNO: EDITAR
   formularioEditarAlumno = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    legajo: new FormControl(0, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edad: new FormControl(0, [Validators.required, Validators.max(110)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  //EDITAR ALUMNO: CARGAR FORMULARIO
  cargarFormularioEditarAlumno(alumno: Alumno){
    this.formularioEditarAlumno.controls.id.setValue(alumno.id);
    this.formularioEditarAlumno.controls.legajo.setValue(alumno.legajo);
    this.formularioEditarAlumno.controls.nombre.setValue(alumno.nombre);
    this.formularioEditarAlumno.controls.apellido.setValue(alumno.apellido);
    this.formularioEditarAlumno.controls.edad.setValue(alumno.edad);
    this.formularioEditarAlumno.controls.email.setValue(alumno.email);
  }

  
  //AGREGAR ALUMNO
  agregarAlumno() {
    this.subscription.add(
      this.alumnoService.agregarAlumno(this.formularioAgregarAlumno.value).subscribe(
        {
          next: (alumnos) => {
            this.dataSource = alumnos;
            this.error = false;
            this.obtenerAlumnos();
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          },
          complete: () => {
            this.formularioAgregarAlumno.reset();
            this.formularioAgregarAlumno.controls.legajo.setErrors(null);
            this.formularioAgregarAlumno.controls.nombre.setErrors(null);
            this.formularioAgregarAlumno.controls.apellido.setErrors(null);
            this.formularioAgregarAlumno.controls.edad.setErrors(null);
            this.formularioAgregarAlumno.controls.email.setErrors(null);
          }
        }
      )
    )
  }

  //ELIMINAR ALUMNO
  eliminarAlumno(id: any) {
    this.subscription.add(
      this.alumnoService.eliminarAlumno(id).subscribe(
        {
          next: (alumnos) => {
            this.dataSource = alumnos;
            this.error = false;
            this.obtenerAlumnos();
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //EDITAR ALUMNO
  editarAlumno() {
    this.subscription.add(
      this.alumnoService.editarAlumno(this.formularioEditarAlumno.value).subscribe(
        {
          next: (alumnos) => {
            this.dataSource = alumnos;
            this.error = false;
            this.obtenerAlumnos();
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
            this.dataSource = alumnos;
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