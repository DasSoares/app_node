const express = require("express");

const UserController = require("./controllers/UserController");
const AddressController = require("./controllers/AddressController");
const TechController = require("./controllers/TechController");
const ReportController = require("./controllers/ReportController");

const UserRouters = require("./routes/users");

const routes = express.Router();

// routes.get('/users', UserController.index);
// routes.get('/users/:user_id', UserController.get);
// routes.post('/users', UserController.store);
// routes.put('/users', UserController.update);
// routes.delete('/users/:user_id', UserController.destroy);

// padrão de criação Diego Fernandes da RocketSeat
routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.delete('/users/:user_id/techs', TechController.destroy);

routes.get('/report', ReportController.show)

module.exports = {
    routes,
    UserRouters
};
