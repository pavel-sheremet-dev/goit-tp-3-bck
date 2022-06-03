const sgMail = require('@sendgrid/mail');
const { getEnv } = require('../config');

sgMail.setApiKey(getEnv().SENDGRID_API_KEY);

// обязательно проверить правильность маршрута /users/verify/

const getVerificationUrl = verificationToken =>
  `${getEnv().SERVER_BASE_URL}/users/verify/${verificationToken}`;

const sendVerificationEmail = async (to, verificationToken) => {
  const verificationUrl = getVerificationUrl(verificationToken);

  const msg = {
    to,
    from: getEnv().SENDGRID_SENDER,
    subject: '[RB Team] Please confirm your email address',
    text: `Go to this link to confirm your email: ${verificationUrl}`,
    html: `<a href="${verificationUrl}">Click to confirm your email</a>`,
    // на сендгриде можно создать шаблон тела письма со стилями, я позже сделаю
    // templateId: '',
    // dynamicTemplateData: {
    //   verificationUrl,
    // },
  };

  return await sendEmailWithControl(msg);
};

// sendVerificationEmail returns status. 202 (success) or null

const sendEmailWithControl = async msg => {
  const sendEmailClosureFunc = msg => async () => await sendEmail(msg);
  const sendEmailLocal = sendEmailClosureFunc(msg);
  const status = await sendEmailLocal();
  if (!status) {
    retrySendEmail(sendEmailLocal);
  }
  return status;
};

const sendEmail = async msg => {
  try {
    const sendedMessage = await sgMail.send(msg);
    return sendedMessage[0].statusCode;
  } catch (error) {
    return null;
  }
};

const retrySendEmail = (sendMailFunction, count = 2, interval = 20) => {
  setTimeout(async () => {
    const status = await sendMailFunction();
    if (!status && count - 1) {
      retrySendEmail(sendMailFunction, count - 1);
      return;
    }
    return status;
  }, interval * 1000);
};

exports.mailService = { sendVerificationEmail };
