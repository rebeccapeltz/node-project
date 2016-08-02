'use strict';
const app = require('./server');

app.listen(process.env.PORT || 3000, () => {
  console.log('up on '+ (process.env.PORT || 3000));
});
