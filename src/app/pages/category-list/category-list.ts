import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../shared/models/categories/category.model';
import { CategoryService } from '../../shared/services/categories-services/category-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit{
  
  categories : Category[] = []
  
  categoriesService = inject(CategoryService)
  
  ngOnInit(): void {
    this.categoriesService.getAll().subscribe({
      next : (res) => {
        this.categories = res;
        console.log(res);
        
      }
    })
    
  }


}
