# Exercise 2: Deploy on Azure Static Web App

In this exercise, you'll learn how to deploy the **Portal** project on Azure using the Azure Static Web Apps CLI and GitHub Actions.

Nesta etapa, você precisará utilizar a sua conta no Azure. Caso você não tenha uma conta, crie gratuitamente um [Azure Free Trial](https://azure.microsoft.com/free/) ou utilize o programa [GitHub Student Developer Pack — GitHub Education](https://education.github.com/pack).

## Como começar

Para fazer o deploy do cenário do portal, você precisará criar uma nova branch no seu repositório do GitHub. Para isso, execute os seguintes comandos no terminal do Codespaces:

```bash
  git checkout -b portal-deploy
``` 

Em sua nova branch, navegue até a pasta `packages/portal` utilizando o comando:

```bash
  cd packages/portal
```

Para que possamos fazer o deploy do `portal` de forma isolada, você precisará deletar a pasta `packages/portal/node_modules` e o `swa-cli.config.json`. Após isso, você precisará executar o comando `npm install` para que o npm possa instalar as dependências novamente. Para isso, execute os seguintes comandos:

```bash
  rm -rf node_modules
  rm -rf swa-cli.config.json
  npm install
```

Faça, também, a instalação do Azure Static Web Apps CLI como dependência de desenvolvimento, executando o comando:

```bash
  npm install -D @azure/static-web-apps-cli
```

## Configurando o Azure Static Web Apps CLI

Com as configurações iniciais concluídas, você precisará inicializar o Azure Static Web Apps para que possamos fazer o deploy do `portal` no Azure. Para isso, execute o comando:

```bash
  swa init
```

Você deverá realizar alguns ajustes na configuração do SWA, por isso, 


inicialize o swa

swa init

arrumar as informações

---

swa start

olha na aba de portas do visual studio code para 4280. abriu certo
não clique no open browser

---

criar os arquivos de artefatos

swa build

clica na pastinha dist

---

Vai para o portal do Azure e cria o passo a passo para um SWA, respeitando o caminho da pasta, configura o github





