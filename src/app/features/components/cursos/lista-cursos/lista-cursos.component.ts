import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Curso } from '../../../../models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { LOGIN_SELECTORS } from '../../../../store/selectors/login.selectors';


@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaCursos: Curso[] = [];
  dataSource = this.listaCursos;
  displayedColumns: string[] = ['id', 'nombre', 'profesor', 'fechaInicio', 'fechaFin', 'horas', 'clases', 'acciones'];
  usuarioLogueado_isAdmin$ = this.store.select(LOGIN_SELECTORS.selectGetUserIsAdmin)

  
  constructor(private cursoService: CursoService, private store: Store) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //FILTRAR CURSOS
  filtro: string = ""
  filtrar = () => {
    this.dataSource = this.listaCursos.filter(x => x.id.toString().toLowerCase().includes(this.filtro.toLowerCase())
    || x.nombre.toLowerCase().includes(this.filtro.toLowerCase()) 
    || x.profesor.toLowerCase().includes(this.filtro.toLowerCase()))
  }


  //FORMULARIO CURSO: AGREGAR
  formularioAgregarCurso = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    profesor: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fechaInicio: new FormControl(new Date(''), [Validators.required]),
    fechaFin: new FormControl(new Date(''), [Validators.required]),
    horas: new FormControl(0, [Validators.required, Validators.min(1)]),
    clases: new FormControl(0, [Validators.required, Validators.min(1)])
  })

   //FORMULARIO CURSO: EDITAR
   formularioEditarCurso = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    profesor: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fechaInicio: new FormControl(new Date(''), [Validators.required]),
    fechaFin: new FormControl(new Date(''), [Validators.required]),
    horas: new FormControl(0, [Validators.required, Validators.min(1)]),
    clases: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  //EDITAR CURSO: CARGAR FORMULARIO
  cargarFormularioEditarCurso(curso: Curso){
    this.formularioEditarCurso.controls.id.setValue(curso.id);
    this.formularioEditarCurso.controls.nombre.setValue(curso.nombre);
    this.formularioEditarCurso.controls.profesor.setValue(curso.profesor);
    this.formularioEditarCurso.controls.fechaInicio.setValue(curso.fechaInicio);
    this.formularioEditarCurso.controls.fechaFin.setValue(curso.fechaFin);
    this.formularioEditarCurso.controls.horas.setValue(curso.horas);
    this.formularioEditarCurso.controls.clases.setValue(curso.clases);
  }

  
  //AGREGAR CURSO
  agregarCurso() {
    this.subscription.add(
      this.cursoService.agregarCurso(this.formularioAgregarCurso.value).subscribe(
        {
          next: (cursos) => {
            this.dataSource = cursos;
            this.error = false;
            this.obtenerCursos();
            Swal.fire({
              title: '¡Listo!',
              text: 'Curso agregado correctamente...',
              icon: 'success',
              confirmButtonText: 'ACEPTAR'
            })
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          },
          complete: () => {
            this.formularioEditarCurso.reset();
            this.formularioEditarCurso.controls.nombre.setErrors(null);
            this.formularioEditarCurso.controls.profesor.setErrors(null);
            this.formularioEditarCurso.controls.fechaInicio.setErrors(null);
            this.formularioEditarCurso.controls.fechaFin.setErrors(null);
            this.formularioEditarCurso.controls.horas.setErrors(null);
            this.formularioEditarCurso.controls.clases.setErrors(null);
          }
        }
      )
    )
  }

  //ELIMINAR CURSO
  eliminarCurso(id: any) {
    this.subscription.add(
      this.cursoService.eliminarCurso(id).subscribe(
        {
          next: (cursos) => {
            this.dataSource = cursos;
            this.error = false;
            this.obtenerCursos();
            Swal.fire({
              title: '¡Listo!',
              text: 'Curso eliminado correctamente...',
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

  //EDITAR CURSOS
  editarCurso() {
    this.subscription.add(
      this.cursoService.editarCurso(this.formularioEditarCurso.value).subscribe(
        {
          next: (cursos) => {
            this.dataSource = cursos;
            this.error = false;
            this.obtenerCursos();
            Swal.fire({
              title: '¡Listo!',
              text: 'Curso editado correctamente...',
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

  //OBTENER CURSOS
  obtenerCursos() {
    this.subscription.add(
      this.cursoService.obtenerCursos().subscribe(
        {
          next: (cursos) => {
            this.dataSource = cursos;
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