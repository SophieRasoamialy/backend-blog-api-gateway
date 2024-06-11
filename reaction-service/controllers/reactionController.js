const Reaction = require('../models/Reaction');
const axios = require('axios');

// Fonction pour créer une nouvelle réaction
exports.createReaction = async (req, res) => {
  try {
    const { postId, userId, type } = req.body;

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

    // Vérifier que le type de réaction est valide
    if (type !== 'like' && type !== 'dislike') {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    // Créer une nouvelle réaction
    const newReaction = new Reaction({ postId, userId, type });
    await newReaction.save();

    // Renvoyer une réponse avec un code d'état 201 (Created) et la nouvelle réaction
    res.status(201).json(newReaction);
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse avec un code d'état 500 (Internal Server Error) et un message d'erreur
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer toutes les réactions
exports.getAllReactions = async (req, res) => {
  try {
    const reactions = await Reaction.find();
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer une réaction par son ID
exports.getReactionById = async (req, res) => {
  try {
    const reactionId = req.params.id;
    const reaction = await Reaction.findById(reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json(reaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour une réaction
exports.updateReaction = async (req, res) => {
  try {
    const reactionId = req.params.id;
    const { postId, userId, type } = req.body;

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

    // Vérifier que le type de réaction est valide
    if (type !== 'like' && type !== 'dislike') {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    // Mettre à jour la réaction
    const updatedReaction = await Reaction.findByIdAndUpdate(reactionId, { postId, userId, type }, { new: true });
    if (!updatedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json(updatedReaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour supprimer une réaction
exports.deleteReaction = async (req, res) => {
  try {
    const reactionId = req.params.id;
    const deletedReaction = await Reaction.findByIdAndDelete(reactionId);
    if (!deletedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
