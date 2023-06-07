const express = require("express");

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ status: true, message: "Olá mundo!" });
});

module.exports = routes;
