# Payment API Documentation

This API allows small businesses to accept payments from customers using the Paystack payment gateway. It provides endpoints to initiate payments and check their status using an in-memory storage solution.

## Features
- Initiate payments.
- Verify the status of payments.
- Scalable and extensible for future database integration.
- Includes rate limiting and timestamp cleanup for performance.

---

## Setup Instructions

### Prerequisites
Ensure the following are installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)
- Thunder Client/Postman or any REST client for testing API endpoints

### Steps

1. **Clone the Repository**
```bash
git clone https://github.com/robertGhandi/paystack-Integration.git
cd payment-api
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment Variables**
Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```
Replace `your_paystack_secret_key` with your actual Paystack secret key. You can obtain it from your [Paystack Dashboard](https://dashboard.paystack.com/).

4. **Run the Server**
```bash
npm start
```
The server will start on `http://localhost:3000` by default.

5. **Run the Tests**
```bash
npm test
```

6. **Test the API**
Use a REST client like Thunder Client or Postman to test the following endpoints:

---

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1/payments
```

### Endpoints

#### 1. **Initiate Payment**
- **URL:** `/`
- **Method:** `POST`
- **Description:** Creates a new payment request and returns an authorization URL for payment.
- **Request Body:**
  ```json
  {
    "customer_name": "Robert Pharez",
    "customer_email": "robert@example.com",
    "amount": 5000
  }
  ```
- **Response:**
  ```json
  {
    "payment": {
      "id": "PAY-12345",
      "customer_name": "Robert Pharez",
      "customer_email": "robert@example.com",
      "amount": 5000,
      "status": "pending",
      "timestamp": "1/23/2025, 12:58:20"
    },
    "authorization_url": "https://paystack.com/authorization-link",
    "status": "success",
    "message": "Payment initiated successfully."
  }
  ```

#### 2. **Get Payment Status**
- **URL:** `/:id`
- **Method:** `GET`
- **Description:** Retrieves the status of a specific payment transaction.
- **Response:**
  ```json
  {
    "payment": {
      "id": "PAY-12345",
      "customer_name": "Robert Pharez",
      "customer_email": "robert@example.com",
      "amount": 5000,
      "status": "success",
      "timestamp": "1/23/2025, 12:58:20"
    },
    "status": "success",
    "message": "Payment details retrieved successfully."
  }
  ```

---

## Additional Features

### Rate Limiting
Rate limiting has been implemented to prevent abuse of the API. Each IP address is limited to a certain number of requests per minute.

### Timestamp Cleanup
Old payment records are automatically removed from in-memory storage after one hour to optimize memory usage.

---

## Future Enhancements
- Integration with a database for persistent storage.
- User authentication and authorization.
- Support for additional payment gateways like PayPal and Flutterwave.
- Improved error handling and logging.

---

---

## Contributions
Contributions are welcome! Please fork the repository and create a pull request with your changes.

