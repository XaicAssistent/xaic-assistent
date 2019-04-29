import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class UserService {

  constructor(private http:HttpClient){}

  private createRequestHeader() {
    if(appSettings.getString("token")){
      return new HttpHeaders({'Content-Type': 'application/json','Authorization': appSettings.getString("token", "")});
    } else{ 
      return new HttpHeaders({ 'Content-Type': 'application/json'});     
    }
  }

  logUser(email:string, pass:string){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/login";
    return this.http.post(serverUrl, {'email' : email, "password" : pass}, {headers: this.createRequestHeader()});
  }
}