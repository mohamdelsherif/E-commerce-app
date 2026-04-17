import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
;
@Component({
  selector: 'app-home-slider',
  imports: [],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeSliderComponent {

  ngOnInit() {
    register();
  }

}
