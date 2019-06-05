import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from './home-page/home-page.component';
import { HttpModule } from "@angular/http";
import { DropDownModule } from "nativescript-drop-down/angular";

import { NativeScriptCommonModule } from "nativescript-angular/common";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ModalComponent } from "./modal";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { SearchComponent } from './search/search.component';
import { RouteComponent } from './route/route.component';
import { DailyComponent } from './daily/daily.component';
import { SettingsComponent } from './settings/settings.component';
import { BtnAddEventComponent } from "./custom-components/bnt_add-event.component";
import { NewEventComponent } from './new-event/new-event.component';
import { NewEventEmpresaComponent } from './new-event-empresa/new-event-empresa.component';
import { UserInfoEmpresaComponent } from './user-info-empresa/user-info-empresa.component';
import { DailyInfoComponent } from './daily-info/daily-info.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        HttpModule,
        NativeScriptHttpClientModule,
        DropDownModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUICalendarModule
    ],
    declarations: [
        AppComponent,
        HomePageComponent,
        ModalComponent,
        CalendarPageComponent,
        SearchComponent,
        RouteComponent,
        DailyComponent,
        SettingsComponent,
        BtnAddEventComponent,
        NewEventComponent,
        NewEventEmpresaComponent,
        UserInfoEmpresaComponent,
        DailyInfoComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
