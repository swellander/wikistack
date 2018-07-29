const express = require('express');
const router = express.Router();
const { main, addPage, wikiPage } = require('../views');
const { Page, User } = require('../db');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  Page.findAll()
    .then(pages => res.send(main(pages)))
    .catch(err => next(err));
});

router.post('/', async (req, res) => {

  //insert into db
  const { title, content, author, email } = req.body;
  const page = await Page.create({ title, content });
  const [user] = await User.findOrCreate({
    where: {
      name: author,
      email
    }
  });

  page.setAuthor(user);
  page.save();

  //redirect to page of new post
  res.redirect(`/wiki/${page.slug}`);

});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    const author = await User.findOne({ where: { id: page.authorId } });
    res.send(wikiPage(page, author));
  } catch (err) {
    next(err);
  }

});

module.exports = router;