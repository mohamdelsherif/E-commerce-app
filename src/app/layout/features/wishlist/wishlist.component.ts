import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../../core/models/iwishlist/i-wishlist.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import { PlatformService } from '../../../core/services/platform/platform.service';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {

  private readonly wishlistService: WishlistService = inject(WishlistService)
  private readonly cartservice: CartService = inject(CartService)
  private readonly router: Router = inject(Router);
  private readonly toastr: ToastrService = inject(ToastrService)
  private readonly platformService: PlatformService = inject(PlatformService)
  wishlistItems = signal<IWishlist[]>([])
  count = signal<number>(0)

  cartIds = signal<Set<string>>(new Set())
  ngOnInit(): void {
    this.getWishlistItems()
    if (this.platformService.isBrowser()) {
      this.cartservice.getCartStatus();
    }
  }

  getWishlistItems() {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res) => {
        console.log(res)
        this.wishlistItems.set(res.data)
        this.count.set(res.count)
        this.toastr.success("whishlist items loaded", 'Success')

      }
    })
  }
  removeItem(id: string) {
    this.wishlistService.deleteItem(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getWishlistItems()
        this.toastr.success(res.status, 'Success')
      }
    })
  }
  addToCart(pId: string) {
    this.cartservice.addProduct(pId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.cartservice.numOfCartItems.set(response.numOfCartItems);
        this.cartservice.cartProductIds.update(ids => [...ids, pId]);
      },
    });
  }
  goToCart() {
    this.router.navigate(['/cart']);
  }

}
