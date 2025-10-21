// Arquivo: server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Importa nosso pool de conexão
const authenticateToken = require('./authMiddleware'); // Importa o middleware
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON body

// --- ROTAS PÚBLICAS (Para o portfólio) ---

// Rota principal que busca TODOS os dados do portfólio de uma vez
app.get('/api/portfolio-data', async (req, res) => {
  try {
    // Usamos Promise.all para executar as queries em paralelo
    const [
      infoRes,
      skillsRes,
      expRes,
      eduRes
    ] = await Promise.all([
      db.query('SELECT * FROM personal_info WHERE id = 1'),
      db.query('SELECT * FROM skills ORDER BY category, name'),
      db.query('SELECT * FROM experiences ORDER BY is_current DESC, start_date DESC'),
      db.query('SELECT * FROM education ORDER BY end_year DESC')
    ]);

    const portfolioData = {
      personalInfo: infoRes.rows[0],
      skills: skillsRes.rows,
      experiences: expRes.rows,
      education: eduRes.rows,
    };

    res.json(portfolioData);
  } catch (err) {
    console.error('Erro ao buscar dados do portfólio:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// --- ROTAS DE ADMIN (Para o painel) ---

// 1. Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Usuário autenticado, gerar token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// A partir daqui, todas as rotas /api/admin/* são protegidas
// Vamos usar um Router para organizar
const adminRouter = express.Router();
adminRouter.use(authenticateToken); // Aplica o middleware em todas as rotas abaixo

// --- CRUD para Experiências ---

// GET (Listar todas)
adminRouter.get('/experiences', async (req, res) => {
  const result = await db.query('SELECT * FROM experiences ORDER BY start_date DESC');
  res.json(result.rows);
});

// POST (Criar nova)
adminRouter.post('/experiences', async (req, res) => {
  const { company_name, role, start_date, end_date, is_current, description } = req.body;
  // Validação simples
  if (!company_name || !role || !start_date || !description) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }
  
  const sql = `
    INSERT INTO experiences (company_name, role, start_date, end_date, is_current, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const params = [company_name, role, start_date, end_date || null, is_current || false, description];
  
  try {
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar experiência:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT (Atualizar)
adminRouter.put('/experiences/:id', async (req, res) => {
  const { id } = req.params;
  const { company_name, role, start_date, end_date, is_current, description } = req.body;

  const sql = `
    UPDATE experiences
    SET company_name = $1, role = $2, start_date = $3, end_date = $4, is_current = $5, description = $6
    WHERE id = $7
    RETURNING *;
  `;
  const params = [company_name, role, start_date, end_date || null, is_current || false, description, id];

  try {
    const result = await db.query(sql, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar experiência:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE (Remover)
adminRouter.delete('/experiences/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM experiences WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    res.status(200).json({ message: 'Experiência removida com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar experiência:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// (Aqui você replicaria o CRUD acima para /skills, /education, /personal-info)

// Aplicar o router de admin ao app principal
app.use('/api/admin', adminRouter);


// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});