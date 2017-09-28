var express = require('express');
var path = require('path');
app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));
app.get('/showUsers', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+port);