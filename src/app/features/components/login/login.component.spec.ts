import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';


fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        RouterTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('verificar si renderiza el componente', () => {
    expect(component).toBeTruthy();
  });

  it('verificar si hay un FORMULARIO', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container form')?.textContent).toBeTruthy();
  });

  it('verificar si hay un BOTON', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.container form button')?.textContent).toBeTruthy();
  });
});
