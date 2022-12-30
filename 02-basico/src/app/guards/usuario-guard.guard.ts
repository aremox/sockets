import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardGuard implements CanActivate, CanLoad {

  constructor(private websocketService: WebsocketService, private router:Router) { }


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.websocketService.getUsuario()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.websocketService.getUsuario()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false
    }
  }



}
