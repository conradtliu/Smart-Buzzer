# Smart-Door-Buzzer
Turn your "dumb" door buzzer smart with Twilio functions and avoid having to pick up calls and dialing '9' everytime!

Has this ever happened to you? Someone (friend/delivery person/ etc) is trying to get in your building and tries your callbox but you miss the call and now they're stuck outside. Well worry no more, with this Twilio service your callbox is now smart and can let them in automatically without you having to answer a call!

Features include:
* PIN password
* Voice Password
* Fail-Safe Call Feature - Call residents if passwords do not work for manual entry
* [Optional] Text Notifications for Callbox Entry Attempts

## Setting Up
1. Go to Twilio and setup and account and get a valid number (I recommend a 10DLC Number)
2. Go to https://www.twilio.com/console/runtime/functions/manage.
4. Add each of the `.js` files as an individual function with friendly names you'll remember.
5. Go to https://www.twilio.com/console/runtime/functions/configure and configure the following environment variables:
  * `TWILIO_PHONE` - The Twilio number you bought
  * `PASSPHRASE` - The voice password
  * `PASSCODE` - PIN password
  * `<Name>_PHONE` - Your number for manual door entry, you may also add more numbers.
5. Go to https://www.twilio.com/console/phone-numbers/incoming and select the phone number you bought earlier.
6. Scroll to where it says **A call comes in**, select **Function**, and then the function that corresponds to `buzzer-activated.js`.
7. Update your apartment callbox number to the Twilio Number

## How This Works
[Twilio Functions](https://www.twilio.com/functions) completely serverless so there's no need for a VM or computer to keep running an app. It's perfect for something small scale like an apartment buzzer. 

The flow of this program goes like this:

1. A call comes to the Twilio phone number, `buzzer-activated.js` runs.
1. The [Gather](https://www.twilio.com/docs/api/twiml/gather) verb collects either pin/voice password.
   1. If correct, `door-open.js` dials a `9` to the buzzer, opening the door.
   1. If incorrect, `call-residents.js` calls all applicable residents until someone picks up and manually dials `9`.
1. [Optional] After the callbox call has ended, `text-resident.js` notifies resident about the call and the status.

## Cost
Voice: Twilio phone numbers are approximately $2/month to maintain and each voice minute is charged at a rate of $0.0085/minute. This runs around $3-4 a month.

(Optional): SMS messages are by far the more costly part of this to maintain so this is completely optional. The initial setup cost is around $21 ($4 for registering sole proprietorship, $15 for campaign vetting, $2 monthly charge) on top of $2 a month. SMS messages are charged at $0.0079/message. On average this should cost around $3-4/month.

If both voice and messaging are enabled, this should cost around $8/month to run.

## Additional Features
This is the basic version of a smart buzzer for your apartment/complex callbox. This can be further personalized to meet your needs. Some additional features that I have personally incorporated include:
* Multiple attempts for voice password
* Authorized Caller Verification
* Rotating PINS and Voice Passwords

Feel free to play around with this and see how you can make this more fun and engaging!

