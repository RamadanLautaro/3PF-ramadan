import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlumnosComponent } from './lista-alumnos.component';
import { MockModule } from 'ng-mocks';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlumnosRoutingModule } from '../alumnos-routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { Subscription } from 'rxjs';


describe('ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlumnosComponent ],
      imports: [
        MockModule(CommonModule),
        MockModule(HttpClientModule),
        MockModule(AlumnosRoutingModule),
        MockModule(MaterialModule),
        MockModule(DirectivesModule),
        MockModule(PipesModule),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verificar si hay tabla', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')?.textContent).toBeTruthy();
  });
});
