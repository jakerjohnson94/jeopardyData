const http = require('http');
const fs = require('fs');

const randomOffset = Math.floor(Math.random() * 18000) + 1;
const categoryURI = `http://jservice.io/api/categories?count=100&offset=${randomOffset}`;

http
  .get(categoryURI, resp => {
    let data = '';

    resp.on('data', chunk => {
      data += chunk;
    });

    resp.on('end', () => {
      fs.writeFileSync('categories.json', data);
    });
  })
  .on('error', err => {
    console.log('Error: ' + err.message);
  });
