/**
 *  Callbox Routine
 * 
 *  This function should be used with a callbox that does not already support codes and requires manual approval.
 *  User can either speak or enter password.
 * 	If all else fails, call the resident(s) for entry like normal.
 */
exports.handler = function(context, event, callback) {

    let twiml = new Twilio.twiml.VoiceResponse();
    
     //Gather both speech and digit entry from user
    twiml.gather({
      action: `/door-open`,
      hints: context.PASSPHRASE,
      input: 'dtmf speech', //Prioritizes PIN over Speech, can be reversed
      numDigits: '4',
      speechTimeout: 'auto',
      profanityFilter: false,
      timeout: '5'
    })
      .say({voice: 'Google.en-US-Standard-H'}, 'Please enter your code now');  
  
    twiml.redirect('/call-resident');
    callback(null, twiml);  
  }