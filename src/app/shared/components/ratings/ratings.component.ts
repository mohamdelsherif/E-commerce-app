import { Component, inject, input } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-ratings',
  imports: [],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css',
})
export class RatingsComponent {
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  average = input.required<number>();
  quantity = input.required<number>();

  stars = [1, 2, 3, 4, 5];


  ngOnInit(): void {
    this.flowbite();
  }

  flowbite() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  getStarClass(starIndex: number): string {
    const avg = this.average();
    if (avg >= starIndex) return 'fas fa-star text-yellow-400';
    if (avg >= starIndex - 0.5) return 'fas fa-star-half-alt text-yellow-400';
    return 'far fa-star text-gray-300';
  }

}
