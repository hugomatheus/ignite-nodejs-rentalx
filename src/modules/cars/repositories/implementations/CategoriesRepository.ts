import dataSource from "database/data-source";
import { Category } from "modules/cars/entities/Category";
import { Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.categoryRepository.create({
      name,
      description,
    });

    await this.categoryRepository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };
