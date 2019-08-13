let BooksRepository = require('../repositories/books_repository');

class BooksController {
  constructor() {}

  get(request, response, next) {
    BooksRepository.getBooks()
      .then((books) => {
        response.send({success: true, data: books})
      })
      .catch((err) => next(err));
  }

  getVerses(request, response, next) {
    BooksRepository.getVerses(request.params)
      .then((verses) => {
        // setTimeout(() => {
          response.send({success: true, data: verses})
        // }, 1000);
      })
      .catch((err) => next(err));
  }
}

module.exports = new BooksController();
