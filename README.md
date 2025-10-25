# Calculadora do Primeiro Milhão - Frontend

Esta é a interface do usuário para a aplicação "Calculadora do Primeiro Milhão", construída com Next.js e Tailwind CSS. A aplicação oferece uma experiência de usuário moderna e engajadora para simular investimentos de longo prazo.

## ✨ Features

-   **Landing Page (Hero Section):** Uma página inicial moderna e profissional que apresenta a proposta de valor da ferramenta.
-   **Autenticação de Usuário:** Formulários de cadastro e login com feedback visual e tratamento de erros.
-   **Gerenciamento de Sessão Global:** Utiliza o Contexto do React para gerenciar o estado de autenticação em toda a aplicação, permitindo login automático e proteção de rotas.
-   **Calculadora Interativa:** Interface limpa para inserir os parâmetros do investimento e visualizar os resultados.
-   **Visualização de Resultados:** Apresenta um resumo claro e imediato do resultado da simulação, além de uma tabela detalhada com scroll para a projeção mês a mês.
-   **Página de Histórico:** Permite que o usuário exclua suas simulações salvas.

## 🛠️ Stack Utilizada

-   **Framework:** [Next.js](https://nextjs.org/) (com App Router)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes de UI:** [shadcn/ui](https://ui.shadcn.com/)
-   **Gráficos:** [Recharts](https://recharts.org/)

## 🚀 Como Configurar e Rodar Localmente

Siga as instruções abaixo para configurar e executar o frontend em seu ambiente de desenvolvimento.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (v18 ou superior)
-   **A API Backend deve estar rodando localmente** em `http://localhost:3333`.

### 1. Clonar o Repositório

```bash
git clone https://github.com/Gabriel-Gravena/calculadora-primeiro-milhao.git
cd calculadora-primeiro-milhao
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto. Este arquivo conterá a URL da sua API backend.

```env
# .env.local

# URL da API backend rodando localmente
NEXT_PUBLIC_API_URL=http://localhost:3333
```
**Importante:** O prefixo `NEXT_PUBLIC_` é obrigatório para que o Next.js exponha esta variável ao código que roda no navegador.

### 4. Iniciar a Aplicação

Certifique-se de que a API backend já esteja em execução e então inicie o servidor de desenvolvimento do frontend.

```bash
npm run dev
```

🎉 A aplicação estará acessível em `http://localhost:3000`.
