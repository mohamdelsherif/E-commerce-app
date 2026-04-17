import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/category/categories.service';
import { Icategory } from '../../../core/models/icatagory/icategory.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly categoriesService: CategoriesService = inject(CategoriesService)
  private readonly toastr: ToastrService = inject(ToastrService)


  categories = signal<Icategory[]>([])
  ngOnInit(): void {
    this.getCategories()
  }


  getCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Categories loaded successfully');
        this.categories.set(res.data);
      },
    });
  }
}
