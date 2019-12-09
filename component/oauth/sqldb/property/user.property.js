module.exports = (DataTypes) => ({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    first_name: DataTypes.STRING(100),
    last_name: DataTypes.STRING(100),
    email: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    password: DataTypes.STRING(100),
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
});
