const { getAllUsers } = require('./discord-api/users')

// im trying to be cute with this one for sure.
let cache = {};

module.exports = {
  getIDCache: () => cache,
  setIDCache
}

async function setIDCache () {

  const userData = await getAllUsers();

  for(let d of userData) {
    const { id, username, discriminator } = d.user;
    cache[`${username}#${discriminator}`] = id;
  }

  return;
}