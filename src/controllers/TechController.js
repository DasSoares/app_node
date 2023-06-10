const User = require("../models/User");
const Tech = require("../models/Tech");

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;
        
        const user = await User.findByPk(user_id, {
            include: { 
                association: 'techs', 
                // attributes: [um array das colunas que quer exibir],
                // through: { attributes: [] se o array estiver vazio, não trás nenhuma coluna da tabela pivo }
            }
        });
        
        return res.json(user.techs);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado'});
        }

        // Se não existe, então cria a tecnologia
        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        });

        await user.addTech(tech);

        return res.json(tech);
    },

    async destroy(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado'});
        }

        const tech = await Tech.findOne({
            where: { name }
        });

        await user.removeTech(tech);

        return res.status(204).json();
    }
};