import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';

import { MaterialModule } from '../../../modules/material.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    ListaAlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MaterialModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    ListaAlumnosComponent
  ]
})
export class AlumnosModule { }
