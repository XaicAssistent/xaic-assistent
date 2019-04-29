"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_feedback_1 = require("nativescript-feedback");
var color_1 = require("tns-core-modules/color");
var FeedBack = /** @class */ (function () {
    function FeedBack() {
    }
    FeedBack.feedBackError = function (message) {
        var feedback = new nativescript_feedback_1.Feedback();
        feedback.error({
            title: message,
            titleColor: new color_1.Color("black")
        });
    };
    FeedBack.feedBackSucces = function (message) {
        var feedback = new nativescript_feedback_1.Feedback();
        feedback.success({
            title: message
        });
    };
    FeedBack.feedBackWarning = function (message) {
        var feedback = new nativescript_feedback_1.Feedback();
        feedback.warning({
            title: message,
            titleColor: new color_1.Color("black")
        });
    };
    return FeedBack;
}());
exports.FeedBack = FeedBack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZEJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGZWVkQmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUFpRjtBQUNqRixnREFBK0M7QUFFL0M7SUFDSTtJQUNBLENBQUM7SUFFYSxzQkFBYSxHQUEzQixVQUE0QixPQUFjO1FBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksZ0NBQVEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDYixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLHVCQUFjLEdBQTVCLFVBQTZCLE9BQWM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxnQ0FBUSxFQUFFLENBQUM7UUFFOUIsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNiLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSx3QkFBZSxHQUE3QixVQUE4QixPQUFjO1FBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksZ0NBQVEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDZixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmVlZGJhY2ssIEZlZWRiYWNrVHlwZSwgRmVlZGJhY2tQb3NpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmVlZGJhY2tcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIjtcblxuZXhwb3J0IGNsYXNzIEZlZWRCYWNre1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZlZWRCYWNrRXJyb3IobWVzc2FnZTpzdHJpbmcpe1xuICAgICAgICB2YXIgZmVlZGJhY2sgPSBuZXcgRmVlZGJhY2soKTtcblxuICAgICAgICBmZWVkYmFjay5lcnJvcih7XG4gICAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgICAgdGl0bGVDb2xvcjogbmV3IENvbG9yKFwiYmxhY2tcIilcbiAgICAgICAgfSk7XG4gICAgfSAgXG5cbiAgICBwdWJsaWMgc3RhdGljIGZlZWRCYWNrU3VjY2VzKG1lc3NhZ2U6c3RyaW5nKXtcbiAgICAgICAgdmFyIGZlZWRiYWNrID0gbmV3IEZlZWRiYWNrKCk7XG5cbiAgICAgICAgZmVlZGJhY2suc3VjY2Vzcyh7XG4gICAgICAgICAgICB0aXRsZTogbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9ICBcblxuICAgIHB1YmxpYyBzdGF0aWMgZmVlZEJhY2tXYXJuaW5nKG1lc3NhZ2U6c3RyaW5nKXtcbiAgICAgICAgdmFyIGZlZWRiYWNrID0gbmV3IEZlZWRiYWNrKCk7XG5cbiAgICAgICAgZmVlZGJhY2sud2FybmluZyh7XG4gICAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgICAgdGl0bGVDb2xvcjogbmV3IENvbG9yKFwiYmxhY2tcIilcbiAgICAgICAgfSk7XG4gICAgfSAgXG59Il19