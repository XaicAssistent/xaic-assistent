import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Popup,PopupOptions } from 'nativescript-popup';
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as camera from "nativescript-camera";
import { ImageSource, fromBase64 } from "tns-core-modules/image-source/image-source";
import { DialogContent } from '../custom_dialogs/dialog_schedule.component';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  moduleId: module.id,
})
export class RegisterComponent implements OnInit {

  constructor(private modalDialogService:ModalDialogService, private viewContainerRef:ViewContainerRef) { }

  ngOnInit() {
    
  }

imagen;
base64;

  openPopup(){
    dialogs.action({
      title: "Your title",
      cancelButtonText: "Cancel text",
      actions: ["USUARIO CLIENTE","EMPRESA"]
      
  }).then(result => {
      // result argument is boolean
      console.log("Dialog result: " + result);
  });
  }

  addSchedule(){
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef
    };
    this.modalDialogService.showModal(DialogContent,options);
  }

  openCamera(){
    camera.requestPermissions();
    let options: camera.CameraOptions = {
        width: 200,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: true,
        cameraFacing: "rear"
    };
    camera.takePicture(options).then((imageAsset) => {
        this.imagen = imageAsset;
        let source = new ImageSource();
        source.fromAsset(imageAsset).then((source) => {
            const base64image = source.toBase64String("png", 60);
            this.base64 = base64image;
        });
    }).catch((err) => {
        console.log(err);
    });
    () => {
        console.log("no camera permission");
    }
  }

}
