const { Infobip, AuthType } = require("@infobip-api/sdk");
const dotenv = require("dotenv");
dotenv.config();

let infobip = new Infobip({
  baseUrl: process.env.INFOBIP_BASE_URL,
  apiKey: process.env.INFOBIP_API_KEY,
  authType: AuthType.ApiKey,
});

const sendSms = async (message) => {
  try {
    await infobip.channels.sms.send({
      type: "text",
      messages: [
        {
          destinations: [
            {
              to: `${process.env.SMS_RECEIVER}`,
            },
          ],
          from: `${process.env.SMS_SENDER}`,
          text: message,
        },
      ],
    });
  } catch (error) {
    console.error({ infobipError: error });
  }
};

module.exports = {
  sendSms,
};
