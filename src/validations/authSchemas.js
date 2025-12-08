import { z } from 'zod';

export const registerSchema = z.object ({
    name: z
    .string({
        required_error: "Nome é Obrigatorio",
    })
    .min(3, "Nome deve ter no minimo 3 caracteres"),

    email: z
    .string({
        required_error: "Email é Obrigatorio",
    })
    .email("Email invalido"),

    password: z
    .string({
        required_error: "Senha é Obrigatorio",
    })
    .min(6, "Senha deve ter no minimo 6 caracteres"),

});

export const loginSchema = z.object ({
    email: z
    .string({
        required_error: "Email é obrigatorio",
    })
    .email("Email invalido"),

    password: z
    .string({
        required_error: "Senha é obrigatorio",
    })
    .min(6, "Senha deve ter no minimo 6 caracteres"),
})