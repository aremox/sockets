import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuardGuard } from './guards/usuario-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'mensajes', component: MensajesComponent,canLoad:[UsuarioGuardGuard], canActivate: [UsuarioGuardGuard]},
  { path: '**', component: LoginComponent}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
