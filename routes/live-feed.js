// const message = require('../discord-api/message')

// IN G-SHEETS SCRIPT
// on edit:
//  - update cell as last-update = new Date();
//  - read time, username, videolink cells last-update
//    - if cell.column in x: read cells for standard
//    - if cell.column in y: read cells for gravspeed
//  - if all update have been in last ~5mins send request
// req-data={surfType, map, user, time, videolink}
// todo: handle copy/past updates that update a set of cells at once....
//  - update cells in range as last-update = new Date();

// VALUES FROM G-SHEETS
// https://developers.google.com/apps-script/guides/triggers/events

// I need to send:
var fromGsheets = {
  surfType,
  map,
  user,
  time,
  videolink,
  prevRecordHolder
}

// step1: get row that edit happened
// step2: get table: gravspeed or standard
// step3: get all row cells for that table
// oldname, oldtime, vid, name, time, map

module.exports = async function (req, res) {
  console.log(
    '\n\ngot this\n\n',
    JSON.stringify(req.body, null, 2)
  );
  // take in values
  // format a message
  // plug that into a discord api - message function
  res.sendStatus(200);
}

// new <surfType> surf record by <user>!
// <time> on <map>
// <videolink>