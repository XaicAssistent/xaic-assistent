import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { View, Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { UserService } from '../services/UserService';
import { FeedBack } from '../utils/FeedBack';

@Component({
  selector: 'ns-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  moduleId: module.id,
  providers: [UserService]
})
export class HomePageComponent implements OnInit {
  @ViewChild("register") angularRegister: ElementRef;
  @ViewChild("btn") btnRef: ElementRef;
  @ViewChild("circle") circleRef: ElementRef;
  @ViewChild("logo") logoRef: ElementRef;
  @ViewChild("login") angularLogin: ElementRef;
  @ViewChild("content") angularContent: ElementRef;
  
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

  email = "";
  pass = "";

  constructor(private _page: Page, private _userService: UserService,private routerExtensions: RouterExtensions) {
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
    this.btnItem.translateY = -280;
  }
  
  onButtonTap(): void {
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

  onFocus(args: TouchGestureEventData) {
    if (args.action == "down") {
        this.btnItem.scaleX = 0.9;
        this.btnItem.scaleY = 0.9;
    } else if (args.action == "up") {
        this.btnItem.scaleX = 1;
        this.btnItem.scaleY = 1;
    }
  }

  setToLogin() {
    this.content.animate({
      translate: { x: 0, y: 0 }, 
      duration: 150
    }).then(() => {
      this.logoItem.animate({
        scale: { x: 1, y: 1 },
        duration: 100
      }).then(() => {
        this.regsiterLayout.animate({
          scale: { x: 0, y: 0 },
          duration: 300
        }).then(() => {
            this.isLogin = true;
            this.loginTxt = "L o g i n";
            this.btnItem.animate({
                translate: { x: 0, y: -280 },
                duration: 200
            }).then(() => {
              this.loginLayout.animate({ scale: { x: 1, y: 1 }, duration: 200 })
          });
        });
      });
    });
  }

  setToRegister() {
    this.isLogin = false;
    this.loginTxt = "R e g i s t r a r";

    this.logoItem.animate({
      scale: { x: 0, y: 0 },
      duration: 150
    }).then(() => {
      this.content.animate({
        translate: { x: 0, y: -160 }, 
        duration: 100
      }).then(() => {
        this.btnItem.animate({
          translate: { x: 0, y: 0 },
          duration: 200
        }).then(() => {
            this.regsiterLayout.animate({
              scale: { x: 1.3, y: 1.3 },
              duration: 200
            }).then(() => {
              this.regsiterLayout.animate({ scale: { x: 1, y: 1 }, translate: { x: 0, y: -100 }, duration: 200 })
            });
        });
      });
    });
  }
}
