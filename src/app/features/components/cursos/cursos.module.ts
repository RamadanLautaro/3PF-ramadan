import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';

import { MaterialModule } from '../../../modules/material.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';


@NgModule({
  declarations: [
    ListaCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    ListaCursosComponent
  ]
})
export class CursosModule { }
