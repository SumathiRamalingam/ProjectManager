import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest,  HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {User} from '../user';

let headersObj = new Headers({'content-Type':'application/json'});
var options = { headers: headersObj};

@Injectable({
  providedIn: 'root'
})
export class PMUserService {  
  user : User; 
  constructor( private http:HttpClient) { }
  baseUrl: string = 'http://localhost:5555/api/User';

  getUsers():Observable<User[]>{              
    return this.http.get<User[]>(this.baseUrl);             
 };
    
 get(Id:Number):Observable<User>{
   return this.http.get<User>(this.baseUrl+"/" + Id);   
 }
 Add(item:User):Observable<any>
 {      
   return this.http.post(this.baseUrl,item);   
 }
 Delete(Id:number):Observable<any>
 {
   return this.http.delete(this.baseUrl+"/"+Id);
 }
 Update(item:User):Observable<any>{   
   return this.http.put(this.baseUrl+"/"+item.UserId, item);
 }
}
