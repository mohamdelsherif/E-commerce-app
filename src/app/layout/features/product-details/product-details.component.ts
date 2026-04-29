import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ProductService } from '../../../core/services/product/product.service';
import { get } from 'http';
import { IproductDetails } from '../../../core/models/iproduct/iproduct-details.interface';
import { ShippingInfoComponent } from '../../../shared/components/shipping-info/shipping-info.component';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { ICartProduct } from '../../../core/models/productItem/product-item.interface';
@Component({
  selector: 'app-product-details',
  imports: [ShippingInfoComponent, RatingsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly flowbiteService: FlowbiteService = inject(FlowbiteService);
  private readonly authService: AuthService = inject(AuthService)
  private readonly cartService: CartService = inject(CartService)
  private readonly wishlistService: WishlistService = inject(WishlistService)
  private readonly toastr: ToastrService = inject(ToastrService)
  productId = signal<string>('');
  id = input.required<string>();
  formattedDesc = signal<{ key: string, value: string }[]>([]);
  totalCartPrice = signal<number>(0)
  productsList = signal<ICartProduct[]>([])
  quantityCount = signal<number>(1);

  product = signal<IproductDetails | null>(null)
  ngOnInit() {
    this.flowbite();
    register();
    this.getProductById(this.id());
    console.log(this.id())
  }
  flowbite() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  getProductById(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product.set(res.data);
        if (res.data.description) {
          this.parseDescription(res.data.description);
        }
        console.log("the product is: ", this.product())
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  parseDescription(desc: string) {

    const lines = desc.split('\n');
    const mapped = lines.map(line => {
      const [key, value] = line.split('\t');
      return { key, value };
    });
    this.formattedDesc.set(mapped);
  }

  addToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      console.log(currentProduct._id);
      this.cartService.addProduct(currentProduct._id).subscribe({
        next: (response) => {
          this.cartService.numOfCartItems.set(response.numOfCartItems);
          this.toastr.success(response.message, 'Success');
        }
      });
    }
  }

  addToWishlist() {
    const currentProduct = this.product(); // قراءة الـ Signal مرة واحدة

    if (currentProduct) {
      this.wishlistService.addProductToWishlist(currentProduct._id).subscribe({
        next: (res) => {
          console.log('Product added to wishlist:', res);
          this.toastr.success(res.message, 'Success');
        },
        error: (err) => {
          console.error('Wishlist error:', err);
        }
      });
    }
  }
  increaseCount(): void {
    this.quantityCount.update(val => val + 1);
  }

  decreaseCount(): void {
    if (this.quantityCount() > 1) {
      this.quantityCount.update(val => val - 1);
    }
  }

}
