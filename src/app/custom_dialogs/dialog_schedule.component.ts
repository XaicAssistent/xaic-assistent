import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "modal-content",
    template: `
    <StackLayout>
    <StackLayout orientation="horizontal" class="border">
      <Label text="LU" class="days"></Label>
      <Label text="MA" class="days"></Label>
      <Label text="MI" class="days"></Label>
      <Label text="JU" class="days"></Label>
      <Label text="VI" class="days"></Label>
      <Label text="SA" class="days"></Label>
      <Label text="DO" class="days"></Label>
    </StackLayout>
        <Image class="add_schedule" src="https://cdn4.iconfinder.com/data/icons/material-design-content-icons/512/add-circle-512.png"></Image>
    </StackLayout>
    `,styles:[`
    .border{
        padding:10%;
    }
    .add_schedule {
        width: 20%;
        height: 20%;
        align:
    } 
    .days {
        text-align:center;
        height:5%;
        width:12%;
        font-size: 18px;
        border-radius: 25%;
        border-color:black;
        border-width: 2px;
    } ` ]
   
  
})

export class DialogContent {
    public prompt: string;
    constructor(private params: ModalDialogParams) {
        this.prompt = params.context.promptMsg;
    }

    public close(result: string) {
        this.params.closeCallback(result);
  }
}