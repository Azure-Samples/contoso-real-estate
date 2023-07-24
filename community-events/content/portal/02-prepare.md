# Prepare-se para o desafio

Você irá utilizar o GitHub Codespaces para trabalhar no projeto `portal` do Contoso Real Estate.

Um codespace é um ambiente de desenvolvimento que é hospedado na nuvem. Você pode personalizar seu projeto para o GitHub Codespaces configurando arquivos de contêiner de desenvolvimento para seu repositório (geralmente conhecido como Configuration-as-Code), o que cria uma configuração de codespace repetível para todos os usuários do seu projeto.

O projeto Contoso Real Estate é otimizado para uso com o GitHub Codespaces, um ambiente de desenvolvimento hospedado na nuvem do GitHub.

## Como começar

1. Para começar, você precisará de uma conta no GitHub. Se você não tiver uma conta, crie uma gratuitamente em [github.com](https://github.com/).

> [!NOTE]
> Estudantes podem reivindicar o GitHub Student Developer Pack em [GitHub Student Developer Pack - GitHub Education](https://education.github.com/pack). Esta oferta inclui acesso ao Codespaces, GitHub Copilot e Azure for Students e outros benefícios.

2. Ative o serviço [GitHub Codespaces](https://docs.github.com/en/codespaces) em sua conta do GitHub. O Codespaces oferece 60 horas de uso gratuito por mês.

3. Você precisará fazer uma cópia do repositório modelo em sua conta do GitHub. Para fazer isso, você precisará acessar o [repositório](https://github.com/Azure-Samples/contoso-real-estate) e `Fork`. No final do fork do repositório, você terá uma cópia do projeto em sua conta do GitHub. Você usará este repositório para desenvolver o hands-on.

4. Na página do repositório que foi criado, clique no botão `Code` e, na aba Codespaces, clique em `Create codespace on main`. Em alguns instantes, o Codespaces criará um ambiente de desenvolvimento para você.

5. Quando o Codespaces terminar de criar o ambiente de desenvolvimento, você verá uma janela do Visual Studio Code no navegador. Você pode usar o Visual Studio Code no navegador para desenvolver o aplicativo.

## Analizando o projeto `portal`

O `portal` do projeto Contoso Real Estate é uma simulação de uma imobiliária onde é possível visualizar os imóveis disponíveis para venda, alugar ou comprar. A arquitetura do projeto foi desenhada em componsable architecture.

Composable architecture é uma arquitetura de frontend que permite que você crie componentes reutilizáveis e componha-os para criar aplicativos maiores. Cada componente é responsável por uma funcionalidade específica e pode ser usado em qualquer lugar do aplicativo.

<!-- falar sobre o projeto real estate -->

<!-- Neste tutorial, vamos focar em dois aspectos do projeto `Contoso Real Estate`, o primeiro é o `Portal` e o segundo é o ```API```.

Este tutorial será dividido em duas partes:

<!-- incluir img 01 -->