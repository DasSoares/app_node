/**
 * Pesquisar como separar as rotas e depois unificar em um arquivo só em 'routes.js'.
 */

const express = require("express");
const UserController = require("../controllers/UserController");

const usersRoutes = express.Router();

usersRoutes.get('/users', UserController.index);
usersRoutes.get('/users/:user_id', UserController.get);
usersRoutes.post('/users', UserController.store);
usersRoutes.put('/users', UserController.update);
usersRoutes.delete('/users/:user_id', UserController.destroy);

module.exports = usersRoutes;