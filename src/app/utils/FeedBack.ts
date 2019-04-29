import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";

export class FeedBack{
    private constructor(){
    }

    public static feedBackError(message:string){
        var feedback = new Feedback();

        feedback.error({
          title: message,
          titleColor: new Color("black")
        });
    }  

    public static feedBackSucces(message:string){
        var feedback = new Feedback();

        feedback.success({
            title: message
        });
    }  

    public static feedBackWarning(message:string){
        var feedback = new Feedback();

        feedback.warning({
          title: message,
          titleColor: new Color("black")
        });
    }  
}