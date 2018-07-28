const expect = require('chai').expect;
const { db, User, Page } = require('../db');

beforeEach(async () => {
  await db.sync({ force: true });
  await Page.create({
    title: 'Big North',
    content: 'This post is all about rough, wild nature. Berries. Lots of wild fruit and foiliage. Fallen trees and lichen schemes. Logging roads and hidden campsite toads. Late night tokes and existential croaks, with some good ol folks. Take me back, merge the two, let me and myself interact. Flow back, to the center. Stay here a while, learn from this mental mentor, not all bad is the side of me, suprised to be, so open, so raw. All those personal flaws may be universal, "AHHH", maybe for sure'
  });
  await User.create({
    name: 'John Dunn',
    email: 'jdizzle@slothsmile.com'
  });
})

describe('db', () => {
  it('exists', () => {
    expect(db).to.be.ok;
  });

  it('connects to postgres database', async () => {
    try {
      await db.authenticate();
      expect(true).to.be.true;
    } catch (err) {
      expect(false).to.be.true;
    }
  })

  it('has a User model', () => {
    expect(User).to.be.ok;
  });

  it('has a Page model', () => {
    expect(Page).to.be.ok;
  });

  //TODO: trim fat on this verbose test 
  //                                 V

  it('can add users to the db', async () => {
    const users = await User.findAll();
    const length = users.length;
    await User.create({
      name: 'sam',
      email: 'fakenames@hip.org'
    });
    const newUsers = await User.findAll();
    const newLength = newUsers.length;
    expect(length + 1).to.equal(newLength);
  });

  it('can add a page to db', () => {
    Page.findAll().then(arr => expect(arr.length).to.equal(1));
    Page.create({
      title: 'foo',
      content: 'bar'
    }).then(post => expect(post.title).to.eql('foo'));
  });
})