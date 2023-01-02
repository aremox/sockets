import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private wsService: WebsocketService,  ) { }

  sendMessage(mensaje: string){
    const payload = {
      de: this.wsService.getUsuario()!.nombre,
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);
  }

  getMenssages(){
    return this.wsService.listen('mensaje-nuevo')
  }

  getMenssagesPrivate(){
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos(){
    return this.wsService.listen('usuarios-activos');
  }

  emitirUsuariosActivos(){
    this.wsService.emit('obtener-usuario')
  }
}
