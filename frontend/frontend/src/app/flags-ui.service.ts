import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FlagsUiService {

  private messageSource = new BehaviorSubject<any>(null);
  currentMessage$ = this.messageSource.asObservable();

  // Start with default color
  private bgColor = new BehaviorSubject<any>({ color: 'accept' });
  getcolor = this.bgColor.asObservable();

  private colorFetched: boolean = false; // Tracks if API was already called

  constructor(private userService: UserService) { }

  /**
   * Call this in component ngOnInit() – it will fetch from API only once.
   */
  initColorOnce() {
    if (!this.colorFetched) {
      this.colorFetched = true;
      this.fetchColorFromServer();
    }
  }

  /**
   * Called once on init if no color has been fetched
   */
  private fetchColorFromServer() {
    this.userService.getActiveColor().subscribe({
      next: (data: any) => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        console.log('Fetched color from server:', parsed);
        this.bgColor.next(parsed); // full object like { color: 'red' }
      },
      error: (err) => {
        console.error('Failed to load active color', err);
      }
    });
  }

  /**
   * When user selects or updates a color.
   */
setColor(data: any) {
  console.log("flag data:", JSON.stringify(data));

  if (!data || !data.color) {
    console.warn("Invalid color data provided to setColor:", data);
    return;
  }

  this.userService.selectColor(data.color).subscribe(
    (response: any) => {
      console.log("Color from backend:", response);

     
    },
    (error) => {
      console.error("Error for activating color:", error);
    }
  );
   this.bgColor.next(data);
}
  /**
   * Optional method for other component communication
   */
  changeMessage(data: any) {
    this.messageSource.next(data);
  }

}
