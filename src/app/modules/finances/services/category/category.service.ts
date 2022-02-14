import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesData = [
    {
      id: 0,
      icon: 'home',
      color: 'bg-red-400',
      name: 'Hogar',
    },
    {
      id: 1,
      icon: 'local_pizza',
      color: 'bg-yellow-400',
      name: 'Alimentos',
    },
    {
      id: 2,
      icon: 'sports_esports',
      color: 'bg-purple-400',
      name: 'Entretenimiento',
    },
    {
      id: 3,
      icon: 'health_and_safety',
      color: 'bg-blue-400',
      name: 'Salud y Belleza'
    },
    {
      id: 4,
      icon: 'health_and_safety',
      color: 'bg-blue-400',
      name: 'Salud y Belleza'
    },
    {
      id: 5,
      icon: 'health_and_safety',
      color: 'bg-blue-400',
      name: 'Salud y Belleza'
    },
  ];

  subcategoriesData = [
    {
      id: 0,
      category: 0,
      name: 'CONSTRUCCIÓN Y REMODELACIÓN'
    },
    {
      id: 1,
      category: 0,
      name: 'ARTÍCULOS PARA EL HOGAR'
    },
    {
      id: 2,
      category: 0,
      name: 'MASCOTAS'
    },
    {
      id: 3,
      category: 1,
      name: 'DESPENSA'
    },
    {
      id: 4,
      category: 1,
      name: 'RESTAURANTE'
    },
    {
      id: 5,
      category: 1,
      name: 'OTROS ALIMENTOS'
    },
    {
      id: 6,
      category: 2,
      name: 'CINE Y MÚSICA'
    },
    {
      id: 7,
      category: 2,
      name: 'JUGUETES Y VIDEOJUEGOS'
    },
    {
      id: 8,
      category: 2,
      name: 'MUSEOS Y PARQUES'
    },
    {
      id: 9,
      category: 2,
      name: 'SUSCRIPCIONES Y APPS'
    },
    {
      id: 10,
      category: 3,
      name: 'PERFUMES Y COSMÉTICOS'
    },
    {
      id: 11,
      category: 3,
      name: 'SALÓN DE BELLEZA'
    },
    {
      id: 12,
      category: 3,
      name: 'DENTISTA'
    },
  ];

  readonly categories$ = of(this.categoriesData);

  readonly subcategories$ = of(this.subcategoriesData);
}
