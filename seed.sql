-- Arquivo: seed.sql
-- Este script popula o banco com os dados iniciais do currículo.

-- 1. Inserir um usuário admin (usuário: admin, senha: admin123)
-- Em produção, NUNCA use senhas fracas. Isso é só para desenvolvimento.
-- O hash é para 'admin123' usando bcrypt (custo 10)
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2a$10$f/CWYp.P.0vB9kiseo4bneBw.fAg./fPCCR.xDqYd2nONpYJtEQ/S')
ON CONFLICT (username) DO NOTHING;

-- 2. Inserir Informações Pessoais
INSERT INTO personal_info (id, full_name, title, bio, email1, email2, phone, location, linkedin_url, github_url)
VALUES (
    1,
    'Leonardo Biasoli Piola de Sousa', -- [cite: 1]
    'Analista de Infraestrutura de TI / Engenheiro de Software', -- [cite: 2]
    'Profissional focado em infraestrutura de TI e engenharia de software, com 24 anos [cite: 4], experiência sólida em ambientes híbridos (on-premise e cloud), administração de servidores Windows [cite: 19] e Linux [cite: 7], e soluções de telecomunicações[cite: 38]. Busco continuamente aprendizado [cite: 7] para arquitetar, implementar e gerenciar soluções tecnológicas robustas e seguras.',
    'biasolileonardo@gmail.com', -- [cite: 4]
    'leonardo.biasoli@ledtecnologia.com.br', -- [cite: 4]
    '(16) 99248-9773', -- [cite: 3]
    'Franca - SP', -- [cite: 5]
    'https://www.linkedin.com/in/leonardo-biasoli/', -- (Suposição, altere no admin)
    'https://github.com/leobiasoli' -- (Suposição, altere no admin)
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    title = EXCLUDED.title,
    bio = EXCLUDED.bio,
    email1 = EXCLUDED.email1,
    email2 = EXCLUDED.email2,
    phone = EXCLUDED.phone,
    location = EXCLUDED.location;

-- 3. Inserir Habilidades (baseado nas competências )
INSERT INTO skills (name, category) VALUES
    ('Windows Server (2003-2022)', 'Servidores Windows'), -- [cite: 7, 19]
    ('Active Directory (AD) & GPO', 'Servidores Windows'), -- [cite: 15]
    ('Ubuntu Server', 'Servidores Linux'), -- [cite: 7]
    ('Debian', 'Servidores Linux'), -- [cite: 7]
    ('Proxmox (Hypervisor)', 'Virtualização'), -- 
    ('Amazon AWS', 'Cloud'), -- [cite: 8, 32, 45]
    ('Google Cloud (GCP)', 'Cloud'), -- [cite: 17, 32]
    ('Microsoft Azure (Básico)', 'Cloud'), -- [cite: 8]
    ('Hetzner', 'Cloud'), -- [cite: 32]
    ('Digital Ocean', 'Cloud'), -- [cite: 32]
    ('Akamai Linode', 'Cloud'), -- [cite: 32]
    ('Contabo', 'Cloud'), -- [cite: 32]
    ('Asterisk', 'Telecom'), -- [cite: 7]
    ('FreePBX / Issabel', 'Telecom'), -- [cite: 7]
    ('Freeswitch / FusionPBX', 'Telecom'), -- [cite: 7]
    ('MagnusBilling', 'Telecom'), -- [cite: 7]
    ('Google Workspace Admin', 'Ferramentas'), -- [cite: 14]
    ('TrendMicro Vision One', 'Segurança'), -- [cite: 18]
    ('Movidesk', 'Ferramentas'), -- [cite: 22]
    ('Redes (Montagem/Cabeamento)', 'Redes'), -- [cite: 13, 26, 53]
    ('Omnichannel', 'Telecom'); -- [cite: 27, 38]

-- 4. Inserir Experiências (Conteúdo "Melhorado")
INSERT INTO experiences (company_name, role, start_date, end_date, is_current, description)
VALUES (
    'Consórcio Magalu', -- [cite: 10]
    'Analista de Infraestrutura de TI', -- [cite: 11]
    '2024-09-01', -- [cite: 12]
    NULL,
    TRUE,
    '• Gerenciamento e administração de infraestrutura híbrida (on-premise e cloud), garantindo alta disponibilidade dos serviços.
• Administração de servidores Windows Server (2008 a 2022) [cite: 19], incluindo Active Directory (AD) e GPOs[cite: 15].
• Gestão da plataforma Google Workspace para todos os usuários do consórcio[cite: 14].
• Operação e monitoramento de segurança com TrendMicro Vision One e Deep Security[cite: 18].
• Suporte e administração de recursos na Google Cloud Platform (GCP)[cite: 17].
• Implementação e manutenção de redes [cite: 13], inventário de TI [cite: 20] e preparação de notebooks[cite: 21].'
), (
    'Freelance', -- [cite: 23]
    'Analista de TI', -- [cite: 24]
    '2023-06-01', -- [cite: 25]
    '2024-09-01', -- [cite: 25]
    FALSE,
    '• Consultoria e implementação de soluções multi-cloud (AWS, Hetzner, Digital Ocean, Linode, Contabo)[cite: 32], otimizando custos e performance.
• Implantação e configuração de sistemas ERP em nuvem [cite: 28] e plataformas de comunicação Omnichannel[cite: 27].
• Administração de servidores [cite: 33], montagem de redes [cite: 26] e prestação de suporte técnico especializado[cite: 31].
• Treinamento de clientes para utilização das plataformas implantadas[cite: 30].'
), (
    'VOCOM TECNOLOGIA EM TELECOMUNICAÇÕES', -- [cite: 34]
    'Supervisor e Analista de Suporte Técnico', -- [cite: 35]
    '2021-05-01', -- [cite: 36]
    '2023-04-01', -- [cite: 36]
    FALSE,
    '• Liderança da equipe de suporte N2/N3[cite: 37], supervisionando a resolução de incidentes críticos.
• Arquitetura e implantação de soluções de telefonia IP (PABX IP) e Omnichannel em nuvem[cite: 38].
• Administração de instâncias AWS EC2 [cite: 45] e servidores dedicados [cite: 46] para garantir a performance dos serviços.
• Treinamento [cite: 42] e atendimento focado em clientes de diversos segmentos B2B[cite: 43].'
), (
    'COELHO E COELHO SERVIÇOS DE INFORMÁTICA', -- [cite: 47]
    'Técnico em Informática e redes', -- [cite: 48]
    '2019-02-01', -- [cite: 49]
    '2021-04-01', -- [cite: 49]
    FALSE,
    '• Atuação como técnico de campo (field service), realizando manutenção de hardware (computadores e impressoras)[cite: 50, 52].
• Implantação de infraestrutura de rede, incluindo montagem de cabeamento estruturado[cite: 53, 54].
• Prestação de suporte técnico presencial e remoto a clientes de diversos setores[cite: 55].'
);

-- 5. Inserir Educação
INSERT INTO education (institution, course, start_year, end_year)
VALUES
    ('UNI-FACEF', 'Engenharia de Software', '2019', '2022'), -- [cite: 57, 58]
    ('RAMINGTON', 'Técnico em informática', '2016', '2017'), -- [cite: 59, 60]
    ('UNIPES', 'Técnico em eletrônica', '2012', '2015'); -- [cite: 61, 63]