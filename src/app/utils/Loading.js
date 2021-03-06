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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBZ0U7QUFFaEU7SUFXSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpREFBZ0IsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFUYSxtQkFBVyxHQUF6QjtRQUNJLElBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUM7WUFDeEIsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFNRCw2QkFBVyxHQUFYLFVBQVksT0FBMkIsRUFBRSxhQUEwQjtRQUF2RCx3QkFBQSxFQUFBLHNCQUEyQjtRQUFFLDhCQUFBLEVBQUEsb0JBQTBCO1FBQy9ELElBQUksT0FBTyxHQUFHO1lBQ1YsT0FBTyxFQUFFLE9BQU87WUFDaEIsYUFBYSxFQUFFLGFBQWE7U0FDN0IsQ0FBQztRQUVKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5ne1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IExvYWRpbmc7XHJcbiAgICBwcml2YXRlIGxvYWRlcjogTG9hZGluZ0luZGljYXRvcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCl7XHJcbiAgICAgICAgaWYoTG9hZGluZy5pbnN0YW5jZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgTG9hZGluZy5pbnN0YW5jZSA9IG5ldyBMb2FkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBMb2FkaW5nLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRMb2FkZXIobWVzc2FnZTpzdHJpbmc9XCJMb2FkaW5nLi4uXCIsIGluZGV0ZXJtaW5hdGU6Ym9vbGVhbj10cnVlKXtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogaW5kZXRlcm1pbmF0ZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BMb2FkZXIoKXtcclxuICAgICAgICB0aGlzLmxvYWRlci5oaWRlKCk7XHJcbiAgICB9XHJcbn0iXX0=