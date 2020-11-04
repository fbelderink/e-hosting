import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CloudComponent } from './pages/cloud/cloud.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CloudOfferComponent } from './pages/cloud/cloud-offer/cloud-offer.component';
import { VServerComponent } from './pages/v-server/v-server.component';
import { GameServerComponent } from './pages/game-server/game-server.component';
import { DedicatedServerComponent } from './pages/dedicated-server/dedicated-server.component';
import { CartComponent } from './pages/cart/cart.component';

import { CookieService } from 'ngx-cookie-service';
import { VServerOfferComponent } from './pages/v-server/v-server-offer/v-server-offer.component';
import { MatTabsModule } from '@angular/material/tabs'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginCardComponent } from './pages/login/login-card/login-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CloudComponent,
    NotFoundComponent,
    HomeComponent,
    CloudOfferComponent,
    VServerComponent,
    GameServerComponent,
    DedicatedServerComponent,
    CartComponent,
    VServerOfferComponent,
    LoginCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
