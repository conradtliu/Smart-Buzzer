exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();


	var bodyText;
	
	switch(event.Method){
	    case 'code':
	        bodyText = 'Someone entered the building using a code.';
	        break;
	    case 'voice':
	        bodyText = 'Someone entered the building using a passphrase.';
	        break;
	    default:
			bodyText = 'Someone buzzed the door but didn\'t know the passcode.';
	}

	if(bodyText.length > 0){
		context.getTwilioClient().messages.create({
			to: context.<NAME>_PHONE, //Specify your name
			from: context.TWILIO_PHONE,
			body: bodyText,
		})
			.then((message) => {
			console.log(message.sid);
			callback(null, twiml); 
		})
		.catch((err) => {
			twiml.hangup();
			callback(err, null);
			
		}
			);
	}
	callback(null, twiml);
};