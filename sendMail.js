const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "baivabbidari987@gmail.com",
    pass: "eqoy qwwo drmc vmpi",
  },
});

const mailOptions = {
  from: "baivabbidari987@gmail.com",
  to: "binay6014@gmail.com",
  subject: "Hello from Baivab",
  text: "This is a test mail hai ta.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email: ", error);
  } else {
    console.log("Email sent: ", info.response);
  }
});
