const User = require("../models/User");

module.exports = {
    // Todos os registros
    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },

    // obtém o usuário
    async get(req, res) {
        console.log("method request:", req.method);
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
        const user = await User.create({ name, email });
        return res.json(user);
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