const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

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

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

module.exports = {
  db,
  User,
  Page
}