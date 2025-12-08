//  Middleware para validar body com Zod
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // 
        req.body = schema.parse(req.body);
        return next();
    } catch (error) {
        return res.status(400).json({
            message: "Dados inválidos",
            errors: error.errors,
        })
    }
}