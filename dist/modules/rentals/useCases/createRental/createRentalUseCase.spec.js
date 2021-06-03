"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _AppError = require("@shared/errors/AppError");

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _createRentalUseCase = require("./createRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _createRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to create a new rental if user has a currently open rental", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "111111",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for this user!"));
  });
  it("Should not be able to create a new rental if there is a currently open rental for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "45321",
      car_id: "121212",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is not available"));
  });
  it("Should not be able to create a new rental with an invalid return time", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: car.id,
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError(`Can't register a rental with less than ${createRentalUseCase.minimumRentalHours} hours return time.`));
  });
});