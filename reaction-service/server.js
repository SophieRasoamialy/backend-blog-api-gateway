// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reactionRoutes = require('./routes/reactionRoutes');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/reactions', reactionRoutes);

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
