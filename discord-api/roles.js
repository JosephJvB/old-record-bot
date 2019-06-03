const axios = require('axios');

module.exports = {
  addUserRole,
  removeUserRole
}

async function addUserRole(userID, roleID) {
  const {
    bot_token,
    discord_api,
    j_guild,
    joe,
    role
  } = process.env;

  await axios(`${discord_api}/guilds/${j_guild}/members/${joe}/roles/${role}`, {
    method: 'put',
    headers: {
    Authorization: `Bot ${bot_token}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('added role');
  return;
}
async function removeUserRole(userID, roleID) {
  const {
    bot_token,
    discord_api,
    j_guild,
    joe,
    role
  } = process.env;

  await axios(`${discord_api}/guilds/${j_guild}/members/${joe}/roles/${role}`, {
    method: 'delete',
    headers: {
    Authorization: `Bot ${bot_token}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('removed role');
  return;
}