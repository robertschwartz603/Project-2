const User = require('./user');
const Hotdog = require('./hotdog');

User.hasMany(Hotdog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Hotdog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Hotdog };