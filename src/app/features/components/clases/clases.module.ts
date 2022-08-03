import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ListaClasesComponent } from './lista-clases/lista-clases.component';

import { MaterialModule } from '../../../modules/material.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';

@NgModule({
  declarations: [
    ListaClasesComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    ListaClasesComponent
  ]
})
export class ClasesModule { }
