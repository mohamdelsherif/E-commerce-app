import { Component, computed, inject, input, } from '@angular/core';
import { Iproduct } from '../../../core/models/iproduct/iproduct.interface';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-single-card',
  imports: [RouterLink],
  templateUrl: './product-single-card.component.html',
  styleUrl: './product-single-card.component.css',
})
export class ProductSingleCardComponent {
  private readonly authService: AuthService = inject(AuthService)
  private readonly cartService: CartService = inject(CartService)
  private readonly wishlistService: WishlistService = inject(WishlistService)
  private readonly toastr: ToastrService = inject(ToastrService)


  product = input.required<Iproduct>();
  islogged = computed(() => this.authService.isLoggin)



  addToCart(pId: string) {
    console.log(pId);
    this.cartService.addProduct(pId).subscribe({
      next: (response) => {
        console.log(response);
        this.cartService.numOfCartItems.set(response.numOfCartItems);
        this.toastr.success(response.message, 'Success')
      },
    });
  }

  addToWishlist(pId: string) {
    this.wishlistService.addProductToWishlist(pId).subscribe({
      next: (res) => {
        console.log(res)
        console.log(pId)
        this.toastr.success(res.message, 'Success')
      }

    })
  }
}


