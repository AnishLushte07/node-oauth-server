module.exports = (DataTypes) => ({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    deleted_by: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
});
