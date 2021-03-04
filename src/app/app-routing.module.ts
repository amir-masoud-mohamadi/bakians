import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register-login',
    pathMatch: 'full'
  },
  {
    path: 'register-login',
    loadChildren: () => import('./register-login/register-login.module').then( m => m.RegisterLoginPageModule)
  },
  {
    path: 'register-login/:home',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register/code/:forget',
    loadChildren: () => import('./register/code/code.module').then( m => m.CodePageModule)
  },
  {
    path: 'register/code',
    loadChildren: () => import('./register/code/code.module').then( m => m.CodePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/forget',
    loadChildren: () => import('./login/forget/forget.module').then( m => m.ForgetPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'location-permision',
    loadChildren: () => import('./location-permision/location-permision.module').then( m => m.LocationPermisionPageModule)
  },
  {
    path: 'register/town-list',
    loadChildren: () => import('./register/town-list/town-list.module').then(m => m.TownListPageModule)
  },
  {
    path: 'license-plate',
    loadChildren: () => import('./register/town-list/town-list.module').then(m => m.TownListPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./forget/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
