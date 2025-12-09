import prisma from "../config/prismaClient.js"

/**
 * Gera um codigo curto unico de 6 caracteres alfa numerico
 * Verifica se o codigo ja existe no banco para evitar duplicidade
 */
async function generateShortCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 6;
    let shortCode = "";
    let isUnique = false;

    // Tenta gerar um codigo unico ate conseguir
    while (!isUnique) {
        // Gera um codigo aleatorio
        shortCode = "";
        for (let i = 0; i < codeLength; i++) {
            shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Verifica se o codigo ja existe no banco
        const existingLink = await prisma.link.findUnique({
            where: { shortCode}
        });

        if (!existingLink) {
            isUnique = true;
        }
    }
    return shortCode
}

export default generateShortCode