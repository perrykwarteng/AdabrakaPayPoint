import express from "express";
import { initiate } from "../controllers/payments.controller.js";
const route = express.Router();

// Routes
route.post("/initiate-payment", initiate);

export default route;
