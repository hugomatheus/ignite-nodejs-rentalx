import { Request, Response, Router } from "express";

import { CategoryRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoryRepository.findByName(name);
  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "Category already exists" });
  }
  categoryRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  const categories = categoryRepository.list();
  return response.status(200).send(categories);
});

export { categoriesRoutes };
