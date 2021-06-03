"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationsController = void 0;

class ListSpecificationsController {
  constructor(listSpecificationsUseCase) {
    this.listSpecificationsUseCase = listSpecificationsUseCase;
  }

  handle(request, response) {
    const all = this.listSpecificationsUseCase.execute();
    return response.json(all);
  }

}

exports.ListSpecificationsController = ListSpecificationsController;