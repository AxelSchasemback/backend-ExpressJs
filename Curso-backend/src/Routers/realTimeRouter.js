import { Router } from "express";
import { ProductManagerMongo } from "../dao/ProductManagerMongo.js";

const pm = new ProductManagerMongo()

export const realTimeRouter = Router()

