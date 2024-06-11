const axios = require('axios');
const Post = require('../models/Post');

// Fonction pour créer une nouvelle publication
exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // Vérifier que l'utilisateur existe dans le `user-service`
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const newPost = new Post({ title, content, userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer toutes les publications
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer une publication par son ID

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id; 

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fonction pour mettre à jour une publication
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, userId } = req.body;

    // Vérifier que l'utilisateur existe dans le `user-service`
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content, userId }, { new: true }).populate('userId', 'username email');
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour supprimer une publication
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer les publications d'un utilisateur par son ID
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Vérifier que l'utilisateur existe dans le `user-service`
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    if (userResponse.status !== 200) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const posts = await Post.find({ userId }).populate('userId', 'username email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
