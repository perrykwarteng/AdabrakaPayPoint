import express from "express";
import { initiate, verify } from "../controllers/payments.controller.js";
const route = express.Router();

// Routes
route.post("/initiate-payment", initiate);
route.get("/verify/:reference", verify);

export default route;
