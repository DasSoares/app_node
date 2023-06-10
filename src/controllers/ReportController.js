const { Op, where } = require("sequelize");
const User = require("../models/User");

module.exports = {
    async show(req, res) {
        // Encontrar todos os usuários que terminam com @rocketsear.com.br
        // Desses usuários eu quero buscar todos que moram na rua "Rua Guilherme Gembala"
        // Desses usuários que eu buscar as tecnologis que comecam com React
        const includes = new Array();
        const { nameTech, street } = req.body;
        
        if (nameTech) {
            includes.push({
                association: 'techs',
                where: {
                    name: {
                        [Op.like]: `${nameTech}%`
                    }
                }
            })
        }

        if (street){
            includes.push({ 
                association: 'addresses', 
                where: {
                    street: {
                        [Op.like]: `%${street}%`
                    }
                }
            });
        }

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    // [Op.iLike]: '%@rocketseat.com.br', // -> Seria utilizado para o banco de dados Postgresql
                    [Op.like]: '%@gmail.com'
                }
            },
            // relacionamentos
            include: includes
        });
        
        return res.json(users);
    }
}