import { Component } from '@angular/core';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { FeaturedProductsComponent } from '../../../shared/components/feature-product/featured-products.component';
import { FeaturedCategoriesComponent } from './featured-categories/featured-categories.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { DealAndNewsComponent } from './deal-and-news/deal-and-news.component';

@Component({
  selector: 'app-home',
  imports: [HomeSliderComponent, FeaturedProductsComponent, FeaturedCategoriesComponent,
    NewsLetterComponent, DealAndNewsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent { }
