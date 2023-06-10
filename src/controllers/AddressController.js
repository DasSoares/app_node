const User = require("../models/User");
const Address = require("../models/Address");

module.exports = {
    async index(req, res) {
        const { user_id } = req.params; // significa que estou pegando apenas o user_id de todos os parâmetros

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        });
        // retornando apenas o endereço
        // return res.json(user.addresses);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado com endereço salvo na base de dados.'});
        }
        return res.json(user);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id);

        if (!user){
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        });

        return res.json(address);
    }
};