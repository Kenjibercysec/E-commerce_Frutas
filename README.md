# Fruit Store E-commerce

Um e-commerce moderno e responsivo especializado em frutas, desenvolvido com React, Node.js e MongoDB.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para construção de interfaces
- **React Context API** - Gerenciamento de estado global
- **CSS3** - Estilização com variáveis CSS e design responsivo
- **HTML5** - Estrutura semântica da aplicação

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação e autorização
- **Bcrypt** - Criptografia de senhas

### Ferramentas e Serviços
- **GitHub Pages** - Hospedagem do frontend
- **MongoDB Atlas** - Banco de dados em nuvem
- **Postman** - Teste de APIs
- **VS Code** - Ambiente de desenvolvimento

## 📋 Funcionalidades

### Autenticação
- Registro de usuários
- Login com JWT
- Recuperação de senha
- Atualização de perfil

### Produtos
- Listagem de produtos
- Filtragem por categorias
- Ordenação por nome e preço
- Paginação
- Detalhes do produto

### Carrinho
- Adicionar/remover produtos
- Atualizar quantidades
- Cálculo de total
- Persistência local

### Interface
- Design responsivo
- Animações suaves
- Temas claro/escuro
- Acessibilidade

## 🛠️ Configuração do Ambiente

1. **Pré-requisitos**
   ```bash
   Node.js >= 14.x
   MongoDB >= 4.x
   ```

2. **Instalação**
   ```bash
   # Clone o repositório
   git clone https://github.com/seu-usuario/fruit-store.git

   # Instale as dependências do frontend
   cd frontend
   npm install

   # Instale as dependências do backend
   cd ../backend
   npm install
   ```

3. **Configuração**
   - Crie um arquivo `.env` no backend:
     ```
     MONGODB_URI=sua_uri_mongodb
     JWT_SECRET=seu_secret_jwt
     PORT=3000
     ```

4. **Execução**
   ```bash
   # Inicie o backend
   cd backend
   npm start

   # Inicie o frontend
   cd frontend
   npm start
   ```

## 🔒 Segurança

- Autenticação JWT
- Criptografia de senhas
- Proteção contra XSS
- Validação de inputs
- CORS configurado
- Rate limiting
- Sanitização de dados

## 📁 Estrutura do Projeto

```
fruit-store/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
└── README.md
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para seu-email@exemplo.com ou abra uma issue no GitHub.

## 🙏 Agradecimentos

- Compass UOL pelo suporte
- Comunidade open source
- Todos os contribuidores 