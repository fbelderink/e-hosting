import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { SecuritySettingsComponent } from './pages/settings/security-settings/security-settings.component';
import { BillingSettingsComponent } from './pages/settings/billing-settings/billing-settings.component';
import { SettingsNavigationComponent } from './pages/settings/settings-navigation/settings-navigation.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { NavigationItemComponent } from './pages/navigation/navigation-item/navigation-item.component';
import { NavigationDropdownItemComponent } from './pages/navigation/navigation-dropdown-item/navigation-dropdown-item.component';
import { NavigationDropdownMenuComponent } from './pages/navigation/navigation-dropdown-item/navigation-dropdown-menu/navigation-dropdown-menu.component';

import { TokenUpdateService } from './services/token-update.service';
import { ClickOutsideDirective } from './directives/click-outside-directive';

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
    LoginCardComponent,
    AccountComponent,
    SettingsComponent,
    AccountSettingsComponent,
    SecuritySettingsComponent,
    BillingSettingsComponent,
    SettingsNavigationComponent,
    NavigationComponent,
    NavigationItemComponent,
    NavigationDropdownItemComponent,
    NavigationDropdownMenuComponent,
    ClickOutsideDirective,
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
  providers: [
    CookieService,
    [{ provide: HTTP_INTERCEPTORS, useClass: TokenUpdateService, multi: true}],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
