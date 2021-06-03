"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _CreateCarUseCase = require("../createCar/CreateCarUseCase");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
let createCarUseCase;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const car2 = await createCarUseCase.execute({
      name: "Car2",
      description: "Unavailable Car",
      daily_rate: 100,
      license_plate: "ABC-4321",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    car2.available = false;
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
    expect(cars[0]).toHaveProperty("available", true);
  });
  it("Should be able to list all available cars by category", async () => {
    const car = await createCarUseCase.execute({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "category_test"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_test"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by brand", async () => {
    const car = await createCarUseCase.execute({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by name", async () => {
    const car = await createCarUseCase.execute({
      name: "Name_test",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "category"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Name_test"
    });
    expect(cars).toEqual([car]);
  });
});