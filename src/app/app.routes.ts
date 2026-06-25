import { Routes } from '@angular/router';

export const routes: Routes = [
    {path : '' , loadComponent : () => import('./pages/homepage/homepage').then(c => c.Homepage) },
    {path : 'category-list' , loadComponent : () => import('./pages/category-list/category-list').then(c => c.CategoryList)},
    {path : 'category-create' , loadComponent: () => import('./pages/create-category/create-category').then(c => c.CreateCategory)}
];
