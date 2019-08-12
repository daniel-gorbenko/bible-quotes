let BooksRepository = require('../repositories/books_repository');

class BooksController {
  constructor() {}

  get(request, response) {
    BooksRepository.getBooks()
      .then((books) => {
        response.send({success: true, data: books})
      });
  }

  getVerses(request, response) {
    BooksRepository.getVerses(request.params)
      .then((verses) => {
        response.send({success: true, data: verses})
      });
  }
}

module.exports = new BooksController();
