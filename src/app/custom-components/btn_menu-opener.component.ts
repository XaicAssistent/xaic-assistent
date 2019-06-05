import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "btn_menu-opener",
    template: `
    <StackLayout>
    <Label class="button fa" text="&#xe9bd;" (tap)="openDrawer()"></Label>
    </StackLayout>`,
    styles: [`
    .button{
        color: rgba(26, 158, 81, 1);
        font-size: 35;
        margin-left: 10;
        margin-top: 15;
    }
    `]
})

export class BtnMenuOpenerComponent {

    sideDrawer = <RadSideDrawer>app.getRootView()

    openDrawer(){
        this.sideDrawer.showDrawer();
    }

}