# Leonardo Biasoli — Portfólio

Site estático do portfólio profissional de **Leonardo Biasoli**, com foco em **SysOps, Infraestrutura de TI e IA aplicada**.

🔗 **Live:** [leonardobiasoli.com.br](https://leonardobiasoli.com.br)

## Sobre

Página única (single-page) apresentando resumo profissional, competências técnicas, experiência, formação acadêmica e contato. Não há backend, banco de dados ou painel administrativo — o conteúdo é editado diretamente no HTML.

## Stack

- **HTML5 + CSS3** puro (sem framework), com *custom properties* para o sistema de temas
- **JavaScript vanilla**, sem dependências ou etapa de build
- **[Font Awesome](https://fontawesome.com/)** via CDN, para os ícones
- **Deploy contínuo** via [Forgejo Actions](https://forgejo.org/docs/latest/user/actions/) (runner self-hosted) para Nginx

## Funcionalidades

- 🌗 Tema claro (padrão) e escuro, com alternância persistida em `localStorage`
- 📄 Currículo em **PDF gerado a partir da própria página** (`window.print()` + folha de estilos `@media print` dedicada), formatado como currículo de 1 página — sempre sincronizado com o conteúdo do portfólio, sem arquivo PDF versionado
- ✨ Animações de entrada ao rolar (`IntersectionObserver`)
- 📱 Totalmente responsivo

## Estrutura

```
.
├── index.html               # Marcação e conteúdo do portfólio
├── style.css                 # Estilos (tema claro/escuro + folha de impressão do CV)
├── script.js                  # Toggle de tema, scroll reveal, geração do CV, "voltar ao topo"
└── .forgejo/
    └── workflows/
        └── deploy.yml          # Pipeline de deploy automático (push em main)
```

## Rodando localmente

Por ser um site 100% estático, basta servir os arquivos com qualquer servidor HTTP simples:

```bash
python3 -m http.server 8080
# ou
npx serve .
```

Depois acesse `http://localhost:8080`.

## Gerando o currículo em PDF

Clique em **"Baixar CV (PDF)"** no site: o navegador abre o diálogo de impressão já formatado como currículo de uma página — basta escolher "Salvar como PDF". Como não existe um arquivo estático versionado, o currículo é sempre um reflexo fiel do conteúdo atual do portfólio.

## Deploy

A branch `main` é publicada automaticamente a cada push, através de um runner self-hosted do Forgejo Actions (veja [`.forgejo/workflows/deploy.yml`](.forgejo/workflows/deploy.yml)), que sincroniza os arquivos estáticos para o servidor de produção por trás de um proxy reverso.

## Licença e uso

O código é aberto para consulta e estudo. Sinta-se livre para usá-lo como base para o seu próprio portfólio — apenas substitua as informações pessoais, experiências e dados de contato pelos seus.
