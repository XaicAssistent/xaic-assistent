import {LoadingIndicator} from "nativescript-loading-indicator";

export class Loading{
    private static instance: Loading;
    private loader: LoadingIndicator;

    public static getInstance(){
        if(Loading.instance == null){
            Loading.instance = new Loading();
        }
        return Loading.instance;
    }

    private constructor(){
        this.loader = new LoadingIndicator();
    }

    startLoader(message:string="Loading...", indeterminate:boolean=true){
        var options = {
            message: message,
            indeterminate: indeterminate
          };
           
        this.loader.show(options);
    }

    stopLoader(){
        this.loader.hide();
    }
}