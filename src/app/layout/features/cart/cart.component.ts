import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../../core/models/iproduct/iproduct.interface';
import { ProductItem } from '../../../core/models/productItem/product-item.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private readonly cartService: CartService = inject(CartService)
  private readonly toastr: ToastrService = inject(ToastrService)

  totalCartPrice = signal<number>(0)
  cartId = signal<string>('')
  productsList = signal<ProductItem[]>([])
  numOfCartItems = computed(() => this.cartService.numOfCartItems())

  ngOnInit(): void {
    this.getAllItems()
  }

  getAllItems() {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success')
        this.cartId.set(response.cartId)
        console.log(this.cartId());
        this.cartService.numOfCartItems.set(response.numOfCartItems)
        this.totalCartPrice.set(response.data.totalCartPrice)
        this.productsList.set(response.data.products)
      }
    })
  }

  deleteitem(proId: string) {
    this.cartService.deleteItem(proId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success')
        this.cartService.numOfCartItems.set(response.numOfCartItems)
        this.totalCartPrice.set(response.data.totalCartPrice)
        this.productsList.set(response.data.products)
      }
    })
  }

  editQ(proId: string, count: number) {
    if (count < 1) {
      this.toastr.error('Quantity must be at least 1', 'Error')
      return
    }
    this.cartService.editItemQ(proId, count).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success')
        this.cartService.numOfCartItems.set(response.numOfCartItems)
        this.totalCartPrice.set(response.data.totalCartPrice)
        this.productsList.set(response.data.products)
      }
    })
  }

  clearAllItem() {
    this.cartService.clearAllItems().subscribe((reaponse) => {
      this.toastr.success(reaponse.message, 'Success')
      this.cartService.numOfCartItems.set(0)
      this.totalCartPrice.set(0)
      this.productsList.set([])
    })
  }

}
