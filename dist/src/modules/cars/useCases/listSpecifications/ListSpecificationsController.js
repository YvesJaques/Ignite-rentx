"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSpecificationsController = void 0;
var ListSpecificationsController = /** @class */ (function () {
    function ListSpecificationsController(listSpecificationsUseCase) {
        this.listSpecificationsUseCase = listSpecificationsUseCase;
    }
    ListSpecificationsController.prototype.handle = function (request, response) {
        var all = this.listSpecificationsUseCase.execute();
        return response.json(all);
    };
    return ListSpecificationsController;
}());
exports.ListSpecificationsController = ListSpecificationsController;
