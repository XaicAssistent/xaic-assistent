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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZEJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGZWVkQmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUFpRjtBQUNqRixnREFBK0M7QUFFL0M7SUFDSTtJQUNBLENBQUM7SUFFYSxzQkFBYSxHQUEzQixVQUE0QixPQUFjO1FBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksZ0NBQVEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDYixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLHVCQUFjLEdBQTVCLFVBQTZCLE9BQWM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxnQ0FBUSxFQUFFLENBQUM7UUFFOUIsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNiLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSx3QkFBZSxHQUE3QixVQUE4QixPQUFjO1FBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksZ0NBQVEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDZixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmVlZGJhY2ssIEZlZWRiYWNrVHlwZSwgRmVlZGJhY2tQb3NpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmVlZGJhY2tcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZlZWRCYWNre1xyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmVlZEJhY2tFcnJvcihtZXNzYWdlOnN0cmluZyl7XHJcbiAgICAgICAgdmFyIGZlZWRiYWNrID0gbmV3IEZlZWRiYWNrKCk7XHJcblxyXG4gICAgICAgIGZlZWRiYWNrLmVycm9yKHtcclxuICAgICAgICAgIHRpdGxlOiBtZXNzYWdlLFxyXG4gICAgICAgICAgdGl0bGVDb2xvcjogbmV3IENvbG9yKFwiYmxhY2tcIilcclxuICAgICAgICB9KTtcclxuICAgIH0gIFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmVlZEJhY2tTdWNjZXMobWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgICAgIHZhciBmZWVkYmFjayA9IG5ldyBGZWVkYmFjaygpO1xyXG5cclxuICAgICAgICBmZWVkYmFjay5zdWNjZXNzKHtcclxuICAgICAgICAgICAgdGl0bGU6IG1lc3NhZ2VcclxuICAgICAgICB9KTtcclxuICAgIH0gIFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmVlZEJhY2tXYXJuaW5nKG1lc3NhZ2U6c3RyaW5nKXtcclxuICAgICAgICB2YXIgZmVlZGJhY2sgPSBuZXcgRmVlZGJhY2soKTtcclxuXHJcbiAgICAgICAgZmVlZGJhY2sud2FybmluZyh7XHJcbiAgICAgICAgICB0aXRsZTogbWVzc2FnZSxcclxuICAgICAgICAgIHRpdGxlQ29sb3I6IG5ldyBDb2xvcihcImJsYWNrXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ICBcclxufSJdfQ==