# 🏦 API de Gestão Financeira – FinHub

Uma API robusta para controle financeiro pessoal e empresarial. Gerencie receitas, despesas, investimentos, reservas de emergência, além de acompanhar ações e criptomoedas com base em análises de preço justo e rentabilidade.

[📚 Documentação da API](https://seu-link-da-documentacao.com) <!-- Substitua com seu link real -->

---

## 🚀 Tecnologias & Ferramentas

- **[NestJS](https://nestjs.com/)** – Framework backend moderno baseado em TypeScript
- **[Prisma ORM](https://www.prisma.io/)** – Mapeamento objeto-relacional de alta performance
- **[PostgreSQL](https://www.postgresql.org/)** – Banco de dados relacional poderoso e confiável
- **Git Flow** – Fluxo de versionamento com `feature/`, `release/` e `hotfix/`...
- **CI/CD** – Integração e entrega contínua (Ex: GitHub Actions, GitLab CI)

---

## 📦 Funcionalidades

- ✅ Cadastro de usuários e carteiras
- 💸 Controle de receitas e despesas
- 📈 Integração com bolsa B3 e criptomoedas analise gráfica 
- 🧠 Inteligência para recomendar compras com base no "preço justo"
- 📊 Relatórios de rendimento, valorização e histórico de ganhos

---

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Acesse o diretório
cd seu-repo

# Instale as dependências
npm install
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes de integração (e2e)
npm run test:e2e

# Cobertura dos testes
npm run test:cov
```

## 📘 Endpoints Documentados
- POST **v1/users/signup** – Cadastrar usuário no sistema
- POST **v1/users/signin** – Entrar no sistema
- GET **v1/users/me** – Dados do usuário baseado no token
- GET **v1/users/verify?token=token** – Validar e-mail
- GET **v1/users?id=id** – Filtrar pelo id do usuário
- PATCH **v1/users?id=id** – Editar informação do usário
- DELETE **v1/users?id=id** – Excluir usuário
- POST **v1/wallets** – Cadastrar novas carteiras
- GET **v1/wallets?user_id=id** – Puxar carteira de acordo com id do usuário
- GET **v1/wallets/id** – Filtrar pelo id da carteira
- PATCH **v1/wallets/id** – Editar informação da carteira
- DELETE **v1/wallets/id** – Editar informação da carteira
- POST **v1/category** – Criar uma nova categoria
- GET **v1/category?user_id=id** – Puxar cateogira de acordo com id do usuário
- PATCH **v1/category/id** – Editar categoria
- DELETE **v1/category/id** – Excluir categoria

[📌 Documentação da API](https://seu-link-da-documentacao.com)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

---

## 💡 Autores

Desenvolvido com 💙 por **[Tiago Rafael](https://github.com/seu-usuario) e [Jamille Araujo](https://github.com/seu-usuario)**  
👨‍💻 GitHub: [Tiago](https://github.com/TiaguinhoCode) e [Jamille](https://github.com/HeyJamille)   
📬 E-mail: tiagorafael019@gmail.com - jamille.araujo.freitas2003@gmail.com  
🔗 LinkedIn: [Tiago Rafael](https://www.linkedin.com/in/tiag0rafael) e [Jamille](https://www.linkedin.com/in/jamille-araujo-1060a01a3/)  
🐦 portfolio: [LogicHub](https://logichub.com.br)


