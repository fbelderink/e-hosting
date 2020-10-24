import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CloudComponent } from './cloud/cloud.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CloudOfferComponent } from './cloud-offer/cloud-offer.component';
import { VServerComponent } from './v-server/v-server.component';
import { GameServerComponent } from './game-server/game-server.component';
import { DedicatedServerComponent } from './dedicated-server/dedicated-server.component';
import { CartComponent } from './cart/cart.component';

import { CookieService } from 'ngx-cookie-service';
import { VServerOfferComponent } from './v-server-offer/v-server-offer.component';
import { MatTabsModule } from '@angular/material/tabs'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    VServerOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
