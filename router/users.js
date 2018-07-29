const express = require('express');
const router = express.Router();
const { User, Page } = require('../db');
const { userList, userPages } = require('../views');

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(userList(users)))
    .catch(next);
});

router.get('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const pages = await Page.findAll({ where: { authorId: user.id } })
  res.send(userPages(user, pages));
})

module.exports = router;