import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  texto: string = '';

  constructor(private chatService: ChatService){}

  enviar(){
    console.log(this.texto);
    this.chatService.sendMessage(this.texto)
    this.texto = '';

  }

}
