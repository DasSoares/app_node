# Aplicação Node

## Técnologias utilizadas neste projeto

`yarn` : O Yarn é um gerenciado de pacotes para aplicar comandos ao código de uma aplicação. É uma ferramenta de código aberto (open source) e existe uma comunidade de colaboradores experientes e qualificados que contribuem no projeto. Considerado um sucessor mais eficaz e seguro do que o NPM.
<br>

`sequelize` : O Sequelize é um ORM (Object-Relational Mapper) para Node.js, que tem suporte aos bancos de dados PostgreSQL, MariaDB, MySQL, SQLite e MSSQL, como ORM ele faz o mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos Javascript.

Ele permite criar, buscar, alterar e remover dados do banco de dados utilizando métodos JS, além de permitir a modificação da estrutura das tabelas, com isso temos muita facilidade tanto na criação, população e migração de banco de dados.
<br>

`sequelize-cli` : O Sequelize possui um utilitário de linha de comando chamado Sequelize CLI que auxilia em diversas atividades ligadas aos models da nossa aplicação, incluindo funcionalidades para nos ajudar com migrations. Como eu queria que a gente começasse sem ele, só estou apresentando agora.

Esse utilitário permite que você gere automaticamente models, que você crie as tabelas no banco e que você crie e execute migrations automaticamente. Não vou conseguir aqui apresentar todo o potencial dele, mas vale uma estudada na documentação oficial. Vamos usá-lo via linha de comando para criar nossa primeira migration.
<br>

`express` : O Express é o framework Node mais popular e a biblioteca subjacente para uma série de outros frameworks do Node. O Express oferece soluções para:
* Gerenciar requisições de diferentes verbos HTTP em diferentes URLs.
* Integrar "view engines" para inserir dados nos templates.
* Definir as configurações comuns da aplicação web, como a porta a ser usada para conexão e a localização dos modelos que são usados para renderizar a resposta.
* Adicionar novos processos de requisição por meio de "middleware" em qualquer ponto da "fila" de requisições.


<br>

`nodemon` : O nodemon é um utilitário que monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node.js quando necessário. Assim, você não precisa parar e iniciar o servidor manualmente a cada modificação. O nodemon também pode executar scripts personalizados ou comandos específicos antes, ou depois do reinício.
<p>
É como se fosse um salvamento automático de jogos, que guarda o seu progresso sem interromper a sua jogatina.</p>


<hr>

## Comandos Yarn

Instalando `yarn` com npm, o comando a seguir, instala o yarn globalmente no node atual, caso esteja utilizando o `NVM` selecione a versão e instale.
```bash
npm install --global yarn
```
Após criar a pasta do projeto, inicie com o comando abaixo
```bash
yarn init -y
```

Adicionando dependencias no projeto
```bash
$: yarn add express mariadb sequelize
```
Caso queria instalar o mysql use o comando abaixo, em seguida, escolha a versão.
```bash
yarn add mysql2 -D
```

Instalando o Sequelize-cli que possui um utilitário de linhas de comandos que auxilia em diversas atividades ligadas aos modelos na nossa aplicação, incluindo funcionalidade de `migrations`
```bash
yarn add sequelize-cli -D
```

Instalando o nodemon. O Nodemon é o auto-refresh do servidor express
```bash
yarn add nodemon -D
```

<hr>

## Inicializando a aplicação
No arquivo `package.json` adicione no objeto uma chave chamada **scripts**
```javascript
"scripts": {
    "dev": "nodemon src/server.js"
},
```
Assim que o passo acima tenha sido feito, rode o comando abaixo, isso fará com que ele rode o nodemon junto
```bash
yarn dev
```
<br>
<hr>
<br>

## Configuração de arquivo do banco de dados

### Criando arquivo de configuração do banco de dados
Crie a pasta chamada de `src` na raiz do projeto, dentro dela, crie outra pasta chamada `config` e dentro dela, crie um arquivo javascript chamado `database.js` e faça a configuração dele como o exemplo abaixo:
```javascript
module.exports = {
    dialect: 'mysql',       // informe o banco de dados
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'sqlnode-rocketseat',
    define: {
        timestamps: true,   // 
        underscored: true,  // define as variaveis em snake case
    },
}
```
<br>

### Criando arquivo de conexão com banco de dados
Dentro da pasta `src`, crie uma pasta chamada `database` e dentro dela crie um arquivo chamado `index.js` e nesse arquivo faça a importação do arquivo de *configuração do banco*, exemplo abaixo:
```javascript
// conexão com banco de dados
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

module.exports = connection;
```

###  **Criando Banco de dados na base SQL**
<p>
Para criarmos o banco de dados na base de dados escolhida anteriormente
</p>

Na dentro da pasta `src`, crie a pasta chamada de `database` e crie um arquivo javascrip chamado `index.js`



```bash
yarn sequelize db:create
```

Criando arquivo de migração
```bash
yarn sequelize migration:create --name=create-nome_da_tabela
```

Migrando estrutura para o banco de dados
```ps
yarn sequelize db:migrate
```

Desfazer ultima migrate, em caso de alteração de campos da tabela e já estar em produção **Nunca o utilize**
```bash
yarn sequelize db:migrate:undo
```

Para alteração de campos de uma tabela que já esteja em produção, crie uma nova migration com a alteração, isso vale para adição de novos campos
```bash
yarn migrate migration:create --name=add-age-field-to-users
```

## Configuração do **.sequelizerc**