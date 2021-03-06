import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const specificationsRepository = new SpecificationsRepository();

const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository,
);

const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase,
);

export { listSpecificationsController };
