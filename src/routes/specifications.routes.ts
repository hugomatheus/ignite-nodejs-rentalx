import { Request, Response, Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );
  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get("/", (request: Request, response: Response) => {
  const specifications = specificationRepository.list();
  return response.status(200).send(specifications);
});

export { specificationsRoutes };
