"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var pipe_connection_service_1 = require("client/service/pipe-connection.service");
var router_1 = require("@angular/router");
var entities_1 = require("client/entities/entities");
var PipeDeleteComponent = (function () {
    function PipeDeleteComponent(PipeConnectionService, Router) {
        this.PipeConnectionService = PipeConnectionService;
        this.Router = Router;
        this.isConfirmationVisible = false;
        this.deleteButtonDisabled = false;
    }
    PipeDeleteComponent.prototype.ngOnInit = function () {
    };
    PipeDeleteComponent.prototype.showConfirmation = function () {
        return this.isConfirmationVisible = true;
    };
    PipeDeleteComponent.prototype.deletePipe = function () {
        var _this = this;
        this.deleteButtonDisabled = true;
        return this.PipeConnectionService.deletePipe(this.pipe.id)
            .then(function () {
            return _this.Router.navigate(['projects']);
        });
    };
    __decorate([
        core_1.Input('pipe'), 
        __metadata('design:type', entities_1.ProjectPipe)
    ], PipeDeleteComponent.prototype, "pipe", void 0);
    PipeDeleteComponent = __decorate([
        core_1.Component({
            selector: 'pipe-delete',
            templateUrl: 'client/modules/projects/edit-project/components/shared/pipe-delete/pipe-delete.component.html',
            styleUrls: [
                'client/modules/projects/edit-project/components/shared/pipe-delete/pipe-delete.component.css',
                'client/modules/projects/edit-project/edit-project.component.css',
            ],
        }), 
        __metadata('design:paramtypes', [pipe_connection_service_1.PipeConnectionService, router_1.Router])
    ], PipeDeleteComponent);
    return PipeDeleteComponent;
}());
exports.PipeDeleteComponent = PipeDeleteComponent;
//# sourceMappingURL=pipe-delete.component.js.map