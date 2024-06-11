// middleware/routingMiddleware.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuration des routes et cibles pour les microservices
const services = [
  { route: '/users', target: 'http://localhost:3001' }, 
  { route: '/posts', target: 'http://localhost:3002' }, 
  { route: '/comments', target: 'http://localhost:3003' }, 
  { route: '/reactions', target: 'http://localhost:3004' } 
];

// Création des middlewares pour chaque route
const createServiceProxies = (app) => {
  services.forEach(({ route, target }) => {
    app.use(route, createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: '',
      },
    }));
  });
};

module.exports = createServiceProxies;
