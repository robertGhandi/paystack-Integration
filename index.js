import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes.js";
import helmet from "helmet";
import cors from "cors";
import apiRateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(apiRateLimiter);

app.use("/api/v1/payments", paymentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ 
        status: "error",
        message: "Internal Server error"
    });
});

app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}`);
});

export default app;
