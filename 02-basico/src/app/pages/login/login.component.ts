import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nombre:string = '';

  constructor( private websocketService:WebsocketService){}

  ingresar(){
    this.websocketService.loginWS(this.nombre)
  }

}
