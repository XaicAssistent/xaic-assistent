import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../model/Category";

@Injectable()
export class CategoryService {
    
    constructor(private http:HttpClient){}

    private createRequestHeader() {
        return new HttpHeaders({ 'Content-Type': 'application/json'});     
    }

    addCategory(category: Category){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/addCategory";
        return this.http.post(serverUrl, category, {headers: this.createRequestHeader()});
    }

    getCategorys(){
        let serverUrl = "https://stucom.flx.cat/alu/dam2t01/getAllCategorys";
        return this.http.get(serverUrl, {headers: this.createRequestHeader()});
    }
}