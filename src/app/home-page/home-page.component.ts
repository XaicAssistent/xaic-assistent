import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'ns-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  moduleId: module.id,
  providers: [UserService, CategoryService]
})
export class HomePageComponent implements OnInit {
  @ViewChild("register") angularRegister: ElementRef;
  @ViewChild("btn") btnRef: ElementRef;
  @ViewChild("circle") circleRef: ElementRef;
  @ViewChild("logo") logoRef: ElementRef;
  @ViewChild("login") angularLogin: ElementRef;
  @ViewChild("content") angularContent: ElementRef;
  @ViewChild("modalNewCategory") modalNewCategory: ModalComponent;
  @ViewChild("modalChoseCategory") modalChoseCategory: ModalComponent;

  loginLayout: View;
  regsiterLayout: View;
  btnItem: View;
  circleItem: View;
  logoItem: View;
  content: View;

  isLogin = true;
  formSubmitted = false;
  navigating = false;
  loginTxt = "L o g i n";

  tipoUsuario: TypeUser;

  userData: UserData = new UserData();

  enumTipoUsuario = TypeUser;

  selectedIndex = 0;
  selectedCategory = 0;
  items: Array<string> = ["Si", "No"];
  categorysNames: Array<string> = [];
  categorys: Category[] = [];

  email = "";
  pass = "";

  newCategory: Category = new Category();

  constructor(private _page: Page, private _userService: UserService, private _categoryService: CategoryService,private routerExtensions: RouterExtensions) {
  }

  ngOnInit(): void {
    this._page.on('navigatingTo', (data) => {
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        this.navigating = false;
        this.logoItem.translateY = 0;
    })
    this.btnItem = this.btnRef.nativeElement;
    this.loginLayout = this.angularLogin.nativeElement;
    this.regsiterLayout = this.angularRegister.nativeElement;
    this.circleItem = this.circleRef.nativeElement;
    this.logoItem = this.logoRef.nativeElement;
    this.content = this.angularContent.nativeElement;

    this.regsiterLayout.scaleY = 0;
    this.regsiterLayout.scaleX = 0;
    this.circleItem.scaleX = 0;
    this.circleItem.scaleY = 0;
  }
  
  choseTypeUser(){
    dialogs.action({
      message: "Tipo de usuario",
      actions: Object.keys(TypeUser)
    }).then(result => {
      this.tipoUsuario = TypeUser[result];
     });
  }

  choseCategory(modal : ModalComponent){
    this._categoryService.getCategorys().subscribe(
      (ok) => {
        this.categorysNames = [];
        this.categorys = [];
        this.categorysNames.push("Categoria sin definir");
        ok["categorys"].forEach((cat) => {
          let category: Category = new Category();
          category.idCategory = cat.IdCategory;
          category.nombre = cat.Nombre;
          this.categorys.push(category);
          this.categorysNames.push(category.nombre);
        });
        this.modalChoseCategory.show();
      },
      (error) => {
        FeedBack.feedBackError("Error de conexión...");
        console.log("ERROR PMV -> ");
        console.log(error);
      }
    );
  }

  selectedNewCategory(){
    console.log(this.categorys[this.selectedCategory - 1]);
  }

  closeModal(modal : ModalComponent) {
    modal.hide;
  }

  onButtonTap(){
    this.formSubmitted = true;
    
    if(this.isLogin){
      this._userService.logUser(this.email, this.pass).subscribe(
        (ok) => {

          if(ok["token"] !== "null"){
            //afegir al app settings
            this.navigating = true;
  
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
                this.routerExtensions.navigateByUrl("register", { clearHistory: true });
                this.formSubmitted = false;
              });
            });
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
      console.log("register");
    }
  }

  addCategory(){
    this._categoryService.addCategory(this.newCategory).subscribe(
      (ok) => {
        console.log(ok);
      },
      (error) => {
        FeedBack.feedBackError("Error de conexión...");
        console.log("ERROR PMV -> ");
        console.log(error);
      }
    );
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
