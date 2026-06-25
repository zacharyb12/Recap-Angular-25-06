import { Component, inject } from '@angular/core';
import { CategoryService } from '../../shared/services/categories-services/category-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCategoryModel } from '../../shared/models/categories/createCategory.model';

@Component({
  selector: 'app-create-category',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory {

  categoryService = inject(CategoryService)
  fb = inject(FormBuilder)

  categoryForm : FormGroup;

  constructor(){
    this.categoryForm = this.fb.group({
      name : ['',[Validators.required]],
      description : ['',[Validators.required]]
    })
  }

  onSubmit(){
    if(this.categoryForm.valid){

      const newCategory : CreateCategoryModel = {
        name : this.categoryForm.value["name"],
        description : this.categoryForm.value["description"]
      }

      this.categoryService.create(newCategory)
    }
  }

}
