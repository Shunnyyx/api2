const express = require('express');
const app = express();

app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
