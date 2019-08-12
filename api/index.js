let express = require('express');
let route = require('./route');

let app = express();

route(app);

app.listen(8080, () => {
  console.log('API is listening on 8080 port');
});
