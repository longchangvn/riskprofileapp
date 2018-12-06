import { Routes } from '@angular/router';
import { BlankComponent } from './blank/blank.component';

export const PagesRoutes: Routes = [
  {
    path: 'blank',
    children: [{
      path: '',
      component: BlankComponent,
      data: {
        heading: 'Blank'
      }
    }]
  }
];
