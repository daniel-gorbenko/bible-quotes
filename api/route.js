let cors = require('cors');

let BooksController = require('./controllers/books_controller.js');

module.exports = (app) => {
  app.use(cors());
  
  app.get('/books', BooksController.get);
  app.get('/books/:bookAbbrev/:topic/:verseStart-:verseEnd', BooksController.getVerses);
}
