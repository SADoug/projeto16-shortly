import joi from "joi";


export async function sigInValidação(req, res, next) {
    const newClient = req.body;

    const clientSchema = joi.object({
        email: joi.string().min(1).required(),
        password: joi.string().min(1).required(),
    });
    const validation = clientSchema.validate(newClient);

    next();
}
