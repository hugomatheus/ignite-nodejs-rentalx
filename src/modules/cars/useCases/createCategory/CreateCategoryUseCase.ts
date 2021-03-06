import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
