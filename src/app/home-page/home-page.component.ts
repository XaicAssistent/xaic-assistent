import { Component, OnInit, ElementRef, ViewChild, Renderer2, Output } from '@angular/core';
import { View, Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { UserService } from '../services/UserService';
import { FeedBack } from '../utils/FeedBack';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { TypeUser } from '../utils/TypeUser';
import { UserData } from '../model/UserData';
import { ModalComponent } from '../modal';
import { CategoryService } from '../services/CategoryService';
import { Category } from '../model/Category';
import { CategoryMapper } from '../mapper/CategoryMapper';
import { DaysEnum } from '../utils/DaysEnum';
import { UserNormal } from '../model/UserNormal';
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { UserEmpresa } from '../model/UserEmpresa';
import { Periodo } from '../model/Perido';
import { TimePicker } from 'tns-core-modules/ui/time-picker/time-picker';
import { DatePicker } from 'tns-core-modules/ui/date-picker/date-picker';
import * as camera from "nativescript-camera";
import { CameraService } from '../services/Camera.service';
import * as appSettings from "tns-core-modules/application-settings";
import { UserMapper } from '../mapper/UserMapper';
import { UserLoged } from '../utils/UserLoged';

@Component({
  selector: 'ns-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  moduleId: module.id,
  providers: [UserService, CategoryService, CameraService]
})
export class HomePageComponent implements OnInit {
  @ViewChild("register") angularRegister: ElementRef;
  @ViewChild("btn") btnRef: ElementRef;
  @ViewChild("circle") circleRef: ElementRef;
  @ViewChild("logo") logoRef: ElementRef;
  @ViewChild("login") angularLogin: ElementRef;
  @ViewChild("content") angularContent: ElementRef;
  @ViewChild("cabecera") angularCabecera: ElementRef;
  @ViewChild("horaInicio") angularhoraInicio: ElementRef;
  @ViewChild("horaFin") angularhoraFin: ElementRef;
  @ViewChild("modalNewCategory") modalNewCategory: ModalComponent;
  @ViewChild("modalChoseCategory") modalChoseCategory: ModalComponent;
  @ViewChild("modalNewPeriodo") modalNewPeriodo: ModalComponent;
  @ViewChild("modalAddHorario") modalAddHorario: ModalComponent;
  @ViewChild("modalVerificarCodigo") modalVerificarCodigo: ModalComponent;
  @ViewChild("modalAddPhotoEmpresa") modalAddPhotoEmpresa: ModalComponent;

  loginLayout: View;
  regsiterLayout: View;
  btnItem: View;
  circleItem: View;
  logoItem: View;
  content: View;
  cabecera: View;
  horaInicio: TimePicker;
  horaFin: TimePicker;

  isLogin = true;
  formSubmitted = false;
  navigating = false;
  loginTxt = "L o g i n";

  tipoUsuario: TypeUser;
  verHorarios: boolean = true;

  userData: UserData = new UserData();
  userNormal: UserNormal = new UserNormal();
  userEmpresa: UserEmpresa = new UserEmpresa();

  enumTipoUsuario = TypeUser;
  enumDias = Object.keys(DaysEnum);

  selectedIndex = 0;
  selectedDay = 0;
  selectedCategory = 0;
  items: Array<string> = ["Si", "No"];
  categorysNames: Array<string> = [];
  categorys: Category[] = [];

  periodos: Periodo[] = [];

  imagen:any;

  email = "";
  pass = "";
  codigo = "";

  newCategory: Category = new Category();

  imageSlider: String[] = ["https://lorempixel.com/800/600/city/2/", "https://lorempixel.com/800/600/nightlife/6/", "https://lorempixel.com/800/600/nightlife/5/"];

  constructor(private _page: Page, private _cameraService : CameraService, private _userService: UserService, private _categoryService: CategoryService, private routerExtensions: RouterExtensions, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this._page.on('navigatingTo', (data) => {
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        this.navigating = false;
        this.logoItem.translateY = 0;
    })
    this._page.actionBarHidden = true;
    this.btnItem = this.btnRef.nativeElement;
    this.loginLayout = this.angularLogin.nativeElement;
    this.regsiterLayout = this.angularRegister.nativeElement;
    this.circleItem = this.circleRef.nativeElement;
    this.logoItem = this.logoRef.nativeElement;
    this.content = this.angularContent.nativeElement;
    this.cabecera = this.angularCabecera.nativeElement;

    this.horaInicio = this.angularhoraInicio.nativeElement;
    this.horaFin = this.angularhoraFin.nativeElement;

    this.regsiterLayout.scaleY = 0;
    this.regsiterLayout.scaleX = 0;
    this.circleItem.scaleX = 0;
    this.circleItem.scaleY = 0;

    if(appSettings.getString("tokenUser", "") != ""){
      this.irACalendar();
    }
  }
  
  choseTypeUser(){
    dialogs.action({
      message: "Tipo de usuario",
      actions: Object.keys(TypeUser)
    }).then(result => {
      this.tipoUsuario = TypeUser[result];
     });
  }

  eliminarPeriodo(i : number){
    let perido = this.periodos[i];
    this.userEmpresa.periodos = this.userEmpresa.periodos.filter(obj => !obj.equals(perido));
    this.searchPeriods();
  }

  addNewHorario(){
    let perido: Periodo = new Periodo();
    perido.dia = DaysEnum[this.enumDias[this.selectedDay]];
    perido.empiezaHora = this.horaInicio.hour;
    perido.empiezaMinuto = this.horaInicio.minute;
    perido.acabaHora = this.horaFin.hour;
    perido.acabaMinuto = this.horaFin.minute;
    
    if(this.userEmpresa.periodos.filter(per => per.estaDentro(perido)).length == 0){
      this.userEmpresa.periodos.push(perido);

      this.searchPeriods();
      this.modalNewPeriodo.hide(); 
      this.modalAddHorario.show();
    }else{
      FeedBack.feedBackError("No pudes poner un perido dentro de otro...");
    }
  }

  addPhotoEmpresaCamera() {
    let options: camera.CameraOptions = {
      width: 200,
      height: 200,
      keepAspectRatio: true,
      saveToGallery: false,
      cameraFacing: "front"
    };

    this._cameraService.pickPhoto(options).then(
      (resp) => {
        this.addPhotoEmpresaToUser(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  choseMapDirection(){
    this.routerExtensions.navigateByUrl("route");
  }

  addPhotoEmpresaGallery() {
    this._cameraService.selectGaleryPhoto().then(
      (resp) => {
        this.addPhotoEmpresaToUser(resp);
      }
    );
  }

  addPhotoEmpresaToUser(resp) {
    console.log("foto añadida a array: "+resp["base64"]);
    this.userEmpresa.fotosEmpresa.push(resp["base64"]);
    this.imageSlider.push(resp["image"]);
    this.modalAddPhotoEmpresa.hide();
  }

  selectPhoto(){
    dialogs.action({
      message: "Escoge una opcion",
      cancelButtonText: "Cancelar",
      actions: ["Camara", "Galeria"]
    }).then(result => {
      result == "Camara" ? this.pickPhoto() : this.selectGaleryPhoto();
    });
  }

  pickPhoto(){
    let options:camera.CameraOptions = {
      width: 200,
      height: 200,
      keepAspectRatio: true,
      saveToGallery: false,
      cameraFacing: "front"
    };

    this._cameraService.pickPhoto(options).then(
      (resp) => {
        this.ponerFoto(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectGaleryPhoto(){
    this._cameraService.selectGaleryPhoto().then(
      (resp) => {
        this.ponerFoto(resp);
      }
    );
  }

  ponerFoto(resp){
    if(this.tipoUsuario == undefined){
      this.userData.foto = resp["base64"];
    }else{
      if(this.tipoUsuario == "empresa") { 
        this.userEmpresa.foto = resp["base64"];
      }else{
        this.userNormal.foto = resp["base64"];
      }
    }
    this.imagen = resp["image"];
  }

  searchPeriods(){
    this.periodos = this.userEmpresa.periodos.filter( perido => perido.dia == DaysEnum[this.enumDias[this.selectedDay]]);
  }

  searchPeriodsByDay(dia: any) : Periodo[]{
    return this.userEmpresa.periodos.filter( perido => perido.dia == DaysEnum[dia]);
  }

  onTimeChangedInicio(args) {
    let timePicker = <TimePicker>args.object;

    this.horaFin.hour = timePicker.hour == 23 ? 0 : timePicker.hour + 1;
    this.horaFin.minute = timePicker.minute;
  }

  onTimeChangedFin(args) {
    let timePicker = <TimePicker>args.object;

    if(timePicker.hour < this.horaInicio.hour && timePicker.hour != 0){
      timePicker.hour = this.horaInicio.hour;
    }

    if(timePicker.hour == this.horaInicio.hour && (timePicker.minute - 5) < this.horaInicio.minute){
      timePicker.minute = this.horaInicio.minute + 5;
    }
  }

  choseCategory(){
    this._categoryService.getCategorys().subscribe(
      (ok) => {
        this.categorys = CategoryMapper.categoryJSONToCategory(ok);
        this.updateCategorysNames();
        this.modalChoseCategory.show();
      },
      (error) => {
        FeedBack.feedBackError("Error de conexión...");
        console.log("ERROR PMV -> ");
        console.log(error);
      }
    );
  }

  updateCategorysNames(){
    this.categorysNames = [];
    this.categorysNames.push("Categoria sin definir");
    this.categorys.forEach( cat => {this.categorysNames.push(cat.nombre)});
  }

  selectedIndexChanged(args){
    let picker = <ListPicker>args.object;
    this.selectedDay = picker.selectedIndex;
    this.searchPeriods();
  }

  irACalendar(){
    this._userService.getUser().subscribe(
      (ok) => {
        if(ok["user"] !== "null"){
          UserLoged.getInstance().setUserLoged(UserMapper.userJSONToUserData(ok['user'], ok['userTipoData']));
          this.content.height = 0;
          this.cabecera.height = 1000;
          this.logoItem.animate({
            translate: { x: 0, y: 300 },
            scale: { x: 1.8, y: 1.8},
            duration: 400
          }).then(() => {
            this.circleItem.translateY = 200;
            this.circleItem.animate({
              scale: { x: 15, y: 15 },
              duration: 400,
            }).then(() => {
              this.routerExtensions.navigateByUrl("calendar", { clearHistory: true });
              this.formSubmitted = false;
            });
          });
        }else{
          this.formSubmitted = false;
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      },
      (erro) => {
        console.log("ERROR PMV");
        console.log(erro);
      }
    );
  }

  onButtonTap(){
    this.formSubmitted = true;
    
    if(this.isLogin){
      this._userService.logUser(this.email, this.pass).subscribe(
        (ok) => {
          if(ok["token"] !== "null"){
            appSettings.setString("tokenUser", ok["token"]);
            this.navigating = true;
            this.irACalendar();
          }else{
            this.formSubmitted = false;
            FeedBack.feedBackError(ok["errorMesage"]);
          }
        },
        (error) => {
          FeedBack.feedBackError("Error de conexión...");
          console.log("ERROR PMV -> ");
          console.log(error);
        }
      );
    }else{
      if(this.tipoUsuario == TypeUser.Empresa){
        this.userEmpresa.passData(this.userData);
        this.userEmpresa.direccionFija = this.selectedIndex == 0;
      }else if(this.tipoUsuario == TypeUser.Normal){
        this.userNormal.passData(this.userData);
      }

      this._userService.registerUser(this.tipoUsuario == TypeUser.Empresa ? this.userEmpresa : this.userNormal).subscribe(
        (ok) =>{
          if(ok["idUser"] !== "null"){
            this.formSubmitted = false;
            this.modalVerificarCodigo.show();
          }else{
            this.formSubmitted = false;
            FeedBack.feedBackError(ok["errorMesage"]);
          }
        },
        (erro) => {
          console.log("ERROR PMV");
          console.log(erro);
        }
      );
    }
  }

  verificarCodigo(){
    this._userService.verificarCodigo(this.email, this.codigo).subscribe(
      (ok) => {
        if(<boolean>ok["code"] == true){
          this.modalVerificarCodigo.hide();
          FeedBack.feedBackSucces("Cuenta verificada Corectamente");
          this.setToLogin();
        }else{
          FeedBack.feedBackError(ok["errorMesage"]);
        }
      },
      (erro) => {
        console.log("ERROR PMV");
        console.log(erro);
      }
    );
  }

  categorySelected(){
    this.userEmpresa.category = this.categorys[this.selectedCategory - 1];
    this.modalChoseCategory.hide()
  }

  addCategory(){
    this._categoryService.addCategory(this.newCategory).subscribe(
      (ok) => {
        if(ok["categorys"] !== "null"){
          this.categorys = CategoryMapper.categoryJSONToCategory(ok);
          this.updateCategorysNames();
          this.modalNewCategory.hide();
          this.modalChoseCategory.show();
        }else{
          FeedBack.feedBackError(ok["errorMesage"]);
          this.modalNewCategory.show();
        }
      },
      (error) => {
        FeedBack.feedBackError("Error de conexión...");
        console.log("ERROR PMV -> ");
        console.log(error);
      }
    );
  }

  onDateChanged(args) {
    this.userNormal.fechaNacimiento = args.value;
    this.userNormal.fechaNacimiento.setHours(2);
  }

  onPickerLoaded(args) {
    let datePicker = <DatePicker>args.object;
    let now = new Date();

    datePicker.year = now.getFullYear() - 31;
    datePicker.month = 8;
    datePicker.day = 8;
    datePicker.minDate = new Date(now.getFullYear() - 100, 0, 0);
    datePicker.maxDate = new Date(now.getFullYear() - 6, 12, 31);
  }

  onFocus(args: TouchGestureEventData) {
    if (args.action == "down") {
      args.view.scaleX = 0.9;
      args.view.scaleY = 0.9;
    } else if (args.action == "up") {
      args.view.scaleX = 1;
      args.view.scaleY = 1 ;
    }
  }

  setToLogin() {
    this.content.animate({
      translate: { x: 0, y: 0 }, 
      duration: 150
    }).then(() => {
      this.isLogin = true;
      this.loginTxt = "L o g i n";
      this.logoItem.animate({
        scale: { x: 1, y: 1 },
        duration: 150
      }).then(() => {
        this.regsiterLayout.animate({
          scale: { x: 0, y: 0 },
          duration: 300
        }).then(() => {
            this.btnItem.animate({
                translate: { x: 0, y: 0 },
                duration: 200
            }).then(() => {
              this.loginLayout.animate({ scale: { x: 1, y: 1 }, duration: 200 })
          });
        });
      });
    });
  }

  setToRegister() {
    this.logoItem.animate({
      scale: { x: 0, y: 0 },
      duration: 150
    }).then(() => {
      this.regsiterLayout.animate({
        scale: { x: 1, y: 1 },
        duration: 150
      }).then(() => {
        this.content.animate({
          translate: {x: 0, y: -35},
          duration: 200
        });
        this.isLogin = false;
        this.loginTxt = "R e g i s t r a r";
      });
    });
  }
}
