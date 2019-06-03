const axios = require('axios');

module.exports = {
  getUsersRoles,
  getAllUsers
}

async function getUsersRoles () {
  const {
    bot_token,
    discord_api,
    j_guild,
    joe
  } = process.env;

  const resp = await axios(`${discord_api}/guilds/${j_guild}/members/${joe}`, {
    method: 'get',
    headers: {
    Authorization: `Bot ${bot_token}`,
      'Content-Type': 'application/json'
    }
  });

  return resp.data.roles;
}

async function getAllUsers () {
  const {
    bot_token,
    discord_api,
    j_guild,
  } = process.env;
  
  const resp = await axios(`${discord_api}/guilds/${j_guild}/members`, {
    method: 'get',
    headers: {
      Authorization: `Bot ${bot_token}`,
      'Content-Type': 'application/json'
    }
  });

  return resp.data;
}