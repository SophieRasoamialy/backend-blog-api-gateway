const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  createdAt: { type: Date, default: Date.now }, // Ajoute un timestamp de création
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
