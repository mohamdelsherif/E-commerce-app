import { Component } from '@angular/core';
import { FeaturedProductsComponent } from "../../../shared/components/feature-product/featured-products.component";

@Component({
  selector: 'app-shop',
  imports: [FeaturedProductsComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent { }
