# 🛠️ Sistema de Manutenção (ArticOps)

Sistema web para gerenciamento de manutenções em bases de pesquisa na Antártica. 
Permite a criação, execução e histórico de chamados de manutenção corretiva e preventiva, com acesso controlado por perfis de usuário.

## 🚀 Tecnologias

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [React Query](https://react-query.tanstack.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) / Context API
- [React Router DOM](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Jest](https://jestjs.io/) (testes unitários)
- Arquitetura: Clean Architecture + Modularização por Features
- Mock API: [`json-server`](https://github.com/typicode/json-server) hospedado em [rest-json-server.onrender.com](https://rest-json-server.onrender.com/)

 ![image](https://github.com/user-attachments/assets/392e729d-744b-4e1d-acbe-b5e1c6da78c8)


---

## 📦 Instalação

```bash
# Clone o projeto
git clone https://github.com/desireemenezes/sistema-manutencao.git

# Acesse a pasta
cd sistema-manutencao

# Instale as dependências
npm install

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Inicia o projeto em modo desenvolvimento |
| `npm run build`   | Gera build de produção otimizado         |
| `npm run preview` | Pré-visualiza o build                    |
| `npm run test`    | Executa testes unitários com Jest        |
| `npm run lint`    | Executa linting com ESLint               |


🧱 Estrutura de Pastas (resumo)
src/
├── assets/            # Imagens e arquivos estáticos
├── features/          # Funcionalidades isoladas (modularizadas)
│   └── maintenance/   # Ex: manutenção (chamados, dashboard, etc)
├── shared/            # Componentes reutilizáveis
├── services/          # API clients (React Query)
├── hooks/             # Hooks customizados
├── store/             # Zustand ou Context
├── styles/            # Estilos globais e variáveis
├── App.tsx
└── main.tsx
````

## 📋 Fluxo de Desenvolvimento e Entrega
Este projeto segue um fluxo organizado para garantir qualidade, rastreabilidade e entregas contínuas:

O desenvolvimento está dividido em Issues temáticas, cada uma focada em uma funcionalidade ou etapa do sistema.

Para cada Issue, deve ser criada uma Branch específica e submetido um Pull Request (PR) individual.

Após a aprovação do PR, a versão correspondente é automaticamente publicada via deploy no Netlify.

Este fluxo permite acompanhamento incremental do progresso e testes em ambiente real.

A branch principal (main ou master) sempre reflete a versão estável e publicada do sistema.

## 🧠 Decisões técnicas
Clean Architecture com features/ isoladas

State Management com Zustand + Context API (quando necessário)

React Query para gerenciamento de dados assíncronos

Sass com estrutura escalável e utilitários globais

Testes unitários com Jest

Modularização por responsabilidade

---

🧑‍💻
Desenvolvido por Desirée Menezes
