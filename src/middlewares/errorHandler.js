const errorHandler = (error, req, res, next) => {

    const status = error.status || 500;

    const message = error.message || "Erro interno do servidor";

    // log do erro no console
    console.error("Erro capturado:" , {
        status,
        message,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });

    // retorna a resposta de erro
    return res.status(status).json({
        success: false,
        message
    });
};

export default errorHandler;