import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;

  constructor(private socket: Socket) { 
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus=true;
    });
 
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus=false;
    });
   }

   emit( evento: string, payload?:any, callback?: Function){
    console.log('Emitiendo ', evento);
      this.socket.emit( evento, payload, callback);
   }

   listen( evento: string){
    return this.socket.fromEvent(evento)
   }
}
