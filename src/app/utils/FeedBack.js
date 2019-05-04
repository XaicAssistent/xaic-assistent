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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZEJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGZWVkQmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUFpRDtBQUNqRCxnREFBK0M7QUFFL0M7SUFDSTtJQUNBLENBQUM7SUFFYSxzQkFBYSxHQUEzQixVQUE0QixPQUFjO1FBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksZ0NBQVEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDYixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLHVCQUFjLEdBQTVCLFVBQTZCLE9BQWM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxnQ0FBUSxFQUFFLENBQUM7UUFFOUIsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNiLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYSx3QkFBZSxHQUE3QixVQUE4QixPQUFjO1FBQ3hDLElBQUksUUFBUSxHQUFHLElBQUksZ0NBQVEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDZixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUM7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmVlZGJhY2sgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZlZWRiYWNrXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBGZWVkQmFja3tcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmZWVkQmFja0Vycm9yKG1lc3NhZ2U6c3RyaW5nKXtcbiAgICAgICAgdmFyIGZlZWRiYWNrID0gbmV3IEZlZWRiYWNrKCk7XG5cbiAgICAgICAgZmVlZGJhY2suZXJyb3Ioe1xuICAgICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICAgIHRpdGxlQ29sb3I6IG5ldyBDb2xvcihcImJsYWNrXCIpXG4gICAgICAgIH0pO1xuICAgIH0gIFxuXG4gICAgcHVibGljIHN0YXRpYyBmZWVkQmFja1N1Y2NlcyhtZXNzYWdlOnN0cmluZyl7XG4gICAgICAgIHZhciBmZWVkYmFjayA9IG5ldyBGZWVkYmFjaygpO1xuXG4gICAgICAgIGZlZWRiYWNrLnN1Y2Nlc3Moe1xuICAgICAgICAgICAgdGl0bGU6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSAgXG5cbiAgICBwdWJsaWMgc3RhdGljIGZlZWRCYWNrV2FybmluZyhtZXNzYWdlOnN0cmluZyl7XG4gICAgICAgIHZhciBmZWVkYmFjayA9IG5ldyBGZWVkYmFjaygpO1xuXG4gICAgICAgIGZlZWRiYWNrLndhcm5pbmcoe1xuICAgICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICAgIHRpdGxlQ29sb3I6IG5ldyBDb2xvcihcImJsYWNrXCIpXG4gICAgICAgIH0pO1xuICAgIH0gIFxufSJdfQ==