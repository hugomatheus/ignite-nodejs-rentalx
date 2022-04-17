import { Request, Response, Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();
const specificationRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request: Request, response: Response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request: Request, response: Response) => {
  const specifications = specificationRepository.list();
  return response.status(200).send(specifications);
});

export { specificationsRoutes };
