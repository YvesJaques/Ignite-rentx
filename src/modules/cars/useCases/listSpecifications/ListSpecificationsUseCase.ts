import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
