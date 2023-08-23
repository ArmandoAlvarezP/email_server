const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const router = express.Router();
const port = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen( port, () => console.log("Server Running"));

console.log(router);
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "armandoalvarezdev@gmail.com",
    pass: "zjjgkfeozhhzsvpq"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "armandoalvarezdev@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});