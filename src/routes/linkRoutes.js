import { Router } from 'express';
import linkController from '../controllers/linkController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateLinkInput:
 *       type: object
 *       required:
 *         - originalUrl
 *       properties:
 *         originalUrl:
 *           type: string
 *           format: uri
 *           description: URL original a ser encurtada
 *           example: "https://www.exemplo.com.br/pagina-muito-longa"
 *     UpdateLinkInput:
 *       type: object
 *       required:
 *         - originalUrl
 *       properties:
 *         originalUrl:
 *           type: string
 *           format: uri
 *           description: Nova URL original
 *           example: "https://www.novosite.com.br"
 *     Link:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         originalUrl:
 *           type: string
 *           example: "https://www.exemplo.com.br"
 *         shortCode:
 *           type: string
 *           example: "abc123"
 *         clicks:
 *           type: integer
 *           example: 42
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     LinkResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Link criado com sucesso"
 *         data:
 *           $ref: '#/components/schemas/Link'
 *     LinkListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Links listados com sucesso"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Link'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 25
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalPages:
 *               type: integer
 *               example: 3
 */

/**
 * @swagger
 * tags:
 *   name: Links
 *   description: Gerenciamento de links encurtados
 */

/**
 * @swagger
 * /links:
 *   post:
 *     summary: Criar link encurtado
 *     description: Cria um novo link encurtado para o usuario autenticado
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLinkInput'
 *     responses:
 *       201:
 *         description: Link criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LinkResponse'
 *       400:
 *         description: URL invalida
 *       401:
 *         description: Token nao fornecido ou invalido
 */
router.post('/', authMiddleware, linkController.createLink);

/**
 * @swagger
 * /links:
 *   get:
 *     summary: Listar links do usuario
 *     description: Retorna todos os links do usuario autenticado com paginacao
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numero da pagina
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por pagina
 *     responses:
 *       200:
 *         description: Lista de links retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LinkListResponse'
 *       401:
 *         description: Token nao fornecido ou invalido
 */
router.get('/', authMiddleware, linkController.getAll);

/**
 * @swagger
 * /links/{id}:
 *   get:
 *     summary: Buscar link especifico
 *     description: Retorna os detalhes de um link especifico do usuario
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do link
 *     responses:
 *       200:
 *         description: Link encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Link encontrado"
 *                 data:
 *                   $ref: '#/components/schemas/Link'
 *       401:
 *         description: Token nao fornecido ou invalido
 *       404:
 *         description: Link nao encontrado
 */
router.get('/:id', authMiddleware, linkController.getById);

/**
 * @swagger
 * /links/{id}:
 *   put:
 *     summary: Atualizar link
 *     description: Atualiza a URL original de um link do usuario
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLinkInput'
 *     responses:
 *       200:
 *         description: Link atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LinkResponse'
 *       400:
 *         description: URL invalida
 *       401:
 *         description: Token nao fornecido ou invalido
 *       404:
 *         description: Link nao encontrado
 */
router.put('/:id', authMiddleware, linkController.update);

/**
 * @swagger
 * /links/{id}:
 *   delete:
 *     summary: Deletar link
 *     description: Remove um link do usuario 
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do link
 *     responses:
 *       200:
 *         description: Link deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Link deletado com sucesso"
 *       401:
 *         description: Token nao fornecido ou invalido
 *       404:
 *         description: Link nao encontrado
 */
router.delete('/:id', authMiddleware, linkController.delete);

export default router;