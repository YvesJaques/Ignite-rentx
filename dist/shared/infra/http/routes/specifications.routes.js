"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

var _ensureAdmin = require("@shared/infra/http/middlewares/ensureAdmin");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);