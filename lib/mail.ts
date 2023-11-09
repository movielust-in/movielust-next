import NodeMailer, { createTestAccount } from 'nodemailer';

export const sendMail = async (
  to: string,
  htmlToSend: string,
  subject: string
) => {
  let transportOptions: any;

  if (process.env.NODE_ENV === 'production') {
    transportOptions = {
      host: process.env.MAIL_SERVER || '',
      port: Number(process.env.MAIL_PORT) || 0,
      secure: true,
      ignoreTLS: true,
      auth: {
        user: process.env.MAIL_EMAIL || '',
        pass: process.env.MAIL_PASSWORD || '',
      },
    };
  }

  if (process.env.NODE_ENV === 'development') {
    const testAccount = await createTestAccount();
    transportOptions = {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
  }

  const transporter = NodeMailer.createTransport(transportOptions);

  return transporter.sendMail({
    from: process.env.MAIL_EMAIL,
    to,
    subject,
    html: htmlToSend,
  });
};

// export const verifyTransport = async () =>
//   new Promise((resolve) => {
//     (async () => {
//       try {
//         await transporter.verify();
//         console.log('Mail server verified.');
//         resolve();
//       } catch (error) {
//         console.log('Mail server error:', error);
//         throw new Error(error);
//       }
//     })();
//   });
