# Exercício: Trabalhando com Azure Static Web App CLI

<!-- explicação breve de intro -->

## O que é o Azure Static Web App CLI?

O [Azure Static Web Apps (SWA) CLI](https://github.com/Azure/static-web-apps-cli) é uma ferramenta de linha de comando de código aberto que simplifica o desenvolvimento e a implantação local para o Azure Static Web Apps. Ele permite que você execute seu aplicativo localmente ou em um dev container, que neste caso é o GitHub Codespace e, em seguida, implante seu aplicativo em um ambiente de produção com apenas um comando.

## Como funciona a comunicação entre frontend e backend?

A estrutura padrão de comunicação entre frontend e backend em um projeto Angular é através de um `services.ts`. No projeto `portal` do projeto Contoso Real Estate, a comunicação é feita através do Azure Static Web App CLI.

As configurações dessa comunicação é feita através de um arquivo chamado `swa-cli.config.json`, que será executado quando a rota for chamada.

<details><summary><b>packages/portal/swa-cli.config.json</b></summary>
<br/>

  ```json
    {
      "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
      "configurations": {
        "contoso-real-estate": {
          "appLocation": ".",
          "apiLocation": "../api",
          "outputLocation": "dist/contoso-app",
          "appBuildCommand": "npm run build",
          "apiBuildCommand": "npm run build",
          "run": "npm start",
          "appDevserverUrl": "http://localhost:4200",
          "apiDevserverUrl": "http://127.0.01:7071"
        }
      }
    }
  ```
</details>
<br/>

Observe as propriedades `appDevserverUrl` e `apiDevserverUrl`, onde contém o caminho para o frontend e backend respectivamente. Já a propriedade `apiLocation` contém o caminho para o projeto `API`, que foi abordado no primeiro exercício deste tutorial.

## Como executar o projeto `portal`?

Não recomendamos executar este projeto localmente, pois ele requer uma série de configurações para funcionar. Para otimizar o seu aprendizado, recomendamos a utilização do [Codespaces](https://github.com/features/codespaces), que irá criar um container de desenvolvimento para você. E o melho de tudo: sem você precisar instalar nada na sua máquina.

> O Codespaces oferecer 60 horas gratuitas de uso por mês. Após este período, será cobrado um valor por hora de uso. Para saber mais, acesse [Codespaces](https://github.com/features/codespaces).

Para executar o projeto, siga os passos abaixo:

1. Você deverá fazer uma cópia deste repositório para o seu GitHub. Para isso, você deverá acessar o [repositório](https://github.com/Azure-Samples/contoso-real-estate) e fazer um `Fork`. Ao finalizar o fork do repositório, você terá uma cópia do repositório modelo em sua conta do GitHub.

2. Na página do repositório que foi criado, clique no botão `Code` e, na aba Codespaces, clique em `Create codespace on main`. Em alguns instantes, o Codespaces criará um ambiente de desenvolvimento para você.

3. Quando o Codespaces terminar de criar o ambiente de desenvolvimento, você verá uma janela do Visual Studio Code no navegador. Você pode usar o Visual Studio Code no navegador para desenvolver o aplicativo.

4. Como todos os cenários do projeto estão acoplados, para que possamos visualizar o que foi criado no portal, será necessário executar os seguintes passos:
  - Abra o terminal do Visual Studio Code e, na raiz do projeto Contoso, execute o comando `npm install && npm start` para instalar as dependências do projeto.

  > _Nota: Codespaces irá mostrar uma série de janelas no lado direito da tela enquanto inicia todos os servidores. Isso é normal e esperado._

5. Uma vez que todos os servidores de desenvolvimento tenham iniciado, os seguintes URLs estarão disponíveis:

| Application    | URL                                                      | Port |
| -------------- | -------------------------------------------------------- | ---- |
| Portal         | https://YOUR-REPO-4280.preview.app.github.dev:4280       | 4280 |
| Blog           | https://YOUR-REPO-3000.preview.app.github.dev:3000       | 3000 |
| Strapi CMS     | https://YOUR-REPO-1337.preview.app.github.dev:1337/admin | 1337 |
| Serverless API | https://YOUR-REPO-7071.preview.app.github.dev:7071/api/  | 7071 |
| Stripe API     | https://YOUR-REPO-4242.preview.app.github.dev:4242       | 4242 |

> _Nota: As URLs acima são apenas exemplos. As URLs serão diferentes para o seu fork. As portas, no entanto, serão as mesmas._

6. Para visualizar o projeto, acesse a aba `Portas` do terminal e clique no link do portal, que será a porta `4280` (porta padrão do ASWA), para ver página inicial do portal.

<!-- imagem: portas do terminal -->

<!-- mencionar a possibilidade de acesso a URL para testar -->

### Entendendo a execução

Como explicado no item anterior, o projeto Contoso foi desenvolvido em um modelo `composable architecture`, ou seja, ele é composto por vários componentes, onde cada componente é responsável por uma funcionalidade específica. **Por este motivo, a execução deste projeto é acoplado.**

Como podemos observar isso?

Abra o arquivo package.json da raiz do projeto Contoso e observe o trecho scripts abaixo:

<details><summary><b>package.json</b></summary><br/>

  ```json
    "scripts": {
      "start": "concurrently npm:start:* --kill-others",
      "start:services": "docker compose up",
      "start:api": "npm run start --workspace=api",
      "start:website": "npm run start:swa --workspace=portal",
      "test": "npm run test -ws --if-present",
      "build": "npm run build -ws --if-present",
      "format": "prettier --write .",
      "format:check": "prettier --check .",
      "lint": "npm run lint -ws --if-present",
      "lint:fix": "npm run lint:fix -ws --if-present",
      "clean": "rimraf \"packages/**/*.tsbuildinfo\"",
      "clean:install": "rimraf \"packages/**/node_modules\" \"node_modules\" && npm install"
    }
  ```
</details>
<br/>

Observe os scripts:

**Docker compose**

```json
  "start:services": "docker compose up"
```

Responsável por subir os serviços do docker, que são: Strapi CMS e Stripe API. Além disso, este `docker compose` está configurando para subir o banco de dados Azure Database for PostgreSQL do Strapi CMS e o Stripe API e, na API, está configurado para subir o banco de dados Azure Cosmos DB integrado com o MongoDB.


**API**
```json
  "start:api": "npm run start --workspace=api"
```

Responsável por exercutar o projeto API. 

**Portal**
```json
  "start:website": "npm run start:swa --workspace=portal"
```

Responsável por executar o projeto Portal.

#### Reverse Proxy

Este é o coração do SWA CLI. Ele intercepta e encaminha as solicitações HTTP para os componentes certos com base no propósito:

- /.auth/** requests => forwarded to the Auth emulator server.
- /api/** requests => forwarded to localhost functions (if present).
- /** => all other requests forwarded to the static assets content server.

<!-- incluir a fotinha do SWA CLI -->

<!-- https://azure.github.io/static-web-apps-cli/docs/intro/ -->

No próximo exercício, você aprenderá a fazer deploy do projeto `portal` no Azure utilizando o Azure Static Web Apps CLI.

<!--
## Conclusão: Portal

Neste tutorial, aprendemos como executar o projeto Contoso Real Estate utilizando o Codespaces. Além disso, detalhamos como funciona a arquitetura `composable archicture` do projeto Portal, onde cada componente é responsável por uma funcionalidade específica. E, por fim, aprendemos como funciona a comunicação entre frontend e backend utilizando o Azure Static Web Apps CLI, para execução do projeto Contoso Real Estate.

No próximo tutorial, iremos aprender como executar o projeto API, usando o Azure Functions (V4 Programming Model) e conectado ao Azure Cosmos DB (MongoDB API) para execução do backend do projeto Contoso Real Estate.

| **[Next: Session 02 ➡️](./02-api.md)**
-->