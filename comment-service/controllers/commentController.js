const axios = require('axios');
const Comment = require('../models/Comment');

// Fonction pour créer un nouveau commentaire
exports.createComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    // Vérifier que le post existe dans le `post-service`
    const postResponse = await axios.get(`http://localhost:3002/posts/${postId}`);
    if (postResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid postId' });
    }

    // Vérifier que l'utilisateur existe dans le `user-service`
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const newComment = new Comment({ postId, userId, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer tous les commentaires
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('postId').populate('userId', 'username email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer un commentaire par son ID
exports.getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId).populate('postId').populate('userId', 'username email');
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { postId, userId, content } = req.body;

    // Vérifier que le post existe dans le `post-service`
    const postResponse = await axios.get(`http://localhost:3002/posts/${postId}`);
    if (postResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid postId' });
    }

    // Vérifier que l'utilisateur existe dans le `user-service`
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { postId, userId, content }, { new: true }).populate('postId').populate('userId', 'username email');
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
