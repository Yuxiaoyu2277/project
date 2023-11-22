const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// 移除 pre save 钩子中的 bcrypt 加密逻辑
// UserSchema.pre('save', function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = bcrypt.hashSync(this.password, 12);
//     next();
// });

module.exports = mongoose.model('User', UserSchema);