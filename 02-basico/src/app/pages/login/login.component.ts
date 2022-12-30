import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nombre:string = '';

  constructor( private websocketService:WebsocketService, private router:Router){}

  ingresar(){
    this.websocketService.loginWS(this.nombre)
    .then(()=>{
      this.router.navigateByUrl('/mensajes');
    });

  }

}
