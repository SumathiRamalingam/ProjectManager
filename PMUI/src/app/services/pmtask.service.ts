import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest,  HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Task} from '../task';

let headersObj = new Headers({'content-Type':'application/json'});
var options = { headers: headersObj};

@Injectable({
  providedIn: 'root'
})
export class PMTaskService {  
  task : Task; 
  constructor( private http:HttpClient) { }
  baseUrl: string = 'http://localhost:5555/api/Task';

  getTasks():Observable<Task[]>{              
    return this.http.get<Task[]>(this.baseUrl);             
 };
    
 get(Id:Number):Observable<Task>{
   return this.http.get<Task>(this.baseUrl+"/" + Id);   
 }

 Add(item:Task):Observable<any>
 {      
   return this.http.post(this.baseUrl,item);   
 }
 Delete(Id:number):Observable<any>
 {
   return this.http.delete(this.baseUrl+"/"+Id);
 }
 Update(item:Task):Observable<any>{   
   return this.http.put(this.baseUrl+"/"+item.TaskId, item);
 }
}
