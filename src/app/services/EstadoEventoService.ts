import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class EstadoEventoService {
    constructor(private http:HttpClient){}

    private createRequestHeader() {
        return new HttpHeaders({ 'Content-Type': 'application/json'});     
    }
    
    getAllEstados(){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getEstados/" + appSettings.getString("tokenUser", "");
        return this.http.get(serverUrl, {headers: this.createRequestHeader()});
    }
}