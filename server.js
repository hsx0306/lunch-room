const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));

function ensureFileExists() {
  const filePath = 'cnt.txt';
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // 파일이 없으면 생성
      fs.writeFileSync(filePath, '0', { flag: 'wx' }, (err) => {
        if (err) {
          console.error('Error creating cnt.txt:', err);
        }
      });
    }
  });
}

ensureFileExists();

app.post('/increment', (req, res) => {
  fs.readFile('cnt.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading cnt.txt');
      return;
    }

    const count = Number(data) || 0;
    const incremented = count + 1;

    fs.writeFile('cnt.txt', incremented.toString(), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing cnt.txt');
        return;
      }

      res.status(200).send('Counter incremented');
    });
  });
});

app.post('/decrement', (req, res) => {
    fs.readFile('cnt.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading cnt.txt');
        return;
      }
  
      const count = Number(data) || 0;
      const decremented = count - 1;
  
      fs.writeFile('cnt.txt', decremented.toString(), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing cnt.txt');
          return;
        }
  
        res.status(200).send('Counter decremented');
      });
    });
});  

app.get('/get-counter', (req, res) => {
    fs.readFile('cnt.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading cnt.txt');
        return;
      }
  
      res.status(200).send(data);
    });
});
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
