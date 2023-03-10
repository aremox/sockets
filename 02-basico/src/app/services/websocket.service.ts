import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  public usuario: Usuario | null = null; 

  constructor(private socket: Socket, private router: Router) { 
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.cargarStorage()
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

   loginWS( nombre: string){

    return new Promise<void>( (resolve, reject) => {
      this.emit('configurar-usuario', {nombre}, (resp: any)=>{
        console.log(resp)
        this.usuario = new Usuario(nombre)
        this.guardarStorage();
        resolve();
      });
    
    });   
   }

   logOutWS(){
    this.usuario = null;
    localStorage.removeItem('usuario')
    const payload= {
      nombre: 'sin-nombre'
    }
    this.emit('configurar-usuario', payload, ()=>{});
    this.router.navigateByUrl('')
   }

   getUsuario(){
    return this.usuario;
   }

   guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario))
   }

   cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse( localStorage.getItem('usuario')!);
      this.loginWS(this.usuario!.nombre)
    }
   }
}
