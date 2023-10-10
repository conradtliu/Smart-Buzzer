exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
  
    // Spoken Case: Get rid of random non-alphabetical chars and put to lower case
    let cleanString;
    let cleanSpeechResult;
    let confidence = 0;
    let isVoice = false;
    if(event.SpeechResult){
        cleanString = event.SpeechResult.replace(/[^\w\s]|_/g, "");
        cleanSpeechResult = cleanString.toLowerCase();
        confidence = event.Confidence;
        isVoice = true;
    }  

  
  // Check to see if any case returns true for spoken or entered values.
    function validBuzzer(){
        if(cleanSpeechResult && cleanSpeechResult !== ""){
            return (cleanSpeechResult === context.PASSPHRASE && confidence > 0.5)
        }
        else{
            let entry = event.Digits;
            return entry === context.PASSCODE
        }
    }
    
    //Door Buzzer Logic
    if (validBuzzer()) {
          twiml.say({voice: 'Google.en-US-Standard-H'}, 'Access Granted.');
          twiml.play({digits: '9'}); // Pressing 9 sends DTFM tone to open the door
          twiml.pause({length:0.5});
          
          twiml.redirect(`/text-resident?Method=${
              event.Digits === context.PASSCODE? 'code' :
              'voice'}`);

          callback(null, twiml);  
      }
      else{
          twiml.say({voice: 'Google.en-US-Standard-H'}, `Wrong code! Calling Resident...`);
          twiml.redirect('/call-resident');
          callback(null, twiml);
    }
  }