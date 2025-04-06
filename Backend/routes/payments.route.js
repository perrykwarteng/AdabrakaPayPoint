import express from "express";
import { initiate } from "../controllers/payments.controller.js";
const route = express.Router();

// Routes
route.get("/initiate", initiate);

export default route;
