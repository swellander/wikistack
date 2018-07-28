const express = require('express');
const router = express.Router();
const { main, addPage } = require('../views');
const { Page } = require('../db');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  Page.findAll()
    .then(pages => res.send(main(pages)))
    .catch(err => next(err));
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  Page.create({
    title,
    content
  }).then(res.redirect('/'))
    .catch(console.log);
})

router.get('/add', (req, res) => {
  res.send(addPage());
})

module.exports = router;