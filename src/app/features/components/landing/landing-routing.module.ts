import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { MuroComponent } from './muro/muro.component';


const routes: Routes = [
  { path: '', component: LandingComponent, children: [
    { path: '', component: MuroComponent},
    { path: 'alumnos', loadChildren: () => import('../alumnos/alumnos.module').then(x => x.AlumnosModule) },
    { path: 'inscripciones', loadChildren: () => import('../inscripciones/inscripciones.module').then(x => x.InscripcionesModule) },
    { path: 'cursos', loadChildren: () => import('../cursos/cursos.module').then(x => x.CursosModule) },
    { path: 'usuarios', loadChildren: () => import('../usuarios/usuarios.module').then(x => x.UsuariosModule) },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
