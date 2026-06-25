import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../models/categories/category.model';
import {  CreateCategoryModel } from '../../models/categories/createCategory.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  httpClient = inject(HttpClient)
  API_URL = "https://localhost:7022/api/"
  router = inject(Router)

  getAll() : Observable<Category[]>{

  return this.httpClient.get<Category[]>(`${this.API_URL}Categories`);
  }

  getById(){

  }

  create(newCategory : CreateCategoryModel){
    this.httpClient.post(`${this.API_URL}Categories`,newCategory).subscribe({
      next : () => {
          this.router.navigateByUrl('/category-list')
      }
    })
  }

  update(){

  }

  delete(){

  }

}
