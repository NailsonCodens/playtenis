

<h1 align="center">
   Api PlayTenis
</h1>

Esta é uma api desenvolvida com as tecnologias para o backend de um aplicativo de controle de jogos e quadras de tenis.

![Code Style](https://img.shields.io/static/v1?style=flat-square&logo=codecov&logoColor=&label=Codecov&message=65%&color=d3d62a) ![Test](https://img.shields.io/static/v1?style=flat-square&logo=vitest&logoColor=white&label=Tested%20Vitest&message=29.4.1&color=6E9610) ![Package Manager](https://img.shields.io/static/v1?style=flat-square&logo=yarn&logoColor=white&label=Yarn&message=1.22.19&color=2A87B1) ![Code Style](https://img.shields.io/static/v1?style=flat-square&logo=prettier&logoColor=white&label=Code%20Style%20Prettier&message=2.7.1&color=EAB13B)![Code Fix](https://img.shields.io/static/v1?style=flat-square&logo=eslint&logoColor=white&label=Code%20Style%20Prettier&message=8.0.1&color=472FB9) ![Doc Api](https://img.shields.io/static/v1?style=flat-square&logo=swagger&logoColor=white&label=Documentaçao%20Api&message=Swagger&color=85EA2D)

## Como funciona?
A api PlayTenis gerencia os dados que trafegam no aplicativo. Quadras, jogadores, modalidades de jogos, estatus dos jogos no momento, interdição de jogos e muito mais.

## Tecnologias utilizadas
O projeto foi desenvolvido usando as linguagens e ferramentas abaixo.

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Ngix](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) ![PostGreSql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Como baixar o projeto usando Docker

```bash

    # Clonar o repositório
    $ git clone https://github.com/NailsonCodens/playtenis

    # Entrar no diretório
    $ cd playtenis

    # Rodar Docker
    $ docker-compose up 

    #rodando as migrations do banco de dados
    $ yarn migrations
```

## Como baixar o projeto localmente SEM Docker

```bash

    # Clonar o repositório
    $ git clone https://github.com/NailsonCodens/playtenis

    # Entrar no diretório
    $ cd playtenis

    # Instalar dependências
    $ yarn install

    #rodando as migrations do banco de dados
    $ yarn migrations

    # Iniciar projet
    $ yarn dev
```

## Funcionalidades
###### Coachs - Professores
- [x] Cadastro
- [x] Listagem
- [x] Atualização
- [x] Deleção
###### Courts - Quadras
- [x] Cadastro
- [x] Listagem
- [x] Atualização
- [x] Deleção
###### Modality - Modalidade
- [x] Cadastro
- [x] Listagem
- [x] Atualização
- [x] Deleção
###### Members - Membros associados
- [x] Cadastro
- [x] Listagem
- [x] Atualização
- [x] Deleção
- [x] Buscar dependentes pelo associado
###### Dependents - Dependentes dos associados
- [x] Cadastro
- [x] Listagem
- [x] Atualização
- [x] Deleção
- [x] Associação ao sócio  
###### Games - Jogos
- [x] Cadastro
- [x] Finalizar um jogo
- [x] Deletar um jogo
- [x] Ver jogo atual pela quadra
###### Queue - Fila de espera
- [x] Cadastro
- [x] Alterar status quando a fila de espera for para jogo.
- [x] Deletar a fila de espera
- [x] Buscar fila de espera por jogadores
- [x] Buscar fila de espera por id

## Acessando o projeto:
```bash
    $ https://localhost:3000
```

## Print Insominia
<img title="a title" alt="Alt text" src="https://github.com/NailsonCodens/playtenis/blob/main/prints/print-insominia.jpeg?raw=true">


## Print Documentação api Swagger
<img title="a title" alt="Alt text" src="https://github.com/NailsonCodens/playtenis/blob/main/prints/9b370146-13ab-4293-a849-240735206c8e.png?raw=true">

</br></br></br>
<p align="center">
  Desenvolvido por Nailson Israel
</p>
