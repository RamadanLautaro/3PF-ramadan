import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreApellido'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(nombre: string, apellido: string): string {
    return (nombre + " " + apellido);
  }
}
