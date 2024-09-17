import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './components/card/card.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomizedPizzaComponent } from './components/customized-pizza/customized-pizza.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'card', component:CardComponent,canActivate: [AuthGuard]},
  {path: 'cart', component:CartComponent, canActivate: [AuthGuard]},
  {path: 'build-pizza', component:CustomizedPizzaComponent, canActivate: [AuthGuard]},
  {path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
