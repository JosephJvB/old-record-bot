# surf-bot

I wonder how old mate is hosting his node-bot

Try in order:
1. Alter script to read formula updates
	- NOPE: formula updates data is not readable at the time of edit
2. onFormSubmit
3. inside the formula??

Wait hang on: Maybe all we need to change is the way the event looks ay.
- assumption: my script was shitting itself because it was receiving multiple values at once
	- updating multiple cells at once
- if I can just alter my script so instead of saving shit to notes (scuffed)
- it can just read all oldValues, all values (new) and send those away to webhook

https://docs.google.com/forms/d/e/1FAIpQLSd_h4qvtoh9qgQ7wKzndPXkoyx4ua0c8dpGuTWcoI11S8gTgg/viewform
- So you submit google form, it goes into record log sheet, some formula runs & updates leaderboard.

### Plan 1: Form onSubmit. More knowns
- what map is user submitting?
- Find the current record value in Leaderboard sheet
- if user submitted time is lower: ping webhook with data

### Plan 2: On record-log-update formula. More unknowns
- I have no idea what formula is updating the leaderboard, but surely it must be able to look at both old and new values. If i can add a script there, all the hard work is done ay?
- Need to find where that forumla is, who wrote it, and what I can do with it..


So bad news: adding the script on edit for Leaderboard page was bad.
Leaderboard page is updated by another sheets-formula, not by a human.
Something about readonly/edit modes too? Im sure I wouldnt have touched that, I was only ever on the leaderboard sheet and I edited...Maybe a manual edit 'opens' the page? I have no idea.