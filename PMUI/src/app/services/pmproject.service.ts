import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest,  HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Project} from '../project';

let headersObj = new Headers({'content-Type':'application/json'});
var options = { headers: headersObj};

@Injectable({
  providedIn: 'root'
})
export class PMProjectService {  
  project : Project; 
  constructor( private http:HttpClient) { }
  baseUrl: string = 'http://localhost:5555/api/Project';  

  getProjects():Observable<Project[]>{              
    return this.http.get<Project[]>(this.baseUrl);             
 };
    
 get(Id:Number):Observable<Project>{
   return this.http.get<Project>(this.baseUrl+"/" + Id);   
 }
 Add(item:Project):Observable<any>
 {      
   return this.http.post(this.baseUrl,item);   
 }
 Delete(Id:number):Observable<any>
 {
   return this.http.delete(this.baseUrl+"/"+Id);
 }
 Update(item:Project):Observable<any>{   
   return this.http.put(this.baseUrl+"/"+item.ProjectId, item);
 }
}
