"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _createRentalController = require("@modules/rentals/useCases/createRental/createRentalController");

var _DevolutionRentalController = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _ListRentalsByUserController = require("@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");

var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _createRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserController.handle);