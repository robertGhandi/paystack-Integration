import {
	initializePayment,
	verifyPayment,
} from "../services/paystackService.js";

const payments = {}; // Simulated in-memory database

setInterval(() => {
	const currentTime = Date.now();
	for (const id in payments) {
		if (currentTime - payments[id].timestamp > 3600000) {
			delete payments[id];
		}
	}
}, 3600000);

const initiatePayment = async (req, res) => {
	const { customer_name, customer_email, amount } = req.body;

	if (!customer_name || !customer_email || !amount) {
		return res.status(400).json({
			status: "error",
			message: "Customer name, email, and amount are required.",
		});
	}

	try {
		const paystackResponse = await initializePayment(
			customer_email,
			amount
		);
		const paymentId = paystackResponse.data.reference;

		if (payments[paymentId]) {
			return res.status(409).json({
				status: "error",
				message: `Duplicate request detected for paymentId: ${paymentId}`,
			});
		}

		// Store payment details in memory
		payments[paymentId] = {
			id: paymentId,
			customer_name,
			customer_email,
			amount,
			status: "pending",
			timestamp: Date.now(),
		};

		const formattedTimestamp = new Date(
			payments[paymentId].timestamp
		).toLocaleString();

		res.status(201).json({
			payment: { ...payments[paymentId], timestamp: formattedTimestamp },
			authorization_url: paystackResponse.data.authorization_url,
			status: "success",
			message: "Payment initiated successfully.",
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Failed to initiate payment.",
			details: error.response?.data || error.message,
		});
		console.error(
			"Error initiating payment:",
			error.response?.data || error.message
		);
	}
};

const getPaymentStatus = async (req, res) => {
	const { id } = req.params;

	if (!payments[id]) {
		return res.status(404).json({
			status: "error",
			message: "Payment not found.",
		});
	}

	try {
		const paystackResponse = await verifyPayment(id);
		const paymentStatus = paystackResponse.data.status;

		// Update payment status in memory
		payments[id].status = paymentStatus;

		const formattedTimestamp = new Date(
			payments[id].timestamp
		).toLocaleString();

		res.status(200).json({
			payment: { ...payments[id], timestamp: formattedTimestamp },
			status: "success",
			message: "Payment details retrieved successfully.",
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Failed to retrieve payment status.",
			details: error.response?.data || error.message,
		});
		console.error(
			"Error retrieving payment status:",
			error.response?.data || error.message
		);
	}
};

export { initiatePayment, getPaymentStatus };
