
# 🧊 ArticOps — Sistema de Manutenção para Bases na Antártica

![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite&logoColor=white)  ![React](https://img.shields.io/badge/React-18-blue?logo=react)  ![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript)  ![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?logo=jest)  ![Tests](https://img.shields.io/badge/tests-8%20passed%20(13%20total)-brightgreen?style=flat-square)

Sistema desenvolvido como parte de um desafio técnico para simular o gerenciamento de manutenções em bases de pesquisa na Antártica. O projeto utiliza boas práticas de Clean Architecture, controle de acesso por perfil de usuário, e recursos modernos de front-end.


## 🚀 Tecnologias

- [React 18](https://reactjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/)  
- [Sass](https://sass-lang.com/)  
- [React Query](https://tanstack.com/query/latest)  
- [Zustand](https://zustand-demo.pmnd.rs/)  
- [React Router DOM](https://reactrouter.com/)  
- [React Icons](https://react-icons.github.io/react-icons/)  
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)  
- [Jest](https://jestjs.io/)

## 🔧 Backend Simulado

A API utilizada é uma simulação serverless hospedada na Vercel, que permite persistência temporária dos dados para fins de teste e desenvolvimento.  
Não há um banco de dados real por trás da API, e os dados podem ser resetados a qualquer momento.  
Essa solução foi adotada para simplificar o setup do projeto e focar no desenvolvimento frontend e na arquitetura da aplicação.


## 🧱 Arquitetura

Organização baseada em Clean Architecture + modularização por features:

```plaintext
src/
├── api/               # Configurações e instâncias de APIs globais
├── components/        # Componentes reutilizáveis e genéricos
├── constants/         # Constantes globais (ex: enums, valores fixos)
├── hooks/             # Hooks customizados reutilizáveis (uso global)
├── lib/               # Bibliotecas utilitárias, como client do React Query
├── routes/            # Definição das rotas e proteção de rotas
├── store/             # Zustand ou Context API para estado global
├── styles/            # Estilos globais, temas, variáveis Sass
├── types/             # Tipagens globais e compartilhadas
├── utils/             # Funções utilitárias reutilizáveis (ex: formatações)
├── features/
│   └── users/         # Feature isolada para usuários
│       ├── api/       # Funções de requisição específicas de usuários
│       ├── components/# Componentes específicos da feature de usuários
│       ├── hooks/     # Hooks específicos da feature de usuários
│       ├── pages/     # Páginas de usuários (ex: lista, detalhe)
│       ├── store/     # Zustand/context específico de usuários
│       ├── types/     # Tipagens específicas da feature
├── App.tsx            # Componente principal da aplicação
└── main.tsx           # Ponto de entrada da aplicação (ReactDOM)
```



## 🖼️ Preview da Interface

### Dashboard com indicadores e gráficos

![dashboard](https://github.com/user-attachments/assets/f0c336e8-ccdd-4fbe-a330-df9a6cede50c)

### Listagem de chamados

![listagem-chamados](https://github.com/user-attachments/assets/71459ae2-a76d-4852-af2b-e32533556478)


## ⚙️ Funcionalidades

- Autenticação com controle de sessão.  
- Criação e edição de chamados (corretivos e preventivos).  
- Dashboard com indicadores e gráficos.  
- Filtros dinâmicos por tipo, status, agente, setor.  
- CRUD completo de usuários, setores e equipamentos.

---

## 📋 Fluxo de Desenvolvimento e Entrega

- O desenvolvimento está dividido em **Issues temáticas**, cada uma focada em uma funcionalidade ou etapa do sistema.  
- Para cada Issue, é criada uma **Branch específica** e submetido um **Pull Request (PR)** individual.  
- Após aprovação, a versão é publicada automaticamente via **deploy no Netlify**.  
- A branch principal (`main`) sempre reflete a versão estável e publicada do sistema.


## 🧠 Decisões Técnicas

- **Clean Architecture** com separação por `features/`.  
- **Zustand** para gerenciamento de estado reativo e global.  
- **React Query** para controle de cache e requisições assíncronas.  
- **Sass** para modularização de estilos com temas e variáveis.  
- **Testes unitários com Jest**.  
- **Modularização por responsabilidade** em todos os domínios da aplicação.


## 📱 Responsividade

- Flexbox e media queries para layouts ajustáveis.  
- Elementos com largura fluida e tipografia escalável.  
- Botões e inputs otimizados para toque em dispositivos móveis.  
- Ajustes em tabelas e grids para navegação vertical no mobile.


## 🚧 Possíveis melhorias futuras

| Categoria      | Pontuação Atual | Oportunidades de Melhoria                                   |
| -------------- | --------------- | ---------------------------------------------------------- |
| Performance    | 55              | Otimizar carregamento, reduzir bundle size, lazy loading e cache mais agressivo. |
| Accessibility  | 94              | Melhorar labels, contraste e navegação via teclado para maior acessibilidade. |
| Best Practices | 81              | Ajustar pequenos detalhes para aderir às melhores práticas modernas e evitar alertas. |
| SEO            | 91              | Aprimorar títulos, meta tags, estrutura semântica e uso de tags para SEO. |

Essas melhorias estão planejadas para versões futuras visando tornar o sistema mais robusto, acessível e eficiente.


## 📍 Acesse o Projeto

- 🌐 [Deploy da aplicação (Netlify)](https://articops.netlify.app)  
- 🔌 [Mock API JSON Server (Vercel)](https://vercel-api-desireemenezes-projects.vercel.app)

- ## 🔐 Credenciais para Login

| Usuário        | Perfil        | Email               | Senha   |
| -------------- | ------------- | ------------------- | ------- |
| Administrador  | Gestor        | manager@station.com | 123456  |
| Carlos         | Agente        | carlos@station.com  | 123456  |
| Alice          | Pesquisadora  | alice@station.com   | 123456  |

> Use essas credenciais para acessar o sistema conforme o perfil de cada usuário.


## 📦 Instalação

```bash
git clone https://github.com/desireemenezes/sistema-manutencao.git
cd sistema-manutencao
npm install
```

### Scripts

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o projeto em modo desenvolvimento |
| `npm run build`   | Gera build de produção otimizado         |
| `npm run preview` | Pré-visualiza o build                    |
| `npm run test`    | Executa testes unitários com Jest        |


## 🔐 Variáveis de Ambiente

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Configure a URL da API mockada:

```
VITE_API_URL=https://vercel-api-desireemenezes-projects.vercel.app/
```


## 📈 Cobertura de Testes

Este projeto utiliza o Jest com geração de relatório de cobertura.

> ℹ️ **Observação:** a cobertura ainda não está 100%, pois o foco inicial foi validar as funcionalidades principais. O aumento da cobertura está planejado como melhoria contínua.

### Resultado atual:

| Tipo       | Cobertura |
| ---------- | --------- |
| Statements | 40.95%    |
| Branches   | 29.92%    |
| Functions  | 28%       |
| Lines      | 42.2%     |

![image](https://github.com/user-attachments/assets/a2af7523-ab8b-4c46-bef8-8fb9bb836aed)


## 👩‍💻 Autoria

**Desirée Menezes**

- GitHub: [github.com/desireemenezes](https://github.com/desireemenezes)  
- LinkedIn: [linkedin.com/in/desireemenezes](https://www.linkedin.com/in/desireemenezes)  
- E-mail: deeemenezes@gmail.com

## ✨ Obrigada por visitar o projeto!  
Sinta-se à vontade para entrar em contato para feedbacks, dúvidas ou oportunidades.

