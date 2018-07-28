const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./router');

//logging middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});





app.listen(port, () => console.log(`Listening on port ${port}`));