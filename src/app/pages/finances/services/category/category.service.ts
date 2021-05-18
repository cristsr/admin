import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { retry, shareReplay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesData = [
    {
      id: 0,
      icon: '',
      color: '',
      name: 'Hogar',
    },
    {
      id: 1,
      icon: '',
      color: '',
      name: 'Alimentos',
    },
    {
      id: 2,
      icon: '',
      color: '',
      name: 'Entretenimiento',
    },
    {
      id: 3,
      icon: '',
      color: '',
      name: 'Salud y Belleza'
    },
  ];

  subcategoriesData = [
    {
      id: 0,
      categoryId: 0,
      name: 'CONSTRUCCIÓN Y REMODELACIÓN'
    },
    {
      id: 1,
      categoryId: 0,
      name: 'ARTÍCULOS PARA EL HOGAR'
    },
    {
      id: 2,
      categoryId: 0,
      name: 'MASCOTAS'
    },
    {
      id: 3,
      categoryId: 1,
      name: 'DESPENSA'
    },
    {
      id: 4,
      categoryId: 1,
      name: 'RESTAURANTE'
    },
    {
      id: 5,
      categoryId: 1,
      name: 'OTROS ALIMENTOS'
    },
    {
      id: 6,
      categoryId: 2,
      name: 'CINE Y MÚSICA'
    },
    {
      id: 7,
      categoryId: 2,
      name: 'JUGUETES Y VIDEOJUEGOS'
    },
    {
      id: 8,
      categoryId: 2,
      name: 'MUSEOS Y PARQUES'
    },
    {
      id: 9,
      categoryId: 2,
      name: 'SUSCRIPCIONES Y APPS'
    },
    {
      id: 10,
      categoryId: 3,
      name: 'PERFUMES Y COSMÉTICOS'
    },
    {
      id: 11,
      categoryId: 3,
      name: 'SALÓN DE BELLEZA'
    },
    {
      id: 12,
      categoryId: 3,
      name: 'DENTISTA'
    },
  ];

  readonly categories$ = this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
    switchMap(() => of(this.categoriesData)),
    retry(2),
    shareReplay(1),
  );

  readonly subcategories$ = this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
    switchMap(() => of(this.subcategoriesData)),
    retry(2),
    shareReplay(1),
  );

  constructor(private httpClient: HttpClient) {
  }
}
