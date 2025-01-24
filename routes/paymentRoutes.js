import express from "express";
import { initiatePayment, getPaymentStatus } from "../controllers/paymentController.js";
import { validatePaymentRequest } from "../validators/initiatePayment.validator.js";

const router = express.Router();

// /api/v1/payments - Initiate a payment
router.post("/",  validatePaymentRequest, initiatePayment);

//  /api/v1/payments/{id} - Retrieve payment status
router.get("/:id", getPaymentStatus);

export default router;
