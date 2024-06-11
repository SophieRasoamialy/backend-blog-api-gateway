// server.js
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/postDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes de publication
app.use('/posts', postRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
