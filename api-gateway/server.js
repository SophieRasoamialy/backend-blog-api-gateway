const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimitAndTimeout = require("./middleware/rateLimitAndTimeout");
const createServiceProxies = require("./middleware/routingMiddleware");
const loggingMiddleware = require("./middleware/loggingMiddleware");

const app = express();

app.use(cors()); 
app.use(helmet());
app.use(loggingMiddleware); 
app.disable("x-powered-by"); 

app.use(rateLimitAndTimeout);

createServiceProxies(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
