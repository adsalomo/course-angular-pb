import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderModel } from 'src/app/models/gender.model';
import { MovieModel } from 'src/app/models/movie.models';
import { GenderService } from 'src/app/services/gender.service';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  formMovie: FormGroup;
  genders: GenderModel[] = [];
  movies: MovieModel[] = [];

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private genderService: GenderService
  ) {

    this.createForm();

  }

  ngOnInit(): void {
    this.getGenders();
    this.getMovies();
  }

  private getMovies() {
    this.movieService.getAll()
      .subscribe((resp: MovieModel[]) => {
        this.movies = resp;
      }, (error) => {
        console.log(error);
      })
  }

  private getGenders() {
    this.genderService.getAll()
      .subscribe((resp: GenderModel[]) => {
        this.genders = resp
      }, (error) => {
        console.log(error);
      });
  }

  get nameInvalid() {
    return this.formMovie.get('name').invalid && this.formMovie.get('name').touched;
  }

  get descriptionInvalid() {
    return this.formMovie.get('description').invalid && this.formMovie.get('description').touched;
  }

  get imageInvalid() {
    return this.formMovie.get('image').invalid && this.formMovie.get('image').touched;
  }

  get actorsInvalid() {
    return this.formMovie.get('actors').invalid && this.formMovie.get('actors').touched;
  }

  get genderIdInvalid() {
    return this.formMovie.get('genderId').invalid && this.formMovie.get('genderId').touched;
  }

  get releaseDateInvalid() {
    return this.formMovie.get('releaseDate').invalid && this.formMovie.get('releaseDate').touched;
  }

  createForm() {
    this.formMovie = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      actors: ['', [Validators.required, Validators.minLength(3)]],
      genderId: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]]
    });
  }

  createMovie() {
    if (this.formMovie.invalid) {
      return Object.values(this.formMovie.controls)
        .forEach(c => {
          console.log(c.value);
          c.markAsTouched();
        });
    }

    console.log(this.formMovie.value);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Por favor espere...'
    });

    Swal.showLoading();

    this.movieService.create(this.formMovie.value)
      .subscribe((resp) => {
        Swal.close();
        console.log(resp);
        Swal.fire({
          title: 'Crear pelicula',
          allowOutsideClick: false,
          icon: 'info',
          text: 'Se ha creado la pelicula correctamente'
        }).then(() => {
          this.formMovie.reset({
            name: '',
            description: '',
            image: '',
            actors: '',
            genderId: '',
            releaseDate: ''
          });
          this.getMovies();
        });
      }, (error) => {
        Swal.close();
        console.log(error);
        Swal.fire({
          title: 'Crear pelicula',
          allowOutsideClick: false,
          icon: 'error',
          text: 'Se presentó un error al procesar la solicitud'
        });
      });
  }

  deleteMovie(id: number) {
    Swal.fire({
      title: 'Eliminar pelicula',
      allowOutsideClick: false,
      icon: 'info',
      text: '¿Está seguro de eliminar la pelicula?',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((resp) => {
      if (resp.value) {
        this.movieService.delete(id)
          .subscribe(() => {
            this.getMovies();
          }, (error) => {
            console.log(error);
            Swal.fire({
              title: 'Eliminar pelicula',
              allowOutsideClick: false,
              icon: 'error',
              text: 'Se presentó un error al procesar la solicitud'
            });
          })
      }
    });
  }

}
