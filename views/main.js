const html = require("html-template-tag");
const layout = require("./layout");


module.exports = (pages) => {
  return layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => `
        <a href="/wiki/${page.slug}">${page.title}</a> <br>
      `)}
    </ul>
  </ul>`)
};