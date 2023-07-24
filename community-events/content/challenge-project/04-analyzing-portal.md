# Exercício: Analizando o projeto `portal`

O `portal` do projeto Contoso Real Estate é uma simulação de uma imobiliária onde é possível visualizar os imóveis disponíveis para venda, alugar ou comprar. A arquitetura do projeto foi desenhada em componsable architecture.

Composable architecture é uma arquitetura de frontend que permite que você crie componentes reutilizáveis e componha-os para criar aplicativos maiores. Cada componente é responsável por uma funcionalidade específica e pode ser usado em qualquer lugar do aplicativo.

<!-- imagem: exemplo de composable architecture -->

## Arquitetura do projeto

O projeto Contoso Real Estate é composto por 3 partes principais:

- `portal`: é o projeto principal, onde contém a página inicial e os componentes que serão utilizados em todas as páginas.
- `blog`: é o projeto que contém o blog da imobiliária. Neste projeto, é utilizado o `Strapi` como CMS para gerenciar os posts do blog.
- `api`: é o projeto que contém as APIs que serão utilizadas no projeto `portal`.

<!-- gif contoso real state -->

### Componentes do `portal`

Este projeto foi desenvolvido utilizando Angular e você aprenderá da execução ao deploy utilizando o Azure Static Web Apps CLI no Codespaces.

Acessando a pasta `packages/portal/src/app` você verá os componentes que compõem o `portal`:

- `app`: componente principal da aplicação, responsável por renderizar os demais componentes.
  - `about`: página sobre
  - `authentication`: página de login (autenticação)
  - `checkoutpage`: página de checkout
  - `core`: componente responsável por gravar dados no browser (local storage)
  - `homepage`: página inicial
  - `profile`: página de perfil do usuário
  - `rentalpage`: página de aluguel
  - `searchpage`: página de busca
  - `shared`: pasta que contém os componentes de uso universal na aplicação, como por exemplo, botões, inputs, etc.
  - `tos`: responsável por padronizar todos os `TextBlockComponent`

<!-- imagem: print do vscode -->
<!-- por que falar sobre a configuração das variáveis de ambiente? -->

### Variáveis de ambiente

Dentro do projeto `portal`, podemos ver uma pasta chamada environments, onde contém os segredos de variáveis de ambiente para executar o projeto localmente ou em produção.

Por exemplo, observe o trecho abaixo:

<details><summary><b>environments/environmet.ts</b></summary>
<br/>

  ```ts
    export const environment = {
      production: false,
      blogUrl: 'http://localhost:3000',
      isCodespaces: process.env["CODESPACE_NAME"] ? true : false,
      strapiGraphQlUriInCodespace: `https://${process.env["CODESPACE_NAME"]}-1337.${process.env["GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"]}/graphql`,
      strapiGraphQlUriFallback: 'http://localhost:1337/graphql'
    };
  ```
</details>
<br/>

Como você pode perceber, o `portal` esta relacionado a outro cenário, que é o `Blog-CMS`. Neste cenário, é utilizado o `Strapi` como CMS para gerenciar os posts do blog, porém neste tutorial, focaremos apenas no `portal`.

No próximo exercício, você aprenderá como executar o projeto `portal` utilizando o Azure Static Web Apps CLI.