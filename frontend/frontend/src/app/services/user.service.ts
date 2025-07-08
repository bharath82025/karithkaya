import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { imageurl } from './otherNewUrls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/auth/register`, user);
  }

public getVersion(){
  return this.http.get(`${baseUrl}/auth/version`);
}



public  getBgColours(){

  return this.http.get(`${imageurl}/images`,{ responseType: 'text' }); 
}

public selectColor(color:any){
 return this.http.put(`${imageurl}/images/activate/`+color,color);
}

public getActiveColor(){
  return this.http.get(`${imageurl}/images/a`,{ responseType: 'text' }); 
}

public addColor(data:any){
  return this.http.post(`${imageurl}/images`,data,{ responseType: 'text' });
}

}
