import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseApi } from '../../../shared/core/base-api.service';
import { Category } from '../models/categiry.model';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
