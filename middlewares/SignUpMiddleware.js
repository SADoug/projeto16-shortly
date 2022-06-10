import joi from "joi";


export async function novoClienteValidação(req, res, next) {
    const newClient = req.body;

    const clientSchema = joi.object({
        name: joi.string().min(1).required(),
        email: joi.string().min(1).required(),
        password: joi.string().min(1).required(),
        confirmPassword: joi.string().required()
    });
    const validation = clientSchema.validate(newClient);
    if (validation.error) {
        res.status(400).send(validation.error.details);
        return;
    }
console.log("CHEGUEI NO FINAL DO MIDDLEWARE");
    next();
}
