import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CloudComponent } from './pages/cloud/cloud.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { VServerComponent } from './pages/v-server/v-server.component';
import { GameServerComponent} from './pages/game-server/game-server.component';
import { DedicatedServerComponent } from './pages/dedicated-server/dedicated-server.component';
import { CartComponent } from './pages/cart/cart.component';
import { AccountComponent } from './pages/account/account.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { BillingSettingsComponent } from './pages/settings/billing-settings/billing-settings.component';
import { SecuritySettingsComponent } from './pages/settings/security-settings/security-settings.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { AdressesSettingsComponent } from './pages/settings/adresses-settings/adresses-settings.component';
import { SecurityLogComponent } from './pages/settings/security-log/security-log.component';

const routes: Routes = [
  {path: 'cloud', component: CloudComponent},
  {path: 'login', component: LoginComponent},
  {path: 'v-server', component: VServerComponent},
  {path: 'game-server', component: GameServerComponent},
  {path: 'dedicated-server', component: DedicatedServerComponent},
  //{path: 'news', component: },
  {path: 'account', component: AccountComponent},
  {path: 'cart', component: CartComponent},
  {
    path: 'settings', 
    component: SettingsComponent,
    children: [
      {path: 'account', component: AccountSettingsComponent},
      {path: 'security', component: SecuritySettingsComponent},
      {path: 'addresses', component: AdressesSettingsComponent},
      {path: 'billing', component: BillingSettingsComponent},
      {path: 'security-log', component: SecurityLogComponent}
    ]
  },
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
