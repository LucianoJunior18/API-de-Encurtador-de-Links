import LinkService from "../services/linkService.js";

class LinkController {

    /**
     * Cria um novo link encurtado
     * POST /links
     */
    async createLink(req, res) {
        try {
            const { originalUrl } = req.body;
            const userId = req.user.id; // Vem do middleware de autenticação

            const link = await LinkService.createLink({ originalUrl, userId });

            return res.status(201).json({
                success: true,
                message: "Link criado com sucesso",
                data: link
            });
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Lista todos os links do usuário com paginação
     * GET /links?page=1&limit=10
     */
    async getAll(req, res) {
        try {
            const userId = req.user.id;
            const { page = 1, limit = 10 } = req.query;

            const result = await LinkService.getAllLinksByUser({
                userId,
                page: Number(page),
                limit: Number(limit)
            });

            return res.status(200).json({
                success: true,
                message: "Links listados com sucesso",
                ...result
            });
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Busca um link específico pelo ID
     * GET /links/:id
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const link = await LinkService.getLinkById({
                linkId: id,
                userId
            });

            return res.status(200).json({
                success: true,
                message: "Link encontrado",
                data: link
            });
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Atualiza a URL original de um link
     * PUT /links/:id
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { originalUrl } = req.body;
            const userId = req.user.id;

            const link = await LinkService.updateLink({
                linkId: id,
                userId,
                originalUrl
            });

            return res.status(200).json({
                success: true,
                message: "Link atualizado com sucesso",
                data: link
            });
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Deleta um link (soft delete)
     * DELETE /links/:id
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const result = await LinkService.deleteLink({
                linkId: id,
                userId
            });

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Redireciona para URL original (rota pública)
     * GET /:shortCode
     */
    async redirect(req, res) {
        try {
            const { shortCode } = req.params;

            const originalUrl = await LinkService.redirectByShortCode(shortCode);

            // Redireciona para a URL original
            return res.redirect(301, originalUrl);
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

}

export default new LinkController();