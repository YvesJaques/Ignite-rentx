import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const images = await this.carsImagesRepository.findByCarId(car_id);

    if (images) {
      await this.carsImagesRepository.deleteByCarId(car_id);
      images.forEach(async image => {
        await deleteFile(`./tmp/cars/${image.image_name}`);
      });
    }

    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
