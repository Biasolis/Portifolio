-- Arquivo: init.sql
-- Este script cria a estrutura do banco de dados.

-- Tabela para usuários do painel de administração
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Tabela para informações pessoais (sobre mim, título, etc.)
-- Usaremos ID=1 como o registro principal
CREATE TABLE IF NOT EXISTS personal_info (
    id INTEGER PRIMARY KEY DEFAULT 1,
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    email1 VARCHAR(255),
    email2 VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    linkedin_url VARCHAR(255), -- Adicionando links sociais
    github_url VARCHAR(255)   -- Adicionando links sociais
);

-- Tabela para Habilidades (Competências)
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    -- Categorias: Cloud, Servidores, Redes, Ferramentas, Telecom, DevOps
    category VARCHAR(100) NOT NULL
);

-- Tabela para Experiência Profissional
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL se for o emprego atual
    description TEXT NOT NULL, -- Vamos armazenar os bullet points como texto (podemos usar markdown)
    is_current BOOLEAN DEFAULT FALSE
);

-- Tabela para Educação
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    start_year VARCHAR(4) NOT NULL,
    end_year VARCHAR(4) NOT NULL
);