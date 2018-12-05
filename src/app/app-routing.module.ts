import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import{CoreComponent} from './core/core.component'
import { ProfileComponent } from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"user",
    component:UserComponent
  },
  {
    path:"index",
    component:CoreComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:"",
    component:CoreComponent
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'chat',
    component:ChatComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
