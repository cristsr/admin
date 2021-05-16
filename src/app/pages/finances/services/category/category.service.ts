import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, delay, retry, share, shareReplay, switchMap } from 'rxjs/operators';
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
      subcategories: [
        {
          categoryId: 0,
          name: 'CONSTRUCCIÓN Y REMODELACIÓN'
        },
        {
          categoryId: 0,
          name: 'ARTÍCULOS PARA EL HOGAR'
        },
        {
          categoryId: 0,
          name: 'MASCOTAS'
        },
      ]
    },
    {
      id: 1,
      icon: '',
      color: '',
      name: 'Alimentos',
      subcategories: [
        {
          categoryId: 1,
          name: 'DESPENSA'
        },
        {
          categoryId: 1,
          name: 'RESTAURANTE'
        },
        {
          categoryId: 1,
          name: 'OTROS ALIMENTOS'
        },
      ]
    },
    {
      id: 2,
      icon: '',
      color: '',
      name: 'Entretenimiento',
      subcategories: [
        {
          categoryId: 2,
          name: 'CINE Y MÚSICA'
        },
        {
          categoryId: 2,
          name: 'JUGUETES Y VIDEOJUEGOS'
        },
        {
          categoryId: 2,
          name: 'MUSEOS Y PARQUES'
        },
        {
          categoryId: 2,
          name: 'SUSCRIPCIONES Y APPS'
        },
        {
          categoryId: 2,
          name: 'BARES Y RESTAURANTES'
        },
        {
          categoryId: 2,
          name: 'ALCOHOL Y TABACO'
        },
      ]
    },
    {
      id: 3,
      icon: '',
      color: '',
      name: 'Salud y Belleza',
      subcategories: [
        {
          categoryId: 3,
          name: 'PERFUMES Y COSMÉTICOS'
        },
        {
          categoryId: 3,
          name: 'SALÓN DE BELLEZA'
        },
      ]
    },
  ];

  categories =  this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
    switchMap(() => of(this.categoriesData)),
    retry( 2),
    shareReplay(1),
  );

  constructor(private httpClient: HttpClient) {

  }

}
