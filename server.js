const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const express = require('express'),
server = express();

// const handleUpdate = require('./routes/update-role');
// const { setIDCache } = require('./cache');
const handleLiveFeed = require('./routes/live-feed');

if(!process.env.bot_token) {
  loadSecretsDev();
}

server.use(helmet());
server.use(express.json());
// this was me doing roles stuff
// server.post('/update', handleUpdate);
server.post('/live-feed', handleLiveFeed)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Up on port:', PORT);
})

function loadSecretsDev() {
  const s = path.join(__dirname, 'secrets.json');
  if(fs.existsSync(s)) {
    const secrets = JSON.parse(fs.readFileSync(s));
    process.env = {
      ...process.env,
      ...secrets
    };
  } else {
    console.log('Yo, I\'m trying to read secrets and I cant find them');
  }
  return;
}