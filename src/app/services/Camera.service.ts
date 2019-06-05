import { Injectable } from "@angular/core";
import * as camera from "nativescript-camera";
import { ImageSource} from 'tns-core-modules/image-source/image-source';
import * as imagepicker from "nativescript-imagepicker";

@Injectable()
export class CameraService{

    pickPhoto(options:camera.CameraOptions){
        return new Promise((resolve, reject) => {
            camera.requestPermissions().then(
                ()=> {        
                    camera.takePicture(options).then((imageAsset) => {
                        let source = new ImageSource(); 
                        source.fromAsset(imageAsset).then((source) => {
                            resolve( { "base64" : source.toBase64String("png",50),
                                     "image" : imageAsset});
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                    }, 
                    ()=> {
                        reject("no hay permisos");
                    }
            );
        });
    }

    selectGaleryPhoto(){
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        return new Promise((resolve) => {
            context.authorize().then(()=>{
                return context.present();
              }).then((selection) => {
                let imageAsset = selection[0];
                let source = new ImageSource(); 
                source.fromAsset(imageAsset).then((source) => { 
                    resolve( { "base64" : source.toBase64String("png",50),
                    "image" : imageAsset});
                });
                /*
                si seleccionara más de una aqui estarian todas se le tendria de pasar por parametro para poder seleccionar multiple
                selection.forEach((selected) => {
                  console.log(selected);
                });*/
              });
        });
    }
}