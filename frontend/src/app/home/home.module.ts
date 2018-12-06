import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';



@NgModule({
  imports: [CommonModule, RouterModule.forChild(HomeRoutes)],
  declarations: [HomeComponent]
})

export class HomeModule {}
