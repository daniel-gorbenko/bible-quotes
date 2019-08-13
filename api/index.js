let express = require('express');
let route = require('./route');

let app = express();

route(app);

app.listen(process.env.PORT, () => {
  console.log('API is listening on 8080 port');
});
