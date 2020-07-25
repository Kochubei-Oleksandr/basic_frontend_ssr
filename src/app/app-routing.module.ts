import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';
import {ROUTING_NAMES} from "../shared/constants/routing-names.const";

const routes: Routes = [
  {
    path: ROUTING_NAMES.home,
    component: LandingComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
