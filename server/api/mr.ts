import { WebClient } from '@slack/web-api';
export default defineEventHandler((event) => {
  const query = getQuery(event)
  // Create a new instance of the WebClient class with the token read from your environment variable
  const web = new WebClient(process.env.SLACK_API_KEY);
// The current date
   const currentTime = new Date().toTimeString();
   
  let myerror = null;
  (async () => {

    try {
      // Use the `chat.postMessage` method to send a message from this app
      await web.chat.postMessage({
        channel: '#hacking',
        text: query.msg,
      });
      console.log('Message posted!');
    } catch (error) {
      myerror = error;
      console.log(error);
    }

  })(); 
   return { msg: query.msg , err: myerror};
})
