import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product.component';


import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './header/header.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { PopupComponent } from './popup/popup.component';
import { FooterComponent } from './footer/footer.component';


const routes:Routes = [
{
  path: '', component:ProductComponent,
  canActivate: [AuthGuard]
},
{
  path: 'register', component:RegisterComponent
},
{
  path: 'login', component:LoginComponent
},
{
  path: 'ecommerce', component:EcommerceComponent,
  canActivate: [AuthGuard]
},
{
  path: 'cart', component:CartComponent,
  canActivate: [AuthGuard]
},
{
  path: 'order', component:OrderComponent,
  canActivate: [AuthGuard]
},


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    HeaderComponent,
    EcommerceComponent,
    CartComponent,
    OrderComponent,
    PopupComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added

    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
