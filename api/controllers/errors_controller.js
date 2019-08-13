class ErrorsController {
  constructor() {}

  handle(err, request, response, next) {
    response.send({success: false, error: err.message, data: null})
  }
}

module.exports = new ErrorsController();
