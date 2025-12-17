import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Encurtador de Links",
            version: "1.0.0",
            description: "Api para encurtar links e gerenciar URLs",
            contact: {
                name: "Squad 3",
                email: "squad3@email.com"
            }
        },
        servers: [
            {
                url: '/',
                description: "Servidor atual"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;