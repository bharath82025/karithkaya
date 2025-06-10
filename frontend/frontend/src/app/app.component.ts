import { Component, OnInit, Renderer2 } from '@angular/core';
import { RabbitmqService } from './rabbitmq.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements OnInit{
  title = 'TestYourself';

 constructor(private websocketService: RabbitmqService,private http: HttpClient, private renderer: Renderer2) {
    this.websocketService.connect();
   
  }
  ngOnInit(): void {
   
    this.loadBackgroundImage();
  }


   
loadBackgroundImage() {
  this.http.get('http://localhost:9001/api/images/background', { responseType: 'blob' })
    .subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.renderer.setStyle(document.body, 'backgroundImage', `url('${imageUrl}')`);
        this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
        this.renderer.setStyle(document.body, 'backgroundPosition', 'center');
      };
      reader.readAsDataURL(blob);
    });
  }
}
