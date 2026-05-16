# Catálogo de Livros

Aplicação de gerenciamento de leituras construída com **React + TypeScript + Tailwind CSS**, com persistência via API REST (CRUDCrud) e cobertura de testes com Jest + Testing Library.

## ✨ O que este projeto demonstra

- **TypeScript** com interfaces bem definidas e tipagem estrita em toda a aplicação
- **Custom hook** `useBooks` separando lógica de estado da camada de UI
- **Consumo de API REST** com axios: GET, POST, PUT, DELETE
- **CRUD completo**: adicionar, listar, editar inline, remover e alternar status
- **Busca e filtro** por título, autor e status de leitura
- **Paginação** client-side com navegação acessível
- **Testes unitários** com Jest e Testing Library (BookForm, BookItem, BookList)
- **Validação de formulário** com feedback visual por campo
- **Dark mode** automático via Tailwind (`prefers-color-scheme`)
- **Acessibilidade**: `aria-label`, `aria-current`, `aria-invalid`, `role="alert"`

## 🛠️ Tecnologias

- React 18 + TypeScript 5
- Tailwind CSS 3
- Axios
- React Hot Toast
- Jest + Testing Library
- Vite 5

## 📁 Estrutura

```
src/
├── components/
│   ├── BookForm.tsx    # Formulário com validação por campo
│   ├── BookItem.tsx    # Item com edição inline e badge de status
│   └── BookList.tsx    # Lista com estados de loading, erro e vazio
├── hooks/
│   └── useBooks.ts     # Toda lógica de estado e chamadas de API
├── services/
│   └── api.ts          # Cliente axios com funções tipadas
├── tests/
│   ├── BookForm.test.tsx
│   ├── BookItem.test.tsx
│   └── BookList.test.tsx
├── types/
│   └── book.ts         # Interfaces e tipos compartilhados
└── App.tsx             # Composição: busca, filtro, paginação, stats
```

## 🚀 Como rodar

### 1. Obter uma API key gratuita

Acesse [crudcrud.com](https://crudcrud.com) — sem cadastro, basta copiar o endpoint gerado.

### 2. Configurar variável de ambiente

Crie um arquivo `.env` na raiz (use `.env.example` como base):

```bash
cp .env.example .env
```

Edite o `.env`:
```
VITE_API_URL=https://crudcrud.com/api/SEU_ENDPOINT/livros
```

### 3. Instalar e rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

## 🧪 Testes

```bash
npm test
```

Para ver a cobertura:
```bash
npm test -- --coverage
```

## 🏗️ Build e deploy

```bash
npm run build
```

**Deploy no Vercel:** importe o repositório e adicione a variável de ambiente `VITE_API_URL` nas configurações do projeto.

## ⚠️ Observações

- O endpoint do CRUDCrud expira após 24h na versão gratuita — gere um novo quando necessário
- O arquivo `.env` nunca deve ser commitado (está no `.gitignore`)
- Use `.env.example` como referência para configuração
