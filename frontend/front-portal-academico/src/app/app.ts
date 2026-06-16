import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

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

  constructor(private api: ApiService) {
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

        this.recursos = [
  {
    id: 999,
    title: 'PRUEBA MANUAL',
    description: 'SI VES ESTO EL HTML FUNCIONA',
    resource_type: 'DOCUMENT',
    author: 'ANGELICA',
    url: 'https://google.com'
  }
];

        console.log("DESPUES:", this.recursos.length);

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

ngOnInit() {
  console.log("ENTRO AL INIT");
  this.cargarRecursos();
}

}