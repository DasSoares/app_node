const { NotFoundException } = require("../exceptions.js")
const User = require("../models/User");
const ErrorsController = require("./ErrorsController.js");
const { getErrors, printName } = ErrorsController;


module.exports = {
    // Todos os registros
    async index(req, res) {
        const users = await User.findAll();

        if (!users) {
            return res.status(404).json({status: false, message: "Registro não encontrado" });
        }

        return res.status(200).json({status: true, data: users});
    },

    // obtém o usuário
    async get(req, res) {
        // console.log("method request:", req.method);
        const { user_id } = req.params;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ status: false, message: "Usuário não encontrado" });
        }

        return res.status(200).json({ status: true, data: user });
    },

    // Cria novo registro
    async store(req, res) {
        const { name, email } = req.body;

        try {
            const user = await User.create({ name, email });
            return res.json(user);
        } catch (error) {
            const { status, errorMessage } = getErrors(error);
            return res.status(status).json({ status: false, message: errorMessage });
        }
    },

    async update(req, res) {
        const data = req.body;
        const where = new Object();

        for (let i in data) {
            if (data[i]) {
                where[i] = data[i];
            }
        }

        const user = await User.update({ id: data.id }, {
            where: where
        });

        if (!user) {
            return res.status(404).json({ status: false, message: "Não foi possível atualizar o usuário. Usuário não encontrado"});
        }

        return res.status(200).json({ status: true, message: "Registro atualizado com sucesso!"});
    },

    async destroy(req, res) {
        const { user_id } = req.params;

        const user = await User.destroy({
            where: {
                id: user_id
            }
        });

        if(!user){
            return res.status(404).json({ status: false, message: "Erro ao deletar o registro" })
        }

        return res.status(204);
    }
}