import { Injectable } from '@angular/core';
// import { Client, IMessage } from '@stomp/stompjs/esm6';
import  SockJS from 'sockjs-client';
import { Client, IMessage }  from '@stomp/stompjs';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {

  constructor() { }

  private stompClient: Client = new Client;
  private messageSubject = new Subject<string>();
  public messageStream$ = this.messageSubject.asObservable();

  connect(): void {
    const socket = new SockJS('http://localhost:8001/ws'); // ✅ Your backend endpoint
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.stompClient.subscribe('/topic/messages', (message: IMessage) => {
          console.log('Received message:', message.body);
          if (message.body) {
            this.messageSubject.next(message.body);
          }
        });
      }
    });

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected');
    }
  }



}
