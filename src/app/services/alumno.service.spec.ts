import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { AlumnoService } from './alumno.service';
import { Alumno } from '../models/alumno.model';
import { environment } from '../../environments/environment';


fdescribe('AlumnoService', () => {
  let service: AlumnoService;
  let httpController: HttpTestingController;
  const mockResp: Alumno[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        MockModule(HttpClientModule),
        HttpClientTestingModule
      ],
      providers: []
    });
    service = TestBed.inject(AlumnoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('verificar si se renderiza el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('verificar la peticion http GET de alumnos', () => {
    service.obtenerAlumnos().subscribe((alumnos) => {
      expect(alumnos).toEqual(mockResp)
    })
    const req = httpController.expectOne({method: 'GET', url: environment.apiUrl + 'alumnos'});
    req.flush(mockResp)
  });
});