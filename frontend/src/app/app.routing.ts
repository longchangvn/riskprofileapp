import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';


export const AppRoutes: Routes = [
  {
    // default routes
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'partners',
        loadChildren: './modules/partners/partner-module#PartnerModule'
      }
    ]
  },

  {
    path: 'logout',
    redirectTo: 'error/404'
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

