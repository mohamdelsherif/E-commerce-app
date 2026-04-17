import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order/order.service';

@Component({
  selector: 'app-adderss',
  imports: [ReactiveFormsModule],
  templateUrl: './adderss.component.html',
  styleUrl: './adderss.component.css',
})
export class AdderssComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private readonly orderService: OrderService = inject(OrderService)

  cartId = signal<string>('')

  adderssForm: FormGroup = new FormGroup({
    phone: new FormControl(null,),
    details: new FormControl(null,),
    city: new FormControl(null,),
  })

  ngOnInit(): void {
    this.getCartId()
  }

  getCartId() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.cartId.set(res.get('id')!)
      console.log(this.cartId())
    })
  }

  adderssSubmit(event: any) {

    if (event.submitter.value == "cash") {
      console.log(this.cartId());

    } else if (event.submitter.value == "visa") {
      this.orderService.checkOut(this.cartId(), this.adderssForm.value).subscribe({
        next: (res) => {
          window.open(res.session.url, '_blank');
        },
      })
    }


  }
}
