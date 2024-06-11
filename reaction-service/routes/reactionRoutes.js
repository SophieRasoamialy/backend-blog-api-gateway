const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

router.post('/', reactionController.createReaction);
router.get('/', reactionController.getAllReactions);
router.get('/:id', reactionController.getReactionById);
router.put('/:id', reactionController.updateReaction);
router.delete('/:id', reactionController.deleteReaction);

module.exports = router;
