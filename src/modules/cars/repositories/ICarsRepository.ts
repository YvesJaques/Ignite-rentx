import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
