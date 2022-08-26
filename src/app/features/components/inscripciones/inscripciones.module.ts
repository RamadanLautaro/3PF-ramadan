import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';

import { MaterialModule } from '../../../modules/material.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    ListaInscripcionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InscripcionesRoutingModule,
    MaterialModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    ListaInscripcionesComponent
  ]
})
export class InscripcionesModule { }
