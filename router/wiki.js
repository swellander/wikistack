const express = require('express');
const router = express.Router();
const { main, addPage, wikiPage, editPage } = require('../views');
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

router.get('/:slug/edit', (req, res, next) => {
  Page.findOne({ where: { slug: req.params.slug } })
    .then(page => {
      page.getAuthor()
        .then(author => res.send(editPage(page, author)))
        .catch(res.send);
    })
    .catch(res.send);
});

//TODO: model does not currently generate a new slug when page title is updated

router.post('/:slug', (req, res, next) => {
  const { author, email, title, content, status } = req.body;
  const { slug } = req.params;
  Page.update({
    title,
    content,
    status
  }, {
      where: { slug },
      returning: true,
      plain: true
    })
    .then(arr => res.json(arr[1]))
    .catch(res.send);
  // .then(arr => {
  //   const newPageObj = arr[1];
  //   User.findById(newPageObj.authorId)
  //     .then(author => res.r)
  // })
  // .catch(res.send);
})

module.exports = router;