const express = require("express");
const { routes, UserRouters } = require("./routes");
const configServer = require("./config/server");
const cors = require("cors");

// É necessário importar o database, se não, não possível manipular dados do banco
require("./database")

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(UserRouters);

app.listen(configServer.port, configServer.host, function(){
    console.log(`Rodando servidor em ${configServer.host}:${configServer.port}`);
});
