import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import dayjs from "dayjs";

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if user has a currently open rental", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      const car2 = await carsRepositoryInMemory.create({
        name: "Test2",
        description: "Car Test2",
        daily_rate: 100,
        license_plate: "test2",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car2.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is a currently open rental for the same car", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with an invalid return time", async () => {
    expect(async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand",
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
