const User = require('./User');
const Hotdog = require('./Hotdog');

User.hasMany(Hotdog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Hotdog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Hotdog };