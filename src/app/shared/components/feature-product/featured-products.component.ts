import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { Iproduct } from '../../../core/models/iproduct/iproduct.interface';
import { ProductSingleCardComponent } from "../product-single-card/product-single-card.component";

@Component({
  selector: 'app-featured-products',
  imports: [ProductSingleCardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent {
  private readonly productService: ProductService = inject(ProductService)

  listOfProducts = signal<Iproduct[]>([])

  ngOnInit(): void {
    this.getallProducts()
  }

  getallProducts() {
    this.productService.getAllProdects().subscribe({
      next: (res) => {
        console.log(res);
        this.listOfProducts.set(res.data)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
