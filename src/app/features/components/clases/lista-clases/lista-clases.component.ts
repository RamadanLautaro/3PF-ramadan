import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Clase } from '../../../../models/clase.model';
import { ClaseService } from 'src/app/services/clase.service';


@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.css']
})
export class ListaClasesComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaClases: Clase[] = [];
  dataSource = this.listaClases;
  displayedColumns: string[] = ['curso', 'nombre', 'fecha', 'obligatoria', 'acciones'];


  constructor(private claseService: ClaseService) {}

  ngOnInit(): void {
    this.obtenerClases();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //FORMULARIO CLASE: AGREGAR
  formularioAgregarClase = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    curso: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fecha: new FormControl(new Date(''), [Validators.required]),
    obligatoria: new FormControl(true, [Validators.required])
  })

   //FORMULARIO CLASE: EDITAR
   formularioEditarClase = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    curso: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fecha: new FormControl(new Date(''), [Validators.required]),
    obligatoria: new FormControl(true, [Validators.required])
  })

  //EDITAR CLASE: CARGAR FORMULARIO
  cargarFormularioEditarClase(clase: Clase){
    this.formularioEditarClase.controls.id.setValue(clase.id);
    this.formularioEditarClase.controls.curso.setValue(clase.curso);
    this.formularioEditarClase.controls.nombre.setValue(clase.nombre);
    this.formularioEditarClase.controls.fecha.setValue(clase.fecha);
    this.formularioEditarClase.controls.obligatoria.setValue(clase.obligatoria);
  }

  
  //AGREGAR CLASE
  agregarClase() {
    this.subscription.add(
      this.claseService.agregarClase(this.formularioAgregarClase.value).subscribe(
        {
          next: (clases) => {
            this.dataSource = clases;
            this.error = false;
            this.obtenerClases();
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          },
          complete: () => {
            this.formularioEditarClase.reset();
            this.formularioEditarClase.controls.curso.setErrors(null);
            this.formularioEditarClase.controls.nombre.setErrors(null);
            this.formularioEditarClase.controls.fecha.setErrors(null);
            this.formularioEditarClase.controls.obligatoria.setErrors(null);
          }
        }
      )
    )
  }

  //ELIMINAR CLASE
  eliminarClase(id: any) {
    this.subscription.add(
      this.claseService.eliminarClase(id).subscribe(
        {
          next: (clases) => {
            this.dataSource = clases;
            this.error = false;
            this.obtenerClases();
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //EDITAR CLASE
  editarClase() {
    this.subscription.add(
      this.claseService.editarClase(this.formularioEditarClase.value).subscribe(
        {
          next: (clases) => {
            this.dataSource = clases;
            this.error = false;
            this.obtenerClases();
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          }
        }
      )
    )
  }

  //OBTENER CLASES
  obtenerClases() {
    this.subscription.add(
      this.claseService.obtenerClases().subscribe(
        {
          next: (clases) => {
            this.dataSource = clases;
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