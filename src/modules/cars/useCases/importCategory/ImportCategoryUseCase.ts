import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const fileParse = parse();
      const categories: IImportCategory[] = [];

      stream.pipe(fileParse);

      fileParse
        .on("data", async (line: any) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err: any) => {
          reject(err);
        });
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);
    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = this.categoryRepository.findByName(name);
      if (!categoryAlreadyExists) {
        this.categoryRepository.create({ name, description });
      }

      return category;
    });
  }
}

export { ImportCategoryUseCase };
