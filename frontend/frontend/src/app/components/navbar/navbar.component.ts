import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RabbitmqService } from 'src/app/rabbitmq.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
version:any='';
  constructor(public login: LoginService,
    public use:UserService,
    private websocketService: RabbitmqService
  
  ) {}
  // message: string = '';
  type: 'success' | 'error' | 'info' | 'warning' = 'info';
  visible: boolean = false;

  private subscription!: Subscription;
    showNotification : boolean = false;
// message = 'Operation successful';

// type = 'success';
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    this.use.getVersion().subscribe((ver) => {
      console.log(ver)
      this.version = ver;
    });

     this.websocketService.connect();

    this.subscription = this.websocketService.messageStream$.subscribe((msg) => {
      // this.message = msg;
      this.type = 'info'; // Or parse based on backend message
      this.visible = true;
      if(msg){
       this.showNotification=true;
      }setTimeout(() => {
       
      }, 3000);
    });

  }


triggerNotification() {
  console.log('!!!!!!!!!!!'+ this.visible);

  // this.message = 'Data saved successfully!';
  this.type = 'success';
  this.showNotification= !this.showNotification;
//  this.showNotification=!this.visible;
 setTimeout(() => {
  
  // this.visible=!this.visible;
    
  console.log('Timeout!');
}, 1000);
}


  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
    ngOnDestroy() {
    this.subscription.unsubscribe();
    this.websocketService.disconnect();
  }
}
