# Gerenciador de Solicitações de Serviço

Este é um projeto de API RESTful desenvolvido em JavaScript com Node.js, utilizando TypeScript para tipagem estática. A aplicação é um sistema de gerenciamento de solicitações de serviço, onde administradores podem cadastrar funcionários, atribuir cargos e os funcionários podem submeter solicitações de serviço.

## Funcionalidades

- **Autenticação de Administradores**: A aplicação utiliza tokens JWT para autenticar administradores, garantindo a segurança das operações.

- **Cadastro de Funcionários e Cargos**: Administradores podem cadastrar funcionários e atribuir cargos a eles.

- **Solicitações de Serviço**: Funcionários podem cadastrar solicitações de serviço, especificando os detalhes da solicitação.

- **Serviço** Determinados funcionários não possuem autonomia para cadastrar serviço, sendo restrido via token.

## Tecnologias Utilizadas

- JavaScript
- Node.js
- TypeScript
- Sequelize (ORM para interagir com o banco de dados)
- MySQL (Banco de dados relacional para armazenamento dos dados)
- JWT (JSON Web Tokens para autenticação)
- Bcrypt (para hashing de senhas)
