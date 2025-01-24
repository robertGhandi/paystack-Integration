import joi from "joi";

const initiatePaymentSchema = joi.object({
    customer_name: joi.string().required(),
    customer_email: joi.string().email().required(),
    amount: joi.number().strict().required(),
    
}).options({ abortEarly: false })


const validator = (validationSchema) => (req, res, next) => {
    try {
        const result = validationSchema.validate(req.body);
        if (result.error) {
            return res.status(400).json({
                status: "error",
                message: "Validation error",
                data: result.error.details.map((error) => error.message),
            });
        }

        req.body = result.value;

        next();
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Validation error",
            data: error,
        });
    }
};

export const validatePaymentRequest = validator(initiatePaymentSchema);