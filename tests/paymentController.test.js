import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../index.js"; // Import the Express app


describe("Payment API", () => {
    it("should initiate a payment", async () => {
        const response = await request(app).post("/api/v1/payments").send({
            customer_name: "Robert Pharez",
            customer_email: "robert@example.com",
            amount: 50.0,
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.payment).toHaveProperty("id");
    }, 10000); // Set timeout to 10 seconds

    it("should retrieve payment status", async () => {
        // First, initiate a payment to get a payment ID
        const initiateResponse = await request(app).post("/api/v1/payments").send({
            customer_name: "Robert Pharez",
            customer_email: "robert@example.com",
            amount: 50.0,
        });

        const paymentId = initiateResponse.body.payment.id;

        // Now, retrieve the payment status using the payment ID
        const statusResponse = await request(app).get(`/api/v1/payments/${paymentId}`);

        expect(statusResponse.statusCode).toBe(200);
        expect(statusResponse.body.status).toBe("success");
        expect(statusResponse.body.payment).toHaveProperty("id", paymentId);
        expect(statusResponse.body.payment).toHaveProperty("status");
    }, 10000); 
});