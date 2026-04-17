import { Component, inject, signal } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { ToastrService } from 'ngx-toastr';
import { Ibrand } from '../../../core/models/ibrand/ibrand.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly brandsService: BrandsService = inject(BrandsService);
  private readonly toastr: ToastrService = inject(ToastrService);
  brands = signal<Ibrand[]>([]);
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Brands loaded successfully');
        this.brands.set(res.data);
      },
    });
  }
}
