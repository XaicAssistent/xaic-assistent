import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

export enum DaysEnum {
    Lunes,
    Martes,
    Miercoles,
    Jueves,
    Viernes,
    Sabado,
    Domingo
}

@Component({
    selector: "modal-content",
    template: `
    <StackLayout>
    <StackLayout orientation="horizontal" class="border">
      <Button *ngFor="let day of values"  text="DaysEnum.day" class="days"></Button>
    </StackLayout>
        <Image class="add_schedule" src="https://cdn4.iconfinder.com/data/icons/material-design-content-icons/512/add-circle-512.png"></Image>
    </StackLayout>
    `, styles: [`
    .border{
        padding:10%;
    }
    .add_schedule {
        width: 20%;
        height: 20%;
    } 
    .days {
        height:6%;
        width:15%;
        font-size: 15px;
        border-radius: 25%;
        border-color:black;
        border-width: 2px;
    } ` ]


})

export class DialogContent implements OnInit {
    values = Object.keys(DaysEnum);

    ngOnInit(): void {
        
        console.log(this.values);
     
    }
    public prompt: string;
    constructor(private params: ModalDialogParams) {
        this.prompt = params.context.promptMsg;
    }

    public close(result: string) {
        this.params.closeCallback(result);
    }
}