import { Component, OnInit } from '@angular/core';
import { UserEmpresa } from '../model/UserEmpresa';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/UserService';
import { UserData } from '../model/UserData';
import { Periodo } from '../model/Perido';
import { Page, Color } from 'tns-core-modules/ui/page/page';
import { LocalNotifications } from "nativescript-local-notifications";
import { RouterExtensions } from 'nativescript-angular/router';
import * as email from "nativescript-email";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'user-info-empresa',
  templateUrl: './user-info-empresa.component.html',
  styleUrls: ['./user-info-empresa.component.css'],
  moduleId: module.id,
  providers: [UserService]
})
export class UserInfoEmpresaComponent implements OnInit {

  sideDrawer = <RadSideDrawer>app.getRootView();

  id;
  userEmpresa: UserEmpresa = new UserEmpresa();


  constructor(private route: ActivatedRoute, private _userService: UserService,private routerExtensions: RouterExtensions) { }

  ngOnInit() {
    this.sideDrawer.gesturesEnabled = false;
    this.route.queryParams.subscribe((params) => {
      this.id = params["id-selected"];
    });
    

    this.getInfoUserEmpresa();

  }

  getInfoUserEmpresa() {
    this._userService.getInfoUserEmpresa(this.id).subscribe(
      (ok) => {

        var userData = ok["userData"];

        this.userEmpresa.idUser = userData.IdUser;
        this.userEmpresa.nombre = userData.Nombre;
        this.userEmpresa.apellidos = userData.Apellidos;
        this.userEmpresa.gmail = userData.Gmail;
        this.userEmpresa.foto = userData.Foto;
        this.userEmpresa.telefono = userData.Telefono;
        this.userEmpresa.direccion = userData.Direccion;

        var empresa = ok["userEmpresa"];
        this.userEmpresa.direccionFija = empresa.DrireccionFija;

        var category = ok["userCategory"];
        this.userEmpresa.category = category.Nombre;

        ok["userPeriodos"].forEach((periodo)=>{
           var newPeriodo: Periodo = new Periodo();
           newPeriodo.dia = periodo.Dia;
          newPeriodo.empiezaHora = periodo.Empieza;
          newPeriodo.acabaHora = periodo.Acaba;
          this.userEmpresa.periodos.push(newPeriodo);
         });
         
      },
      (err) => {
        console.log(err);
      });
  }

pedirCita(){
  LocalNotifications.schedule([{
    id: 1,
    title: 'The title',
    body: 'Recurs every minute until cancelled',
    ticker: 'The ticker',
    color: new Color("red"),
    badge: 1,
    //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
    //groupSummary:"Summary of the grouped messages above", //android only
    ongoing: false, // makes the notification ongoing (Android only)
    //icon: 'res://heart',
    image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
    thumbnail: true,
    //interval: 'minute',
    //channel: 'My Channel', // default: 'Channel'
    //sound: "customsound-ios.wav", // falls back to the default sound on Android
    at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
  }]).then(
      function() {
        console.log("Notification scheduled");
      },
      function(error) {
        console.log("scheduling error: " + error);
      }
  )
}

openEmail(){
  email.compose({
    to: ['movip88@gmail.com'],
}).then(
  function() {
    console.log("Email composer closed");
  }, function(err) {
    console.log("Error: " + err);
  });
}


openMap(){
this.routerExtensions.navigateByUrl("/route");
}

}

