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
        this.noSeEsconde = false;
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
            if (_this.noSeEsconde)
                return;
            if (platform_1.isAndroid && _this.dismissable) {
                _this.hide();
            }
        };
        this.onTapNoHide = function () {
            _this.noSeEsconde = true;
            setTimeout(function () { return _this.noSeEsconde = false; }, 20);
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
            template: "\n\t\t<GridLayout (loaded)=\"onLoad($event)\" (tap)=\"onTapHide()\" [translateY]=\"translateY\" opacity=\"0\" class=\"overlay\">\n\t\t\t<GridLayout #bodyEl [verticalAlignment]=\"vAlignment\" [width]=\"modalWidth\" [height]=\"modalHeight\" [translateY]=\"translateY\" scaleY=\".6\" scaleX=\".6\" opacity=\"0\"\n\t\t\tclass=\"overlay-body\">\n\t\t\t\t<StackLayout #contentEl (tap)=\"onTapNoHide()\" class=\"overlay-content\">\n\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t</StackLayout>\n\t\t\t</GridLayout>\n\t\t</GridLayout>\n\t",
            styles: ["\n\t\t.overlay {\n\t\t\tbackground-color: rgba(0, 0, 0, 0.8);\n\t\t\tz-index: 999999;\n        }\n\t\t.overlay .overlay-body { }\n\t\t.overlay .overlay-body .overlay-content {\n\t\t\tvertical-align: center;\n\t\t}\n\t\t.overlay .overlay-body >>> .close {\n\t\t\tcolor: red;\n\t\t\tfont-size: 16;\n\t\t}\n\t"]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            page_1.Page])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNHO0FBRXRHLHNEQUE4RDtBQUM5RCxtREFBMkQ7QUFDM0QseURBQTREO0FBQzVELGlEQUFnRDtBQUNoRCw0REFBcUg7QUFJckgscUNBQXFDO0FBQ3JDLFNBQVMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLO0lBQzlCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtRQUNWLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDdEI7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRUQsSUFBSSxpQkFBaUIsRUFBRSxPQUFPLENBQUM7QUFDL0IsSUFBSSxpQkFBRyxFQUFFO0lBQ0wsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDckI7S0FBTTtJQUNILGlCQUFpQjtRQUFHO1FBQVUsQ0FBQztRQUFELFFBQUM7SUFBRCxDQUFDLEFBQVgsR0FBVyxDQUFDO0lBQ2hDLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQ3JEO0FBRUQ7SUFBd0MsNkNBQWlCO0lBQXpEOztJQW1CQSxDQUFDO0lBaEJVLHVDQUFhLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsSUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCx1Q0FBRyxHQUFIO1FBQ0ks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QTVCMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLGtoQkFTWjtZQUNFLE1BQU0sRUFBRSxDQUFDLG9UQWFYLENBQUM7U0FDRixDQUFDO3lDQW1Cc0IsaUJBQVU7WUFDWixXQUFJO09BbEJiLGNBQWMsQ0FzSzFCO0lBQUQscUJBQUM7Q0FBQSxBQXRLRCxJQXNLQztBQXRLWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBzY3JlZW4sIGlzQW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IGFuZHJvaWQsIEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5cbmRlY2xhcmUgY29uc3QgVUlUYXBHZXN0dXJlUmVjb2duaXplciwgaW50ZXJvcCwgTlNPYmplY3Q7XG5cbi8vIE5vIHN1cHBvcnQgZm9yIEFycmF5I2luY2x1ZGVzIGhlcmVcbmZ1bmN0aW9uIGluY2x1ZGVzKGNvbnRhaW5lciwgdmFsdWUpIHtcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB2YXIgcG9zID0gY29udGFpbmVyLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxubGV0IEdlc3R1cmVSZWNvZ25pemVyLCBJbnRlcm9wO1xuaWYgKGlvcykge1xuICAgIEdlc3R1cmVSZWNvZ25pemVyID0gTlNPYmplY3Q7XG4gICAgSW50ZXJvcCA9IGludGVyb3A7XG59IGVsc2Uge1xuICAgIEdlc3R1cmVSZWNvZ25pemVyID0gY2xhc3MgQSB7IH07XG4gICAgSW50ZXJvcCA9IHsgdHlwZXM6IHsgaWQ6IHZvaWQgMCwgdm9pZDogdm9pZCAwIH0gfTtcbn1cblxuY2xhc3MgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCBleHRlbmRzIEdlc3R1cmVSZWNvZ25pemVyIHtcbiAgICBwdWJsaWMgZnVuYzogKCkgPT4gdm9pZDtcblxuICAgIHN0YXRpYyBpbml0V2l0aE93bmVyKG93bmVyKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCgpO1xuICAgICAgICBoYW5kbGVyLl9vd25lciA9IG93bmVyO1xuICAgICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG5cbiAgICB0YXAoKSB7XG4gICAgICAgIHRoaXMuX293bmVyLmlvcy5yZXNpZ25GaXJzdFJlc3BvbmRlcigpO1xuICAgICAgICBpZiAodGhpcy5mdW5jKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bmMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBPYmpDRXhwb3NlZE1ldGhvZHMgPSB7XG4gICAgICAgIFwidGFwXCI6IHsgcmV0dXJuczogSW50ZXJvcC50eXBlcy52b2lkLCBwYXJhbXM6IFtJbnRlcm9wLnR5cGVzLmlkXSB9XG4gICAgfTtcbn1cblxuLy8gS2VlcCBleHRlcm5hbCBzdGF0ZSBvZiB2aWV3c1xubGV0IHRhcmdldEhhbmRsZXIgPSBudWxsO1xubGV0IHRhcmdldEhhbmRsZXIyID0gbnVsbDtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJtb2RhbCwgW21vZGFsXVwiLFxuICAgIHRlbXBsYXRlOiBgXG5cdFx0PEdyaWRMYXlvdXQgKGxvYWRlZCk9XCJvbkxvYWQoJGV2ZW50KVwiICh0YXApPVwib25UYXBIaWRlKClcIiBbdHJhbnNsYXRlWV09XCJ0cmFuc2xhdGVZXCIgb3BhY2l0eT1cIjBcIiBjbGFzcz1cIm92ZXJsYXlcIj5cblx0XHRcdDxHcmlkTGF5b3V0ICNib2R5RWwgW3ZlcnRpY2FsQWxpZ25tZW50XT1cInZBbGlnbm1lbnRcIiBbd2lkdGhdPVwibW9kYWxXaWR0aFwiIFtoZWlnaHRdPVwibW9kYWxIZWlnaHRcIiBbdHJhbnNsYXRlWV09XCJ0cmFuc2xhdGVZXCIgc2NhbGVZPVwiLjZcIiBzY2FsZVg9XCIuNlwiIG9wYWNpdHk9XCIwXCJcblx0XHRcdGNsYXNzPVwib3ZlcmxheS1ib2R5XCI+XG5cdFx0XHRcdDxTdGFja0xheW91dCAjY29udGVudEVsICh0YXApPVwib25UYXBOb0hpZGUoKVwiIGNsYXNzPVwib3ZlcmxheS1jb250ZW50XCI+XG5cdFx0XHRcdFx0PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXHRcdFx0XHQ8L1N0YWNrTGF5b3V0PlxuXHRcdFx0PC9HcmlkTGF5b3V0PlxuXHRcdDwvR3JpZExheW91dD5cblx0YCxcbiAgICBzdHlsZXM6IFtgXG5cdFx0Lm92ZXJsYXkge1xuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuXHRcdFx0ei1pbmRleDogOTk5OTk5O1xuICAgICAgICB9XG5cdFx0Lm92ZXJsYXkgLm92ZXJsYXktYm9keSB7IH1cblx0XHQub3ZlcmxheSAub3ZlcmxheS1ib2R5IC5vdmVybGF5LWNvbnRlbnQge1xuXHRcdFx0dmVydGljYWwtYWxpZ246IGNlbnRlcjtcblx0XHR9XG5cdFx0Lm92ZXJsYXkgLm92ZXJsYXktYm9keSA+Pj4gLmNsb3NlIHtcblx0XHRcdGNvbG9yOiByZWQ7XG5cdFx0XHRmb250LXNpemU6IDE2O1xuXHRcdH1cblx0YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBub1NlRXNjb25kZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNTaG93aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwYWdlSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkdXJhdGlvblNjYWxlOiBudW1iZXIgPSAuNzU7XG4gICAgcHJpdmF0ZSBvdmVybGF5VmlldzogVmlldztcbiAgICBwcml2YXRlIGRhdGE6IGFueSA9IG51bGw7IC8vIE9wdGlvbmFsIGRhdGEgcGFyYW1ldGVyXG4gICAgQElucHV0KCkgcHJpdmF0ZSBzaXplOiBzdHJpbmcgPSBcInNtXCI7IC8vIHNtIHwgbWQgfCBsZ1xuICAgIEBJbnB1dCgpIHByaXZhdGUgZGlzbWlzc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHByaXZhdGUgYWxpZ25tZW50OiBzdHJpbmcgPSBcImNlbnRlclwiOyAvLyBjZW50ZXIgfCBzdHJldGNoIHwgbWlkZGxlIHwgdG9wIHwgYm90dG9tXG4gICAgQElucHV0KCkgcHJpdmF0ZSBkdXJhdGlvbjogbnVtYmVyID0gMjUwOyAvLyBpbiBtaWxsaXNlY29uZHNcbiAgICBAT3V0cHV0KCkgcHJpdmF0ZSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIHByaXZhdGUgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAVmlld0NoaWxkKFwiYm9keUVsXCIpIHByaXZhdGUgYm9keUVsOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoXCJjb250ZW50RWxcIikgcHJpdmF0ZSBjb250ZW50RWw6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBob3N0RWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICAgICkge1xuICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5sb2FkZWRFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UudW5sb2FkZWRFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFuZHJvaWQub2ZmKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYWdlSGVpZ2h0ID0gdGhpcy5wYWdlSGVpZ2h0ID8gdGhpcy5wYWdlSGVpZ2h0IDogc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcbiAgICAgICAgdGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gdGhpcy5wYWdlSGVpZ2h0O1xuICAgIH1cblxuICAgIHNob3coZGF0YTogYW55ID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RWaWV3LnN0eWxlLnRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIGR1cmF0aW9uOiAwLFxuICAgICAgICB9KS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLCBkdXJhdGlvbjogdGhpcy50aW1pbmcgKiB0aGlzLmR1cmF0aW9uU2NhbGUsXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxuICAgICAgICB9KSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnRpbWluZyxcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3Blbi5lbWl0KHRoaXMuZGF0YSA9IGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiAwKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy50aW1pbmcgKiB0aGlzLmR1cmF0aW9uU2NhbGUsXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxuICAgICAgICB9KS50aGVuKCgpID0+IHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY2FsZTogeyB4OiAuNiwgeTogLjYgfSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiB0aGlzLnBhZ2VIZWlnaHQgfSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlSW5PdXQsXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5wYWdlSGVpZ2h0IH0sXG4gICAgICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlSW5PdXQsXG4gICAgICAgIH0pKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gdGhpcy5wYWdlSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5jbG9zZS5lbWl0KHRoaXMuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoKSA9PiAwKTtcbiAgICB9XG5cbiAgICBvblRhcEhpZGUgPSAoKSA9PiB7XG4gICAgICAgIGlmKHRoaXMubm9TZUVzY29uZGUpIHJldHVybjtcbiAgICAgICAgaWYgKGlzQW5kcm9pZCAmJiB0aGlzLmRpc21pc3NhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGFwTm9IaWRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLm5vU2VFc2NvbmRlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm5vU2VFc2NvbmRlID0gZmFsc2UsIDIwKTtcbiAgICB9XG5cbiAgICBvbkxvYWQoeyBvYmplY3QgfSkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaWV3ID0gPFZpZXc+b2JqZWN0O1xuXG4gICAgICAgIHRoaXMuY29udGVudFZpZXcub2ZmKFtHZXN0dXJlVHlwZXMudG91Y2gsIEdlc3R1cmVUeXBlcy50YXBdLmpvaW4oXCIsXCIpKTtcblxuICAgICAgICAvLyBFdmVudCBQcm9wYWdhdGlvblxuICAgICAgICBpZiAoaW9zKSB7XG4gICAgICAgICAgICB0YXJnZXRIYW5kbGVyID0gSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbC5pbml0V2l0aE93bmVyKHRoaXMub3ZlcmxheVZpZXcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzbWlzc2FibGUpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRIYW5kbGVyLmZ1bmMgPSAoKSA9PiB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdlc3R1cmUgPSBVSVRhcEdlc3R1cmVSZWNvZ25pemVyLmFsbG9jKCkuaW5pdFdpdGhUYXJnZXRBY3Rpb24odGFyZ2V0SGFuZGxlciwgXCJ0YXBcIik7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlWaWV3Lmlvcy5hZGRHZXN0dXJlUmVjb2duaXplcihnZXN0dXJlKTtcblxuICAgICAgICAgICAgdGFyZ2V0SGFuZGxlcjIgPSBIaWRlR2VzdHVyZVJlY29nbml6ZXJJbXBsLmluaXRXaXRoT3duZXIodGhpcy5ib2R5Vmlldyk7XG4gICAgICAgICAgICBjb25zdCBnZXN0dXJlMiA9IFVJVGFwR2VzdHVyZVJlY29nbml6ZXIuYWxsb2MoKS5pbml0V2l0aFRhcmdldEFjdGlvbih0YXJnZXRIYW5kbGVyMiwgXCJ0YXBcIik7XG4gICAgICAgICAgICBnZXN0dXJlMi5jYW5jZWxzVG91Y2hlc0luVmlldyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJvZHlWaWV3Lmlvcy5hZGRHZXN0dXJlUmVjb2duaXplcihnZXN0dXJlMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0aW1pbmcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLmR1cmF0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdHJhbnNsYXRlWSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlSGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGhvc3RWaWV3KCk6IFZpZXcge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3N0RWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBib2R5VmlldygpOiBWaWV3IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keUVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgY29udGVudFZpZXcoKTogVmlldyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbW9kYWxXaWR0aCgpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgY2FzZSBcInNtXCI6IHJldHVybiBcIjY1JVwiO1xuICAgICAgICAgICAgY2FzZSBcImxnXCI6IHJldHVybiBcIjk4JVwiO1xuICAgICAgICAgICAgY2FzZSBcIm1kXCI6XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCI4NSVcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbW9kYWxIZWlnaHQoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzbVwiOiByZXR1cm4gXCI1MCVcIjtcbiAgICAgICAgICAgIGNhc2UgXCJsZ1wiOiByZXR1cm4gXCI5OCVcIjtcbiAgICAgICAgICAgIGNhc2UgXCJtZFwiOlxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiNjUlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZBbGlnbm1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGluY2x1ZGVzKFtcImNlbnRlclwiLCBcInN0cmV0Y2hcIiwgXCJtaWRkbGVcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl0sIHRoaXMuYWxpZ25tZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ25tZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcImNlbnRlclwiO1xuICAgIH1cbn1cblxuIl19