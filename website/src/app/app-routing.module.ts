import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CloudComponent } from './cloud/cloud.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { VServerComponent } from './v-server/v-server.component';
import { GameServerComponent} from './game-server/game-server.component';
import { DedicatedServerComponent } from './dedicated-server/dedicated-server.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: 'cloud', component: CloudComponent},
  {path: 'login', component: LoginComponent},
  {path: 'v-server', component: VServerComponent},
  {path: 'game-server', component: GameServerComponent},
  {path: 'dedicated-server', component: DedicatedServerComponent},
  {path: 'cart', component: CartComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
