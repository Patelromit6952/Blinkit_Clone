import  nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log("email and password not found");
  
}

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


const sendemail = async ({sendto,subject,html})=>{
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: sendto, 
    subject: subject,
    html:html,
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email: " + error.message);
  }
}

export default sendemail;