import { WebClient } from '@slack/web-api';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const web = new WebClient(process.env.SLACK_API_KEY);
  const currentTime = new Date().toTimeString();
  
  let myerror = null;

  try {
    await web.chat.postMessage({
      channel: '#hacking',
      text: query.msg,
    });
    console.log('Message posted!');
  } catch (error) {
    myerror = error;
    console.log(error);
  }

  return { msg: query.msg, err: myerror };
});