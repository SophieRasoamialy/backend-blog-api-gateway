// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route pour créer une nouvelle publication
router.post('/', postController.createPost);

// Route pour récupérer toutes les publications
router.get('/', postController.getAllPosts);

// Route pour récupérer une publication par son ID
router.get('/:id', postController.getPostById);

// Route pour mettre à jour une publication
router.put('/:id', postController.updatePost);

// Route pour supprimer une publication
router.delete('/:id', postController.deletePost);

// Route pour récupérer les publications d'un utilisateur par son ID
router.get('/user/:userId', postController.getPostsByUser);

module.exports = router;

