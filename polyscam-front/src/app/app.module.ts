import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserComponentComponent } from './pages/user-component/user-component.component';
import { PersonComponent } from './pages/person/person.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AnnounceComponent} from "./pages/announce/announce.component";
import {PurchaseComponent} from "./pages/purchase/purchase.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminComponent} from "./admin/admin.component";
import {authGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {HomeComponent} from "./home/home.component";
import { CreateAnnounceComponent } from './pages/create-announce/create-announce.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {CreatePurchaseComponent} from "./pages/create-purchase/create-purchase.component";
import {AnnounceCardComponent} from "./pages/announce/announce-card/announce-card.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { MyPurchaseComponent } from './pages/my-purchase/my-purchase.component';
import {ConfirmDialogComponent} from "./services/confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EditAnnounceComponent} from "./pages/edit-announce/edit-announce.component";
import { EditProfilComponent } from './pages/edit-profil/edit-profil.component';

const routes: Routes = [
  { path: 'persons', component: PersonComponent },
  { path: 'announces', component: AnnounceComponent },
  { path: 'purchases', component: PurchaseComponent },
  { path: 'user', component: UserComponentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] },},
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] },},
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'create-announce', component: CreateAnnounceComponent },
  { path: 'create-purchase', component: CreatePurchaseComponent },
  { path: 'home', component: HomeComponent},
  { path: 'my-purchase', component: MyPurchaseComponent},
  { path: 'edit-announce', component: EditAnnounceComponent},
  { path: 'edit-profil', component: EditProfilComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] },},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
@NgModule({
  declarations: [
    AppComponent,
    UserComponentComponent,
    PersonComponent,
    AnnounceComponent,
    PurchaseComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    HomeComponent,
    CreateAnnounceComponent,
    CreatePurchaseComponent,
    AnnounceCardComponent,
    MyPurchaseComponent,
    ConfirmDialogComponent,
    EditAnnounceComponent,
    EditProfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
