import AuthService from '../services/AuthService.js';

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }
      
      const result = await AuthService.login({ email, password });
      
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      });
      
      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: result.user
        }
      });
    } catch (error) {
      console.error('Erro no login:', error.message);
      
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Erro ao fazer login'
      });
    }
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Nome, email e senha são obrigatórios'
        });
      }
      
      if (!email.includes('@')) {
        return res.status(400).json({
          success: false,
          message: 'Email inválido'
        });
      }
      
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Senha deve ter no mínimo 6 caracteres'
        });
      }
      
      const novoUsuario = await AuthService.register({
        name,
        email,
        password
      });
      
      return res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: novoUsuario
      });
    } catch (error) {
      console.error('Erro no registro:', error.message);
      
      if (error.message === 'Email já cadastrado') {
        return res.status(409).json({
          success: false,
          message: 'Este email já está em uso'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Erro ao registrar usuário'
      });
    }
  }
}

export default new AuthController();