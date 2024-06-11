const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Créer un nouveau commentaire
router.post('/', commentController.createComment);

// Récupérer tous les commentaires
router.get('/', commentController.getAllComments);

// Récupérer un commentaire par son ID
router.get('/:id', commentController.getCommentById);

// Mettre à jour un commentaire
router.put('/:id', commentController.updateComment);

// Supprimer un commentaire
router.delete('/:id', commentController.deleteComment);

module.exports = router;
