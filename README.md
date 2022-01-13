# anthorflix

## Como rodar o projeto
* npm install: instalar as dependências
* npm start: iniciar a aplicação

## Bugs Conhecidos
* Não encontrei

## Como você planejou abordar este projeto ? Que tecnologias foram utilizadas?
Eu não criei um plano de ação formal para este projeto. Porém eu fiz um mapa mental relacionando as dependências de cada feature e as construí por ordem de dependência.
Por exemplo: O primeiro requisito apresentado no teste é o CRUD de filmes, porém o CREATE, UPDATE e o DELETE precisam de autenticação então passei para o segundo requisito, Cadastro de usuários, e após isso fiz o Login.
Tecnologias utilizadas
* react-router-dom para roteamento
* MUI para utilização de alguns componentes

## Você acha algum dos requisitos ou funcionalidades difíceis em algum aspecto? Por quê?
As funcionalidades que eu tive mais problemas para desenvolver foram as que envolviam requisições por POST pois foi a primeira vez que criei esse tipo de requisição usando fetch em vez de usar o axios.

## Se você tivesse mais tempo para fazer o projeto o que faria de diferente?
* Em primeiro lugar teria efetuado os testes mais importantes
* Colocaria mais interação visual para o usuário. Nem todas as ações exibem carregamente ou informe de sucesso ou fracasso
* Implementaria o CRUD de Pessoa para poder navegar entre o elenco, diretores e roteiristas como no TMDB.
