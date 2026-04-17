import { Routes } from '@angular/router';
import { HomeComponent } from './layout/features/home/home.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { title } from 'process';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'shop',
    loadComponent: () => import('./layout/features/shop/shop.component')
      .then(m => m.ShopComponent),
    title: 'Shop'
  },
  {
    path: 'categories',
    loadComponent: () => import('./layout/features/categories/categories.component')
      .then(m => m.CategoriesComponent),
    title: 'Categories'
  },
  {
    path: 'brands',
    loadComponent: () => import('./layout/features/brands/brands.component')
      .then(m => m.BrandsComponent),
    title: 'Brands'
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/features/cart/cart.component')
      .then(m => m.CartComponent),
    title: 'Cart'
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/features/wishlist/wishlist.component')
      .then(m => m.WishlistComponent),
    title: 'Wishlist'
  },
  {
    path: 'checkOut/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/features/adderss/adderss.component')
      .then(m => m.AdderssComponent),
    title: 'Checkout'
  },
  {
    path: 'login',
    loadComponent: () => import('./layout/features/login/login.component')
      .then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./layout/features/register/register.component')
      .then(m => m.RegisterComponent),
    title: 'Register'
  },
  {
    path: "forgot-password",
    loadComponent: () => import('./layout/features/forgetpassword/forgetpassword.component')
      .then(m => m.ForgetpasswordComponent),
    title: 'Forgot Password'
  },
  {
    path: '**',
    loadComponent: () => import('./layout/features/notfound/notfound.component')
      .then(m => m.NotfoundComponent),
    title: 'Not Found'
  }
];
