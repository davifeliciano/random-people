import { getRandomPersonController } from "@controllers/people.controllers";
import { Router } from "express";

const peopleRouter = Router();

peopleRouter.get("/person", getRandomPersonController);

export default peopleRouter;
