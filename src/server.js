const express = require("express");
const routes = require("./routes");
const configServer = require("./config/server");

// É necessário importar o database, se não, não possível manipular dados do banco
require("./database")

const app = express();

app.use(express.json());
app.use(routes);

app.listen(configServer.port, configServer.host, function(){
    console.log(`Rodando servidor em ${configServer.host}:${configServer.port}`);
});
