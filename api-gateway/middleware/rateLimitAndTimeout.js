// middleware/rateLimitAndTimeout.js
const rateLimit = 20; // Max de requêtes par minute
const interval = 60 * 1000; // Fenêtre temporelle en millisecondes (1 minute)
const requestCounts = {}; // Objet pour stocker les comptes de requêtes par adresse IP

// Réinitialise le compte de requêtes pour chaque adresse IP toutes les 'interval' millisecondes
setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, interval);

// Fonction middleware pour la limitation de débit et la gestion des délais d'attente
function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip; // Obtient l'adresse IP du client

  // Met à jour le compte de requêtes pour l'IP actuelle
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  // Vérifie si le compte de requêtes dépasse la limite de débit
  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  // Définit un délai d'attente pour chaque requête (exemple : 15 secondes)
  req.setTimeout(15000, () => {
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.abort(); // Abandonne la requête
  });

  next(); // Continue vers le prochain middleware
}

module.exports = rateLimitAndTimeout;
