const Express = require('express');
const fs = require('fs');
const path = require('path');
const Entry = require('./entry');
require('dotenv').config();

const app = new Express();

app.use('/materialize', Express.static(path.join(__dirname,
    'node_modules',
    'materialize-css',
    'dist')));

app.use('/media', Express.static(path.join(__dirname, 'media')));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  let query = req.query.dir;
  if (!query) query = '';

  const url = path.join(process.env.BASEPATH, query);
  const files = [];

  fs.readdir(url, async (err, filedata) => {
    console.log(filedata);
    for (const file of filedata) {
      if (fs.lstatSync(path.join(url, file)).isDirectory()) {
        files.push(new Entry(file, `?dir=${query}/${file}`, 'directory'));
        continue;
      }

      files.push(new Entry(file, path.join(url, file)));
    }

    return res.render('index', {files});
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server located at http://localhost:${process.env.PORT}`);
});
