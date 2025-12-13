import prisma from "../config/prismaClient.js";
import generateShortCode from "../utils/generateShortCode.js";

class LinkService {

  // Valida se a URL é válida
  _isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Cria um link encurtado
  async createLink({ originalUrl, userId }) {
    if (!this._isValidUrl(originalUrl)) {
      const error = new Error("Url inválida");
      error.status = 400;
      throw error;
    }

    const shortCode = await generateShortCode();

    return prisma.link.create({
      data: {
        originalUrl,
        shortCode,
        userId,
        clicks: 0
      },
      select: {
        id: true,
        originalUrl: true,
        shortCode: true,
        clicks: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  // Lista todos os links do usuário (com paginação)
  async getAllLinksByUser({ userId, page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      prisma.link.findMany({
        where: { userId, deletedAt: null },
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          originalUrl: true,
          shortCode: true,
          clicks: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.link.count({
        where: { userId, deletedAt: null }
      })
    ]);

    return {
      data: links,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  // Busca um link específico do usuário
  async getLinkById({ linkId, userId }) {
    const link = await prisma.link.findFirst({
      where: { id: linkId, userId, deletedAt: null },
      select: {
        id: true,
        originalUrl: true,
        shortCode: true,
        clicks: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!link) {
      const error = new Error("Link não encontrado");
      error.status = 404;
      throw error;
    }

    return link;
  }

  // Atualiza a URL original do link
  async updateLink({ linkId, userId, originalUrl }) {
    await this.getLinkById({ linkId, userId });

    if (!this._isValidUrl(originalUrl)) {
      const error = new Error("URL inválida");
      error.status = 400;
      throw error;
    }

    return prisma.link.update({
      where: { id: linkId },
      data: { originalUrl },
      select: {
        id: true,
        originalUrl: true,
        shortCode: true,
        clicks: true,
        updatedAt: true
      }
    });
  }

  // Deleta um link (soft delete)
  async deleteLink({ linkId, userId }) {
    await this.getLinkById({ linkId, userId });

    await prisma.link.update({
      where: { id: linkId },
      data: { deletedAt: new Date() }
    });

    return { message: "Link deletado com sucesso" };
  }

  // Redireciona usando o shortCode e contabiliza o clique
  async redirectByShortCode(shortCode) {
    const link = await prisma.link.findUnique({
      where: { shortCode }
    });

    if (!link || link.deletedAt) {
      const error = new Error("Link não encontrado");
      error.status = 404;
      throw error;
    }

    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } }
    });

    return link.originalUrl;
  }
}

export default new LinkService();
