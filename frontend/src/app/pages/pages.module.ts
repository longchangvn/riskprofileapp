import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PagesRoutes } from './pages.routing';

import { BlankComponent } from './blank/blank.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes)
  ],
  declarations: [ BlankComponent]
})

export class PagesModule {}
