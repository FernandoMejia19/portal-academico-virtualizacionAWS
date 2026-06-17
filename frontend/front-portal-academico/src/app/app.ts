import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { ChangeDetectorRef } from '@angular/core';

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
export class App implements OnInit {

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

constructor(
  private api: ApiService,
  private cdr: ChangeDetectorRef
) {
  console.log("CONSTRUCTOR");
}

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

        console.log("ANTES:", this.recursos.length);

        this.recursos = [...data];

        console.log("DESPUES:", this.recursos.length);

        this.cdr.detectChanges();

      },
      error: (err: any) => {
        console.error(err);
      }
    });

}
  obtenerImagen(tipo: string): string {

  const imagenes: any = {

    video:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',

    pdf:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',

    document:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',

    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085',

    curso:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'

  };

  return imagenes[tipo?.toLowerCase()]
    || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3';
}
crearTodo() {

  this.api.createUser(this.nuevoUsuario)
    .subscribe({

      next: (usuario: any) => {

        const recurso = {
          ...this.nuevoRecurso,
          user_id: usuario.id
        };

        this.api.createResource(recurso)
          .subscribe({

            next: () => {

              alert('Usuario y recurso creados');

              this.cargarRecursos();

            },

            error: (err: any) => {
              console.error(err);
            }

          });

      },

      error: (err: any) => {
        console.error(err);
      }

    });

}
ngOnInit() {
  console.log("ENTRO AL INIT");
  this.cargarRecursos();
}

}