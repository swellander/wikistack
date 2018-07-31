const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

function slugify(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  slug: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

Page.beforeValidate(pageInstance => pageInstance.slug = slugify(pageInstance.title));
Page.afterUpdate(pageInstance => pageInstance.slug = slugify(pageInstance.title));

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  User,
  Page
}