"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var Loading = /** @class */ (function () {
    function Loading() {
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
    }
    Loading.getInstance = function () {
        if (Loading.instance == null) {
            Loading.instance = new Loading();
        }
        return Loading.instance;
    };
    Loading.prototype.startLoader = function (message, indeterminate) {
        if (message === void 0) { message = "Loading..."; }
        if (indeterminate === void 0) { indeterminate = true; }
        var options = {
            message: message,
            indeterminate: indeterminate
        };
        this.loader.show(options);
    };
    Loading.prototype.stopLoader = function () {
        this.loader.hide();
    };
    return Loading;
}());
exports.Loading = Loading;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBZ0U7QUFFaEU7SUFXSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFUYSxtQkFBVyxHQUF6QjtRQUNJLElBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUM7WUFDeEIsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFNRCw2QkFBVyxHQUFYLFVBQVksT0FBMkIsRUFBRSxhQUEwQjtRQUF2RCx3QkFBQSxFQUFBLHNCQUEyQjtRQUFFLDhCQUFBLEVBQUEsb0JBQTBCO1FBQy9ELElBQUksT0FBTyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsYUFBYSxFQUFFLGFBQWE7U0FDN0IsQ0FBQztRQUVKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcblxuZXhwb3J0IGNsYXNzIExvYWRpbmd7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IExvYWRpbmc7XG4gICAgcHJpdmF0ZSBsb2FkZXI6IExvYWRpbmdJbmRpY2F0b3I7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCl7XG4gICAgICAgIGlmKExvYWRpbmcuaW5zdGFuY2UgPT0gbnVsbCl7XG4gICAgICAgICAgICBMb2FkaW5nLmluc3RhbmNlID0gbmV3IExvYWRpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTG9hZGluZy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcbiAgICB9XG5cbiAgICBzdGFydExvYWRlcihtZXNzYWdlOnN0cmluZz1cIkxvYWRpbmcuLi5cIiwgaW5kZXRlcm1pbmF0ZTpib29sZWFuPXRydWUpe1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICBpbmRldGVybWluYXRlOiBpbmRldGVybWluYXRlXG4gICAgICAgICAgfTtcbiAgICAgICAgICAgXG4gICAgICAgIHRoaXMubG9hZGVyLnNob3cob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc3RvcExvYWRlcigpe1xuICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XG4gICAgfVxufSJdfQ==