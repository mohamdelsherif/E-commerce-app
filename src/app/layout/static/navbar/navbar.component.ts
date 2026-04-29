import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { PlatformService } from '../../../core/services/platform/platform.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  private readonly cartService: CartService = inject(CartService);
  private readonly platformService: PlatformService = inject(PlatformService);
  private readonly wishlistService = inject(WishlistService);


  iSlogged = computed(() => this.authService.isLoggin());
  numOfCartItems = computed(() => this.cartService.numOfCartItems());
  numOfWishlistItems = computed(() => this.wishlistService.wishlistCount());

  mobileMenuOpen = false;

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  ngOnInit(): void {
    this.flowbite();
    if (this.platformService.isBrowser()) {
      this.cartService.getCartItems().subscribe();
      this.wishlistService.getWishlistItems().subscribe();
    }
  }

  flowbite() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logout() {
    localStorage.removeItem('freshToken');
    localStorage.removeItem('freshUser');
    this.router.navigate(['/login']);
    this.authService.isLoggin.set(false);
  }
}
