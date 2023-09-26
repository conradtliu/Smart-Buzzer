exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
    
    // If no valid answer after timeout, dial all residents until someone picks up
  
    let dial = twiml.dial({timeout: 10});
    dial.number(context.<NAME>_PHONE); // RESIDENT NAME
    twiml.say({voice: 'Google.en-US-Standard-H'}, "Sorry,,, No one is available at this time. Please try again later.,,, Goodbye");
    twiml.redirect('/text-resident?Method=phone');
    callback(null, twiml)  
  }