import { Component, Input, OnInit } from '@angular/core';
import { RabbitmqService } from '../rabbitmq.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
 messages: string[] = [];
  newMessage = '';
  constructor(  private websocketService: RabbitmqService,private http: HttpClient) { }
checkUorA:boolean=false;
  // message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() visible: boolean = false;
history:any
hflag:boolean=false
visibleMessages: string[] = []; // w
showAll: boolean = false;
  ngOnInit(): void {
    this.history = "See all messages";
let check=localStorage.getItem("username");

if(check=="admin"){
  this.checkUorA=true;
}

      //  this.websocketService.connect();

    this.websocketService.messageStream$.subscribe((msg: string) => {
      this.visible =true;
      this.messages.push(msg);
      this.updateVisibleMessages();   
   setTimeout(() => {
      //  this.visible =false;
      }, 3000);
    });
  }




  hide() {
  this.visible=  !this.visible ;
   
  }
  getHistory(){
    this.hflag=!this.hflag;
  this.history = this.hflag ? "Hide all messages" : "See all messages";
    

 this.http.get('http://localhost:8001/api/messages/history', {
      responseType: 'text'
    }).subscribe((respose:any) =>{
      this.messages=JSON.parse(respose);
  this.updateVisibleMessages();
      console.log(":::::::::::::"+respose);
       
    });
      

  }
updateVisibleMessages() {
  this.visibleMessages = this.hflag ? this.messages : this.messages.slice(-2);
}

 sendMessage(): void {
    if (!this.newMessage.trim()) return;
    this.http.post('http://localhost:8001/api/messages/send', this.newMessage, {
      responseType: 'text'
    }).subscribe(() => this.newMessage = '');
     
  }

  
}
