import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomePageComponent } from "./home-page/home-page.component";
import { CalendarPageComponent } from "./calendar-page/calendar-page.component";
import { SearchComponent } from "./search/search.component";
import { RouteComponent } from "./route/route.component";
import { DailyComponent } from "./daily/daily.component";
import { SettingsComponent } from "./settings/settings.component";
import { NewEventComponent } from "./new-event/new-event.component";
import { NewEventEmpresaComponent } from "./new-event-empresa/new-event-empresa.component";
import { UserInfoEmpresaComponent } from "./user-info-empresa/user-info-empresa.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomePageComponent},
    { path: "calendar", component: CalendarPageComponent },
    { path: "search", component: SearchComponent },
    { path: "route", component: RouteComponent },
    { path: "daily", component: DailyComponent },
    { path: "settings", component: SettingsComponent },
    { path: "newEvent", component: NewEventComponent },
    { path: "newEventEmpresa/:id", component: NewEventEmpresaComponent },
    { path: "user-info-empresa", component: UserInfoEmpresaComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
