import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseApi } from '../../../shared/core/base-api.service';
import { Category } from '../models/categiry.model';

@Injectable()
export class CategoriesService extends BaseApi {

  private categories: Category[] = [
    {
      'name': 'Дом',
      'capacity': 15000,
      'id': 1
    },
    {
      'name': 'Еда',
      'capacity': 10000,
      'id': 2
    },
    {
      'id': 3,
      'name': 'Машина',
      'capacity': 7000
    }
  ];

  private idCount = 3;

  constructor(public http: Http) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return Observable.of(this.categories.slice());
  }

  addCategory(category: Category): Observable<Category> {
    category.id = ++this.idCount;
    this.categories.push(category);
    return Observable.of(category);
  }

  getCategoryById(id: number): Observable<Category> {
    return Observable.of(this.categories.find(c => c.id === id));
  }

  editCategory(category: Category): Observable<Category> {
    category.id = +category.id;
    let idx = this.categories.findIndex(c => c.id === category.id);
    this.categories[idx] = category;
    return Observable.of(category);
  }
}
