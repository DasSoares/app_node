const { Model, DataTypes } = require("sequelize");

class Tech extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'techs', // forçando a dizer que nossa tabela se chama techs
        });
    }

    // Necessário criar o relacionamento com a tabela Usuários
    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users' });
    }
}

module.exports = Tech;