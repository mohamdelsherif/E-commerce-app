import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/category/categories.service';
import { Icategory } from '../../../../core/models/icatagory/icategory.interface';

@Component({
  selector: 'app-featured-categories',
  imports: [],
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.css',
})
export class FeaturedCategoriesComponent {
  private readonly categoriesService: CategoriesService = inject(CategoriesService);
  AllCategories = signal<Icategory[]>([]);

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.AllCategories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
