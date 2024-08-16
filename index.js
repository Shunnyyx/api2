const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/cat', require('./api/cat'));
app.use('/api/dog', require('./api/dog'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
