"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exist!"));
  });
  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});