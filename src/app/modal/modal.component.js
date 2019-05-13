"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform");
var enums_1 = require("tns-core-modules/ui/enums");
var gestures_1 = require("tns-core-modules/ui/gestures");
var page_1 = require("tns-core-modules/ui/page");
var application_1 = require("tns-core-modules/application");
// No support for Array#includes here
function includes(container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
        returnValue = true;
    }
    return returnValue;
}
var GestureRecognizer, Interop;
if (application_1.ios) {
    GestureRecognizer = NSObject;
    Interop = interop;
}
else {
    GestureRecognizer = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    Interop = { types: { id: void 0, void: void 0 } };
}
var HideGestureRecognizerImpl = /** @class */ (function (_super) {
    __extends(HideGestureRecognizerImpl, _super);
    function HideGestureRecognizerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HideGestureRecognizerImpl.initWithOwner = function (owner) {
        var handler = new HideGestureRecognizerImpl();
        handler._owner = owner;
        return handler;
    };
    HideGestureRecognizerImpl.prototype.tap = function () {
        this._owner.ios.resignFirstResponder();
        if (this.func) {
            this.func();
        }
    };
    HideGestureRecognizerImpl.ObjCExposedMethods = {
        "tap": { returns: Interop.types.void, params: [Interop.types.id] }
    };
    return HideGestureRecognizerImpl;
}(GestureRecognizer));
// Keep external state of views
var targetHandler = null;
var targetHandler2 = null;
var ModalComponent = /** @class */ (function () {
    function ModalComponent(hostEl, page) {
        var _this = this;
        this.hostEl = hostEl;
        this.page = page;
        this.isShowing = false;
        this.durationScale = .75;
        this.data = null; // Optional data parameter
        this.size = "sm"; // sm | md | lg
        this.dismissable = true;
        this.alignment = "center"; // center | stretch | middle | top | bottom
        this.duration = 250; // in milliseconds
        this.open = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.onTapHide = function () {
            if (platform_1.isAndroid && _this.dismissable) {
                _this.hide();
            }
        };
        if (platform_1.isAndroid) {
            this.page.on(page_1.Page.loadedEvent, function () {
                application_1.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (args) {
                    if (_this.isShowing) {
                        args.cancel = true;
                        _this.hide();
                    }
                });
            });
            this.page.on(page_1.Page.unloadedEvent, function () {
                application_1.android.off(application_1.AndroidApplication.activityBackPressedEvent);
            });
        }
    }
    ModalComponent.prototype.ngOnInit = function () {
        this.pageHeight = this.pageHeight ? this.pageHeight : platform_1.screen.mainScreen.heightDIPs;
        this.hostView.style.translateY = this.pageHeight;
    };
    ModalComponent.prototype.show = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (!this.overlayView) {
            return;
        }
        this.hostView.style.translateY = 0;
        return this.overlayView.animate({
            translate: { x: 0, y: 0 }, duration: 0,
        }).then(function () { return _this.overlayView.animate({
            opacity: 1, duration: _this.timing * _this.durationScale,
        }); }).then(function () { return _this.bodyView.animate({
            translate: { x: 0, y: 0 },
            duration: 0,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () { return _this.bodyView.animate({
            scale: { x: 1, y: 1 },
            opacity: 1,
            duration: _this.timing,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () {
            _this.open.emit(_this.data = data);
            _this.isShowing = true;
        }).catch(function () { return 0; });
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        return this.bodyView.animate({
            opacity: 0,
            duration: this.timing * this.durationScale,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }).then(function () { return _this.bodyView.animate({
            scale: { x: .6, y: .6 },
            translate: { x: 0, y: _this.pageHeight },
            duration: 0,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () { return _this.overlayView.animate({
            opacity: 0, duration: _this.timing * _this.durationScale,
            curve: enums_1.AnimationCurve.easeInOut,
        }); }).then(function () { return _this.overlayView.animate({
            translate: { x: 0, y: _this.pageHeight },
            duration: 0,
            curve: enums_1.AnimationCurve.easeInOut,
        }); }).then(function (data) {
            _this.hostView.style.translateY = _this.pageHeight;
            _this.close.emit(_this.data);
            _this.isShowing = false;
            return Promise.resolve(_this.data);
        }).catch(function () { return 0; });
    };
    ModalComponent.prototype.onLoad = function (_a) {
        var _this = this;
        var object = _a.object;
        this.overlayView = object;
        this.contentView.off([gestures_1.GestureTypes.touch, gestures_1.GestureTypes.tap].join(","));
        // Event Propagation
        if (application_1.ios) {
            targetHandler = HideGestureRecognizerImpl.initWithOwner(this.overlayView);
            if (this.dismissable) {
                targetHandler.func = function () { return _this.hide(); };
            }
            var gesture = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler, "tap");
            this.overlayView.ios.addGestureRecognizer(gesture);
            targetHandler2 = HideGestureRecognizerImpl.initWithOwner(this.bodyView);
            var gesture2 = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler2, "tap");
            gesture2.cancelsTouchesInView = true;
            this.bodyView.ios.addGestureRecognizer(gesture2);
        }
    };
    Object.defineProperty(ModalComponent.prototype, "timing", {
        get: function () {
            return +this.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "translateY", {
        get: function () {
            return this.pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "hostView", {
        get: function () {
            return this.hostEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "bodyView", {
        get: function () {
            return this.bodyEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "contentView", {
        get: function () {
            return this.contentEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "modalWidth", {
        get: function () {
            switch (this.size) {
                case "sm": return "65%";
                case "lg": return "98%";
                case "md":
                default: return "85%";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "modalHeight", {
        get: function () {
            switch (this.size) {
                case "sm": return "50%";
                case "lg": return "98%";
                case "md":
                default: return "65%";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "vAlignment", {
        get: function () {
            if (includes(["center", "stretch", "middle", "top", "bottom"], this.alignment)) {
                return this.alignment;
            }
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "dismissable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "alignment", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ModalComponent.prototype, "duration", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "open", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "close", void 0);
    __decorate([
        core_1.ViewChild("bodyEl"),
        __metadata("design:type", core_1.ElementRef)
    ], ModalComponent.prototype, "bodyEl", void 0);
    __decorate([
        core_1.ViewChild("contentEl"),
        __metadata("design:type", core_1.ElementRef)
    ], ModalComponent.prototype, "contentEl", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: "modal, [modal]",
            template: "\n\t\t<GridLayout (loaded)=\"onLoad($event)\" (tap)=\"onTapHide()\" [translateY]=\"translateY\" opacity=\"0\" class=\"overlay\">\n\t\t\t<GridLayout #bodyEl [verticalAlignment]=\"vAlignment\" [width]=\"modalWidth\" [height]=\"modalHeight\" [translateY]=\"translateY\" scaleY=\".6\" scaleX=\".6\" opacity=\"0\"\n\t\t\tclass=\"overlay-body\">\n\t\t\t\t<StackLayout #contentEl class=\"overlay-content\">\n\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t</StackLayout>\n\t\t\t</GridLayout>\n\t\t</GridLayout>\n\t",
            styles: ["\n\t\t.overlay {\n\t\t\tbackground-color: rgba(0, 0, 0, 0.8);\n\t\t\tz-index: 999999;\n\t\t}\n\t\t.overlay .overlay-body { }\n\t\t.overlay .overlay-body .overlay-content {\n\t\t\tvertical-align: center;\n\t\t}\n\t\t.overlay .overlay-body >>> .close {\n\t\t\tcolor: red;\n\t\t\tfont-size: 16;\n\t\t}\n\t"]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            page_1.Page])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNHO0FBRXRHLHNEQUE4RDtBQUM5RCxtREFBMkQ7QUFDM0QseURBQTREO0FBQzVELGlEQUFnRDtBQUNoRCw0REFBcUg7QUFJckgscUNBQXFDO0FBQ3JDLFNBQVMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLO0lBQzlCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtRQUNWLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDdEI7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRUQsSUFBSSxpQkFBaUIsRUFBRSxPQUFPLENBQUM7QUFDL0IsSUFBSSxpQkFBRyxFQUFFO0lBQ0wsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDckI7S0FBTTtJQUNILGlCQUFpQjtRQUFHO1FBQVUsQ0FBQztRQUFELFFBQUM7SUFBRCxDQUFDLEFBQVgsR0FBVyxDQUFDO0lBQ2hDLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQ3JEO0FBRUQ7SUFBd0MsNkNBQWlCO0lBQXpEOztJQW1CQSxDQUFDO0lBaEJVLHVDQUFhLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsSUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCx1Q0FBRyxHQUFIO1FBQ0ks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bXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBzY3JlZW4sIGlzQW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IGFuZHJvaWQsIEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5cbmRlY2xhcmUgY29uc3QgVUlUYXBHZXN0dXJlUmVjb2duaXplciwgaW50ZXJvcCwgTlNPYmplY3Q7XG5cbi8vIE5vIHN1cHBvcnQgZm9yIEFycmF5I2luY2x1ZGVzIGhlcmVcbmZ1bmN0aW9uIGluY2x1ZGVzKGNvbnRhaW5lciwgdmFsdWUpIHtcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB2YXIgcG9zID0gY29udGFpbmVyLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxubGV0IEdlc3R1cmVSZWNvZ25pemVyLCBJbnRlcm9wO1xuaWYgKGlvcykge1xuICAgIEdlc3R1cmVSZWNvZ25pemVyID0gTlNPYmplY3Q7XG4gICAgSW50ZXJvcCA9IGludGVyb3A7XG59IGVsc2Uge1xuICAgIEdlc3R1cmVSZWNvZ25pemVyID0gY2xhc3MgQSB7IH07XG4gICAgSW50ZXJvcCA9IHsgdHlwZXM6IHsgaWQ6IHZvaWQgMCwgdm9pZDogdm9pZCAwIH0gfTtcbn1cblxuY2xhc3MgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCBleHRlbmRzIEdlc3R1cmVSZWNvZ25pemVyIHtcbiAgICBwdWJsaWMgZnVuYzogKCkgPT4gdm9pZDtcblxuICAgIHN0YXRpYyBpbml0V2l0aE93bmVyKG93bmVyKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCgpO1xuICAgICAgICBoYW5kbGVyLl9vd25lciA9IG93bmVyO1xuICAgICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG5cbiAgICB0YXAoKSB7XG4gICAgICAgIHRoaXMuX293bmVyLmlvcy5yZXNpZ25GaXJzdFJlc3BvbmRlcigpO1xuICAgICAgICBpZiAodGhpcy5mdW5jKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bmMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBPYmpDRXhwb3NlZE1ldGhvZHMgPSB7XG4gICAgICAgIFwidGFwXCI6IHsgcmV0dXJuczogSW50ZXJvcC50eXBlcy52b2lkLCBwYXJhbXM6IFtJbnRlcm9wLnR5cGVzLmlkXSB9XG4gICAgfTtcbn1cblxuLy8gS2VlcCBleHRlcm5hbCBzdGF0ZSBvZiB2aWV3c1xubGV0IHRhcmdldEhhbmRsZXIgPSBudWxsO1xubGV0IHRhcmdldEhhbmRsZXIyID0gbnVsbDtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJtb2RhbCwgW21vZGFsXVwiLFxuICAgIHRlbXBsYXRlOiBgXG5cdFx0PEdyaWRMYXlvdXQgKGxvYWRlZCk9XCJvbkxvYWQoJGV2ZW50KVwiICh0YXApPVwib25UYXBIaWRlKClcIiBbdHJhbnNsYXRlWV09XCJ0cmFuc2xhdGVZXCIgb3BhY2l0eT1cIjBcIiBjbGFzcz1cIm92ZXJsYXlcIj5cblx0XHRcdDxHcmlkTGF5b3V0ICNib2R5RWwgW3ZlcnRpY2FsQWxpZ25tZW50XT1cInZBbGlnbm1lbnRcIiBbd2lkdGhdPVwibW9kYWxXaWR0aFwiIFtoZWlnaHRdPVwibW9kYWxIZWlnaHRcIiBbdHJhbnNsYXRlWV09XCJ0cmFuc2xhdGVZXCIgc2NhbGVZPVwiLjZcIiBzY2FsZVg9XCIuNlwiIG9wYWNpdHk9XCIwXCJcblx0XHRcdGNsYXNzPVwib3ZlcmxheS1ib2R5XCI+XG5cdFx0XHRcdDxTdGFja0xheW91dCAjY29udGVudEVsIGNsYXNzPVwib3ZlcmxheS1jb250ZW50XCI+XG5cdFx0XHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXHRcdFx0XHQ8L1N0YWNrTGF5b3V0PlxuXHRcdFx0PC9HcmlkTGF5b3V0PlxuXHRcdDwvR3JpZExheW91dD5cblx0YCxcbiAgICBzdHlsZXM6IFtgXG5cdFx0Lm92ZXJsYXkge1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuXHRcdFx0ei1pbmRleDogOTk5OTk5O1xuXHRcdH1cblx0XHQub3ZlcmxheSAub3ZlcmxheS1ib2R5IHsgfVxuXHRcdC5vdmVybGF5IC5vdmVybGF5LWJvZHkgLm92ZXJsYXktY29udGVudCB7XG5cdFx0XHR2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xuXHRcdH1cblx0XHQub3ZlcmxheSAub3ZlcmxheS1ib2R5ID4+PiAuY2xvc2Uge1xuXHRcdFx0Y29sb3I6IHJlZDtcblx0XHRcdGZvbnQtc2l6ZTogMTY7XG5cdFx0fVxuXHRgXVxufSlcblxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIGlzU2hvd2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcGFnZUhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgZHVyYXRpb25TY2FsZTogbnVtYmVyID0gLjc1O1xuICAgIHByaXZhdGUgb3ZlcmxheVZpZXc6IFZpZXc7XG4gICAgcHJpdmF0ZSBkYXRhOiBhbnkgPSBudWxsOyAvLyBPcHRpb25hbCBkYXRhIHBhcmFtZXRlclxuICAgIEBJbnB1dCgpIHByaXZhdGUgc2l6ZTogc3RyaW5nID0gXCJzbVwiOyAvLyBzbSB8IG1kIHwgbGdcbiAgICBASW5wdXQoKSBwcml2YXRlIGRpc21pc3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwcml2YXRlIGFsaWdubWVudDogc3RyaW5nID0gXCJjZW50ZXJcIjsgLy8gY2VudGVyIHwgc3RyZXRjaCB8IG1pZGRsZSB8IHRvcCB8IGJvdHRvbVxuICAgIEBJbnB1dCgpIHByaXZhdGUgZHVyYXRpb246IG51bWJlciA9IDI1MDsgLy8gaW4gbWlsbGlzZWNvbmRzXG4gICAgQE91dHB1dCgpIHByaXZhdGUgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBwcml2YXRlIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQFZpZXdDaGlsZChcImJvZHlFbFwiKSBwcml2YXRlIGJvZHlFbDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiY29udGVudEVsXCIpIHByaXZhdGUgY29udGVudEVsOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaG9zdEVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2VcbiAgICApIHtcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubG9hZGVkRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBhbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChhcmdzOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbihQYWdlLnVubG9hZGVkRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBhbmRyb2lkLm9mZihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGFnZUhlaWdodCA9IHRoaXMucGFnZUhlaWdodCA/IHRoaXMucGFnZUhlaWdodCA6IHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodERJUHM7XG4gICAgICAgIHRoaXMuaG9zdFZpZXcuc3R5bGUudHJhbnNsYXRlWSA9IHRoaXMucGFnZUhlaWdodDtcbiAgICB9XG5cbiAgICBzaG93KGRhdGE6IGFueSA9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LCBkdXJhdGlvbjogMCxcbiAgICAgICAgfSkudGhlbigoKSA9PiB0aGlzLm92ZXJsYXlWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSwgZHVyYXRpb246IHRoaXMudGltaW5nICogdGhpcy5kdXJhdGlvblNjYWxlLFxuICAgICAgICB9KSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy50aW1pbmcsXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxuICAgICAgICB9KSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9wZW4uZW1pdCh0aGlzLmRhdGEgPSBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuaXNTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4gMCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMudGltaW5nICogdGhpcy5kdXJhdGlvblNjYWxlLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcbiAgICAgICAgfSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgc2NhbGU6IHsgeDogLjYsIHk6IC42IH0sXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5wYWdlSGVpZ2h0IH0sXG4gICAgICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAwLCBkdXJhdGlvbjogdGhpcy50aW1pbmcgKiB0aGlzLmR1cmF0aW9uU2NhbGUsXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZUluT3V0LFxuICAgICAgICB9KSkudGhlbigoKSA9PiB0aGlzLm92ZXJsYXlWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMucGFnZUhlaWdodCB9LFxuICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZUluT3V0LFxuICAgICAgICB9KSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuaG9zdFZpZXcuc3R5bGUudHJhbnNsYXRlWSA9IHRoaXMucGFnZUhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UuZW1pdCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5kYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4gMCk7XG4gICAgfVxuXG4gICAgb25UYXBIaWRlID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNBbmRyb2lkICYmIHRoaXMuZGlzbWlzc2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkKHsgb2JqZWN0IH0pIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlldyA9IDxWaWV3Pm9iamVjdDtcblxuICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Lm9mZihbR2VzdHVyZVR5cGVzLnRvdWNoLCBHZXN0dXJlVHlwZXMudGFwXS5qb2luKFwiLFwiKSk7XG5cbiAgICAgICAgLy8gRXZlbnQgUHJvcGFnYXRpb25cbiAgICAgICAgaWYgKGlvcykge1xuICAgICAgICAgICAgdGFyZ2V0SGFuZGxlciA9IEhpZGVHZXN0dXJlUmVjb2duaXplckltcGwuaW5pdFdpdGhPd25lcih0aGlzLm92ZXJsYXlWaWV3KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc21pc3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SGFuZGxlci5mdW5jID0gKCkgPT4gdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlID0gVUlUYXBHZXN0dXJlUmVjb2duaXplci5hbGxvYygpLmluaXRXaXRoVGFyZ2V0QWN0aW9uKHRhcmdldEhhbmRsZXIsIFwidGFwXCIpO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5Vmlldy5pb3MuYWRkR2VzdHVyZVJlY29nbml6ZXIoZ2VzdHVyZSk7XG5cbiAgICAgICAgICAgIHRhcmdldEhhbmRsZXIyID0gSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbC5pbml0V2l0aE93bmVyKHRoaXMuYm9keVZpZXcpO1xuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZTIgPSBVSVRhcEdlc3R1cmVSZWNvZ25pemVyLmFsbG9jKCkuaW5pdFdpdGhUYXJnZXRBY3Rpb24odGFyZ2V0SGFuZGxlcjIsIFwidGFwXCIpO1xuICAgICAgICAgICAgZ2VzdHVyZTIuY2FuY2Vsc1RvdWNoZXNJblZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ib2R5Vmlldy5pb3MuYWRkR2VzdHVyZVJlY29nbml6ZXIoZ2VzdHVyZTIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgdGltaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiArdGhpcy5kdXJhdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRyYW5zbGF0ZVkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZUhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBob3N0VmlldygpOiBWaWV3IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG9zdEVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgYm9keVZpZXcoKTogVmlldyB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHlFbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGNvbnRlbnRWaWV3KCk6IFZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50RWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1vZGFsV2lkdGgoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzbVwiOiByZXR1cm4gXCI2NSVcIjtcbiAgICAgICAgICAgIGNhc2UgXCJsZ1wiOiByZXR1cm4gXCI5OCVcIjtcbiAgICAgICAgICAgIGNhc2UgXCJtZFwiOlxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiODUlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1vZGFsSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zaXplKSB7XG4gICAgICAgICAgICBjYXNlIFwic21cIjogcmV0dXJuIFwiNTAlXCI7XG4gICAgICAgICAgICBjYXNlIFwibGdcIjogcmV0dXJuIFwiOTglXCI7XG4gICAgICAgICAgICBjYXNlIFwibWRcIjpcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcIjY1JVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2QWxpZ25tZW50KCk6IHN0cmluZyB7XG4gICAgICAgIGlmIChpbmNsdWRlcyhbXCJjZW50ZXJcIiwgXCJzdHJldGNoXCIsIFwibWlkZGxlXCIsIFwidG9wXCIsIFwiYm90dG9tXCJdLCB0aGlzLmFsaWdubWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFsaWdubWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJjZW50ZXJcIjtcbiAgICB9XG59XG5cbiJdfQ==