module.exports = (DataTypes) => ({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    client_id: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    client_secret: DataTypes.STRING,
    authorized_grant_types: DataTypes.STRING,
    redirect_uri: DataTypes.STRING,
    scope: DataTypes.STRING,
    access_token_validity: DataTypes.INTEGER,
    refresh_token_validity: DataTypes.INTEGER,
});
