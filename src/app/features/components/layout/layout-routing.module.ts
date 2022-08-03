import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../../../guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', canActivate: [AuthGuard], loadChildren: () => import('../landing/landing.module').then(x => x.LandingModule) },
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
