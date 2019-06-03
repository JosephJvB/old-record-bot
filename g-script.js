// TODO: live
// update to surf-webhook url for live
var HOOK = 'lol';
var STD = ['A', 'D'];
var GRAV = ['F', 'I'];
var HEAD = 1; // TODO: live = 6

var newNote = JSON.stringify({
  vidUpdated: false,
  timeUpdated: false,
  oldName: null,
  oldTime: null
})


function customOnEdit(e) {
  // which cell was edited?
  // TODO: early return if editing something outside of range
  var cellColInt = e.range.getColumn();
  var cellColChar = String.fromCharCode(65 + cellColInt - 1);
  var cellRow = e.range.getRow();
  // what 'surfType'table and what column was edited?
  var surfType = cellColInt > 4 ? 'Gravspeed' : 'Standard';
  var TBL = cellColInt > 4 ? GRAV : STD;
  var tableRowRange = e.source.getRange(TBL[0]+cellRow+':'+TBL[1]+cellRow);
  var rowNoteJson = JSON.parse(tableRowRange.getNote() || newNote);
  var cellColHeaderLwr = e.source.getRange(cellColChar + '1').getValue().toLowerCase();

  // update note based on which column was edited.
  switch(cellColHeaderLwr) {
    // update cases if header columns change
    case 'name': { rowNoteJson.oldName = e.oldValue; }
      break;
    case 'time': { rowNoteJson.timeUpdated = true; rowNoteJson.oldTime = e.oldValue; }
      break;
    case 'video link': { rowNoteJson.vidUpdated = true; }
      break;
    default: break;
  }
  
  // if have new vid and time, is new record : update live feed
  var noteComplete = rowNoteJson.timeUpdated && rowNoteJson.vidUpdated;
  if(!noteComplete) {
    tableRowRange.setNote(JSON.stringify(rowNoteJson));
    return;
  } else {
    tableRowRange.clearNote();
    const [mapName, time, name, vid] = tableRowRange.getValues()[0];

    // construct data to send
    const feedData = {
      surfType: surfType,
      mapName: mapName,
      oldName: rowNoteJson.oldName || name, // if no name was set, assume user beat their own record
      oldTime: rowNoteJson.oldTime,
      name: name,
      time: time,
      vid: vid
    };

    var res = updateLiveFeed(feedData);
    var resCode = res.getResponseCode();
    Logger.log(res.getContentText())
    if (resCode !== 200) {
      Logger.log('\nERROR: code[' + resCode + ']\n@ ' + URL);
      //TODO: send a request to send me and email or a discord message or log to Heroku server
    }
    
    tableRowRange.clearNote();
    return;
  }
}

function updateLiveFeed(d) {
  //https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html
  var msg = {
    content: 'New world record!\n'+d.vid+'\n',
    embeds: [{
      title: d.surfType+' Surf Record',
      //description: '',
      fields: [
        {
          name: 'User',
          value: d.name,
          inline: true
        },
        {
          name: 'Time',
          value: d.time+'s',
          inline: true
        },
        {
          name: 'Map',
          value: d.mapName,
          inline: true
        },
        {
          name: 'Prev record',
          value: d.oldTime+'s by '+d.oldName,
          inline: true
        }
      ],
      // video: { url: d.vid }
    }]
  };

  return UrlFetchApp.fetch(HOOK, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    payload: JSON.stringify(msg),
    muteHttpExceptions: true
 })
}