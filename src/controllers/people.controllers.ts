import PeopleRepository from "@repositories/people.repository";
import { Request, Response } from "express";

export async function getRandomPersonController(_req: Request, res: Response) {
  const randomPerson = await PeopleRepository.getRandomPerson();
  return res.send(randomPerson);
}
