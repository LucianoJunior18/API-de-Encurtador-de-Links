import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Encurtador de Links",
            version: "1.0.0",
            description: "API REST desenvolvida para encurtar URLs longas, oferecendo autenticação segura, gerenciamento individual de links e redirecionamento público. O projeto utiliza Node.js, Express, Prisma ORM e PostgreSQL, seguindo boas práticas de arquitetura, segurança e documentação com Swagger (OpenAPI).",
            contact: {
                name: "Squad 3 - Programadores do Amanhã",
                url: "https://github.com/LucianoJunior18/API-de-Encurtador-de-Links"
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