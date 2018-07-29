const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./router');
const { db, Page, User } = require('./db');

//logging middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', routes.wiki);
app.use('/users', routes.users);


app.get('/', (req, res) => {
  res.redirect('/wiki');
})

const seedPage = {
  title: 'Big North',
  content: 'This Page is all about rough, wild nature. Berries. Lots of wild fruit and foiliage. Fallen trees and lichen schemes. Logging roads and hidden campsite toads. Late night tokes and existential croaks, with some good ol folks. Take me back, merge the two, let me and myself interact. Flow back, to the center. Stay here a while, learn from this mental mentor, not all bad is the side of me, suprised to be, so open, so raw. All those personal flaws may be universal, "AHHH", maybe for sure'
};

const seedUser = {
  name: 'John Dunn',
  email: 'jdizzle@slothsmile.com'
};

//init server and db
const init = async () => {
  await db.sync({ force: true });
  const page = await Page.create(seedPage);
  const user = await User.create(seedUser);
  page.setAuthor(user);
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

init();
