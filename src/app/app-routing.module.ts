import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsPageModule)
  },
  {
    path: 'user-form/:review/:service',
    loadChildren: () => import('./user-form/user-form.module').then(m => m.UserFormPageModule)
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./thankyou/thankyou.module').then(m => m.ThankyouPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
