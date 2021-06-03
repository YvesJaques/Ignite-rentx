"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSpecificationsController = void 0;

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _ListSpecificationsController = require("./ListSpecificationsController");

var _ListSpecificationsUseCase = require("./ListSpecificationsUseCase");

const specificationsRepository = new _SpecificationsRepository.SpecificationsRepository();
const listSpecificationsUseCase = new _ListSpecificationsUseCase.ListSpecificationsUseCase(specificationsRepository);
const listSpecificationsController = new _ListSpecificationsController.ListSpecificationsController(listSpecificationsUseCase);
exports.listSpecificationsController = listSpecificationsController;