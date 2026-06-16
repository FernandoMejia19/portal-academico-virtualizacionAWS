import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.spec';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  mostrarFormulario = false;

  recursos: any[] = [];

  nuevoUsuario = {
    name: '',
    email: ''
  };

  nuevoRecurso = {
    title: '',
    description: '',
    resource_type: '',
    url: '',
    user_id: 1
  };

  constructor(private api: ApiService) {}

  crearUsuario() {

    this.api.createUser(this.nuevoUsuario)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          alert('Usuario creado');
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  crearRecurso() {

    this.api.createResource(this.nuevoRecurso)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          alert('Recurso creado');
          this.cargarRecursos();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  cargarRecursos() {

    this.api.getResources()
      .subscribe({
        next: (data: any) => {
          this.recursos = data;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  ngOnInit() {
    this.cargarRecursos();
  }

}