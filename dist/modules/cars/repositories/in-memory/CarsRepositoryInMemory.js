"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(brand, category_id, name) {
    let all = this.cars.filter(car => car.available === true);
    if (brand) all = all.filter(car => car.brand === brand);
    if (category_id) all = all.filter(car => car.category_id === category_id);
    if (name) all = all.filter(car => car.name === name);
    return all;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;