import { Component,Output,EventEmitter } from "@angular/core";

declare const android;

@Component({
    selector: "btn_add-event",
    template: `
    <GridLayout class="float-btn-wrapper">
    <StackLayout class="float-btn-shadow" (loaded)="onLoaded($event)">
    <StackLayout class="float-btn" (tap)="btnClicado()">
        <Label class="float-btn-text" text="+"></Label>
    </StackLayout>
    </StackLayout>
    </GridLayout>`,
    styles: [`

    .float-btn-wrapper{
        width: 75;
        height: 75;
        
    }

    .float-btn-shadow {
        width: 56;
        height: 56;
    }

    .float-btn {
        background-color: #1a9e51;
        width: 56;
        border-radius: 28;
        height: 56;
        text-align: center;
        vertical-align: middle; 
      
    }
    .float-btn-text {
        color: #ffffff;
        font-size: 36;
    }
    `]
})

export class BtnAddEventComponent {

@Output() click: EventEmitter<any> = new EventEmitter<any>();

btnClicado(){
    this.click.emit();
}

onLoaded(args){
    let tnsView = <any>args.object;

    if (tnsView.android) {
        let nativeAnView = tnsView.android;
        var shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
        shape.setColor(android.graphics.Color.parseColor("#30bcff"));
        nativeAnView.setBackgroundDrawable(shape);
        nativeAnView.setElevation(15);
    } 
}

}