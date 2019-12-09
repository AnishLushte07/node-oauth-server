module.exports = (DataTypes) => ({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    refresh_token: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    expires_on: DataTypes.DATE,
});
