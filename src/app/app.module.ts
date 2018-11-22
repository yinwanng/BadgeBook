import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 



import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { BadgesComponent } from './badges/badges.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


/**
 * Firebase Imports
 */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { CoreComponent } from './core/core.component';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';



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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    BadgesComponent,
    SearchComponent,
    CoreComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    LandingComponent,
    ResultComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    NgSelectModule,
    MatInputModule,
    RouterModule.forRoot([
      {path:'result',component:ResultComponent}
    ])
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
