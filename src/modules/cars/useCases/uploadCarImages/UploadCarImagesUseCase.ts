import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
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
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const previousImages = await this.carsImagesRepository.findByCarId(car_id);

    if (previousImages) {
      await this.carsImagesRepository.deleteByCarId(car_id);
      previousImages.forEach(async image => {
        await deleteFile(`./tmp/cars/${image.image_name}`);
      });
    }

    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
