const { Model, DataTypes } = require("sequelize");

class Address extends Model {
    static init(sequelize){
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
        }, {
            sequelize
        });
    }

    // Necessário criar o relacionamento com a tabela Usuários
    static associate(models) {
        // belongsTo -> pertence a tabela X
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Address;