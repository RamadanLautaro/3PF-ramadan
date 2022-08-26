import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { Usuario } from '../../../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  
  error: boolean = false;
  mensajeError: string = '';
  subscription: Subscription = new Subscription();
  listaUsuarios: Usuario[] = [];
  dataSource = this.listaUsuarios;
  displayedColumns: string[] = ['id', 'usuario', 'password', 'nombre', 'direccion', 'isAdmin', 'acciones'];


  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  //FILTRAR USUARIOS
  filtro: string = ""
  filtrar = () => {
    this.dataSource = this.listaUsuarios.filter(x => x.id.toString().toLowerCase().includes(this.filtro.toLowerCase())
    || x.usuario.toLowerCase().includes(this.filtro.toLowerCase()) 
    || x.password.toLowerCase().includes(this.filtro.toLowerCase())
    || x.nombre.toLowerCase().includes(this.filtro.toLowerCase()) 
    || x.direccion.toLowerCase().includes(this.filtro.toLowerCase()))
  }

  
  //FORMULARIO USUARIO: AGREGAR
  formularioAgregarUsuario = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    isAdmin: new FormControl(false, [Validators.required, Validators.max(110)]),
  })

   //FORMULARIO USUARIO: EDITAR
   formularioEditarUsuario = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    isAdmin: new FormControl(false, [Validators.required, Validators.max(110)]),
  })

  //EDITAR USUARIO: CARGAR FORMULARIO
  cargarFormularioEditarUsuario(usuario: Usuario){
    this.formularioEditarUsuario.controls.id.setValue(usuario.id);
    this.formularioEditarUsuario.controls.usuario.setValue(usuario.usuario);
    this.formularioEditarUsuario.controls.password.setValue(usuario.password);
    this.formularioEditarUsuario.controls.nombre.setValue(usuario.nombre);
    this.formularioEditarUsuario.controls.direccion.setValue(usuario.direccion);
    this.formularioEditarUsuario.controls.isAdmin.setValue(usuario.isAdmin);
  }

  
  //AGREGAR USUARIO
  agregarUsuario() {
    this.subscription.add(
      this.usuarioService.agregarUsuario(this.formularioAgregarUsuario.value).subscribe(
        {
          next: (usuarios) => {
            this.dataSource = usuarios;
            this.error = false;
            this.obtenerUsuarios();
            Swal.fire({
              title: '¡Listo!',
              text: 'Usuario agregado correctamente...',
              icon: 'success',
              confirmButtonText: 'ACEPTAR'
            })
          },
          error: (mensajeError) => {
            this.mensajeError = mensajeError;
            this.error = true;
          },
          complete: () => {
            this.formularioAgregarUsuario.reset();
            this.formularioAgregarUsuario.controls.usuario.setErrors(null);
            this.formularioAgregarUsuario.controls.password.setErrors(null);
            this.formularioAgregarUsuario.controls.nombre.setErrors(null);
            this.formularioAgregarUsuario.controls.direccion.setErrors(null);
            this.formularioAgregarUsuario.controls.isAdmin.setErrors(null);
          }
        }
      )
    )
  }

  //ELIMINAR USUARIO
  eliminarUsuario(id: any) {
    this.subscription.add(
      this.usuarioService.eliminarUsuario(id).subscribe(
        {
          next: (usuarios) => {
            this.dataSource = usuarios;
            this.error = false;
            this.obtenerUsuarios();
            Swal.fire({
              title: '¡Listo!',
              text: 'Usuario eliminado correctamente...',
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

  //EDITAR USUARIO
  editarUsuario() {
    this.subscription.add(
      this.usuarioService.editarUsuario(this.formularioEditarUsuario.value).subscribe(
        {
          next: (usuarios) => {
            this.dataSource = usuarios;
            this.error = false;
            this.obtenerUsuarios();
            Swal.fire({
              title: '¡Listo!',
              text: 'Usuario editado correctamente...',
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

  //OBTENER USUARIOS
  obtenerUsuarios() {
    this.subscription.add(
      this.usuarioService.obtenerUsuarios().subscribe(
        {
          next: (usuarios) => {
            this.dataSource = usuarios;
            this.listaUsuarios = usuarios;
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