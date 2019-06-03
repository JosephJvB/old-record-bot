const { getIDCache, setIDCache } = require('../cache');
const { addUserRole, removeUserRole } = require('../discord-api/roles');
const { getUsersRoles } = require('../discord-api/users');

module.exports = async function handleUpdate (req, res) {
  let cache = getIDCache();

  console.log('\n\n--evt--', JSON.stringify(req.body, null, 2))
  // get points and name#id from gsheets
  // get roles from discord: from cache OR get all users and find user that matches name#id from gsheets
  // check that current roles are valid, update if needed.

  // I might also need to read the whole g-sheet to validate Top Surfer and rookie-surfers
  // that should come thru on the event object from g-sheet trigger...
  if(!cache['ayoitsjoe#3498']) {
    console.log('no joe')
    // case: new user, cache out of date
    await setIDCache();
    cache = getIDCache();
  }
  if(!cache['ayoitsjoe#3498']) {
    // case: g-sheet user not found in server - bad entry on g-sheet
    console.error('\n\nuser not found: ayoitsjoe#3498\n\n');
    res.sendStatus(400);
    return;
  }

  const roles = await getUsersRoles();
  if(roles.includes(process.env.role)) {
    await removeUserRole();
  } else {
    await addUserRole();
  }

  res.sendStatus(200);
  return;
}
