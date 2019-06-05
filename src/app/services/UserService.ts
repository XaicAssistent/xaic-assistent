import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";
import { UserData } from "../model/UserData";
import { UserEmpresa } from "../model/UserEmpresa";
import { UserNormal } from "../model/UserNormal";

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

  registerUser(user){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/register";
    return this.http.post(serverUrl, user, {headers: this.createRequestHeader()});
  }

  verificarCodigo(email:string, codigo:string){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/verify";
    return this.http.post(serverUrl, {'email' : email, "codigo_verificacion" : codigo}, {headers: this.createRequestHeader()});
  }

  getAllUserEmpresa(){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getAllUserEmpresa/" + appSettings.getString("tokenUser", "");
    return this.http.get(serverUrl, {headers: this.createRequestHeader()});
  }

  getInfoNewEventEmpresa(id){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getInfoNewEventEmpresa/" + appSettings.getString("tokenUser", "") + "/" + id;
    return this.http.get(serverUrl, {headers: this.createRequestHeader()});
  }

  getUser(){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getUser/" + appSettings.getString("tokenUser", "");
    return this.http.get(serverUrl, {headers: this.createRequestHeader()});
  }

  getInfoUserEmpresa(id){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getInfoUserEmpresa/" + appSettings.getString("tokenUser", "")+"/"+id;
    return this.http.get(serverUrl, {headers: this.createRequestHeader()});
  }

  getUsersEmpresaByCategory(idCategory){
    let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getUsersEmpresaByCategory/" + appSettings.getString("tokenUser", "")+"/"+idCategory;
    return this.http.get(serverUrl, {headers: this.createRequestHeader()});
  }
}