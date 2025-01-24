import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const headers = {
	Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
	"Content-Type": "application/json",
};

const initializePayment = async (email, amount) => {
	const payload = {
		email,
		amount: amount * 100, // Convert to kobo (Paystack requires the amount in the smallest currency unit)
		callback_url: "https://your-redirect-url.com",
	};

	const response = await axios.post(
		`${PAYSTACK_BASE_URL}/transaction/initialize`,
		payload,
		{ headers }
	);

	return response.data;
};

const verifyPayment = async (reference) => {
	const response = await axios.get(
		`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
		{ headers }
	);

	return response.data;
};

export {  initializePayment, verifyPayment };
