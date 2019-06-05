"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var home_page_component_1 = require("./home-page/home-page.component");
var http_1 = require("@angular/http");
var angular_1 = require("nativescript-drop-down/angular");
var common_1 = require("nativescript-angular/common");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
// Uncomment and add to NgModule imports if you need to use two-way binding
var forms_1 = require("nativescript-angular/forms");
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
var http_client_1 = require("nativescript-angular/http-client");
var modal_1 = require("./modal");
var angular_2 = require("nativescript-ui-sidedrawer/angular");
var calendar_page_component_1 = require("./calendar-page/calendar-page.component");
var angular_3 = require("nativescript-ui-calendar/angular");
var search_component_1 = require("./search/search.component");
var route_component_1 = require("./route/route.component");
var daily_component_1 = require("./daily/daily.component");
var settings_component_1 = require("./settings/settings.component");
var bnt_add_event_component_1 = require("./custom-components/bnt_add-event.component");
var new_event_component_1 = require("./new-event/new-event.component");
var new_event_empresa_component_1 = require("./new-event-empresa/new-event-empresa.component");
var user_info_empresa_component_1 = require("./user-info-empresa/user-info-empresa.component");
var btn_menu_opener_component_1 = require("./custom-components/btn_menu-opener.component");
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.NativeScriptFormsModule,
                http_1.HttpModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.DropDownModule,
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                angular_2.NativeScriptUISideDrawerModule,
                angular_3.NativeScriptUICalendarModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_page_component_1.HomePageComponent,
                modal_1.ModalComponent,
                calendar_page_component_1.CalendarPageComponent,
                search_component_1.SearchComponent,
                route_component_1.RouteComponent,
                daily_component_1.DailyComponent,
                settings_component_1.SettingsComponent,
                bnt_add_event_component_1.BtnAddEventComponent,
                new_event_component_1.NewEventComponent,
                new_event_empresa_component_1.NewEventEmpresaComponent,
                user_info_empresa_component_1.UserInfoEmpresaComponent,
                btn_menu_opener_component_1.BtnMenuOpenerComponent
            ],
            providers: [],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFDL0MsdUVBQW9FO0FBQ3BFLHNDQUEyQztBQUMzQywwREFBZ0U7QUFFaEUsc0RBQXVFO0FBRXZFLDBFQUF3RTtBQUN4RSxrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFFM0UsMkVBQTJFO0FBQzNFLG9EQUFxRTtBQUVyRSxrRkFBa0Y7QUFDbEYsZ0VBQWdGO0FBQ2hGLGlDQUF5QztBQUN6Qyw4REFBa0Y7QUFDbEYsbUZBQWdGO0FBQ2hGLDREQUFnRjtBQUNoRiw4REFBNEQ7QUFDNUQsMkRBQXlEO0FBQ3pELDJEQUF5RDtBQUN6RCxvRUFBa0U7QUFDbEUsdUZBQW1GO0FBQ25GLHVFQUFvRTtBQUNwRSwrRkFBMkY7QUFDM0YsK0ZBQTJGO0FBQzNGLDJGQUF1RjtBQXlDdkY7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBdkNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsK0JBQXVCO2dCQUN2QixpQkFBVTtnQkFDViwwQ0FBNEI7Z0JBQzVCLHdCQUFjO2dCQUNkLGlDQUF3QjtnQkFDeEIsK0JBQXVCO2dCQUN2Qix3Q0FBOEI7Z0JBQzlCLHNDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWix1Q0FBaUI7Z0JBQ2pCLHNCQUFjO2dCQUNkLCtDQUFxQjtnQkFDckIsa0NBQWU7Z0JBQ2YsZ0NBQWM7Z0JBQ2QsZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4Q0FBb0I7Z0JBQ3BCLHVDQUFpQjtnQkFDakIsc0RBQXdCO2dCQUN4QixzREFBd0I7Z0JBQ3hCLGtEQUFzQjthQUN6QjtZQUNELFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5cbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhvbWVQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLXBhZ2UvaG9tZS1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5yZWdpc3RlckVsZW1lbnQoXCJNYXBib3hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIikuTWFwYm94Vmlldyk7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgaWYgeW91IG5lZWQgdG8gdXNlIHR3by13YXkgYmluZGluZ1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuLy8gVW5jb21tZW50IGFuZCBhZGQgdG8gTmdNb2R1bGUgaW1wb3J0cyBpZiB5b3UgbmVlZCB0byB1c2UgdGhlIEh0dHBDbGllbnQgd3JhcHBlclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbFwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBDYWxlbmRhclBhZ2VDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXBhZ2UvY2FsZW5kYXItcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlDYWxlbmRhck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktY2FsZW5kYXIvYW5ndWxhclwiO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudCB9IGZyb20gJy4vcm91dGUvcm91dGUuY29tcG9uZW50JztcbmltcG9ydCB7IERhaWx5Q29tcG9uZW50IH0gZnJvbSAnLi9kYWlseS9kYWlseS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdG5BZGRFdmVudENvbXBvbmVudCB9IGZyb20gXCIuL2N1c3RvbS1jb21wb25lbnRzL2JudF9hZGQtZXZlbnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOZXdFdmVudENvbXBvbmVudCB9IGZyb20gJy4vbmV3LWV2ZW50L25ldy1ldmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmV3RXZlbnRFbXByZXNhQ29tcG9uZW50IH0gZnJvbSAnLi9uZXctZXZlbnQtZW1wcmVzYS9uZXctZXZlbnQtZW1wcmVzYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlckluZm9FbXByZXNhQ29tcG9uZW50IH0gZnJvbSAnLi91c2VyLWluZm8tZW1wcmVzYS91c2VyLWluZm8tZW1wcmVzYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnRuTWVudU9wZW5lckNvbXBvbmVudCB9IGZyb20gXCIuL2N1c3RvbS1jb21wb25lbnRzL2J0bl9tZW51LW9wZW5lci5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIEh0dHBNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIERyb3BEb3duTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQ2FsZW5kYXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIEhvbWVQYWdlQ29tcG9uZW50LFxuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICAgICAgQ2FsZW5kYXJQYWdlQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgICAgIFJvdXRlQ29tcG9uZW50LFxuICAgICAgICBEYWlseUNvbXBvbmVudCxcbiAgICAgICAgU2V0dGluZ3NDb21wb25lbnQsXG4gICAgICAgIEJ0bkFkZEV2ZW50Q29tcG9uZW50LFxuICAgICAgICBOZXdFdmVudENvbXBvbmVudCxcbiAgICAgICAgTmV3RXZlbnRFbXByZXNhQ29tcG9uZW50LFxuICAgICAgICBVc2VySW5mb0VtcHJlc2FDb21wb25lbnQsXG4gICAgICAgIEJ0bk1lbnVPcGVuZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW10sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==