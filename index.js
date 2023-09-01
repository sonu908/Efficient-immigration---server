const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());

const allowedOrigins = [
  "http://127.0.0.1:5173", // Replace with the actual origin of your frontend
  // Add other origins as needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Create a Nodemailer transporter
const smtpConfig = {
  host: "smtp.gmail.com", // Replace with your SMTP server's hostname or IP address
  port: 465, // Use the appropriate port for your SMTP server (e.g., 465 for SSL)
  secure: true, // Set to true if using SSL, false for other ports
  auth: {
    user: "effizientimmigrationtest@gmail.com",
    pass: "cgznhiqjjfwctkxg",
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

app.post("/sentmail", (req, res) => {
  const formData = req.body;

  const mailOptions = {
    from: "effizientimmigrationtest@gmail.com",
    to: formData.Email,
    subject: "Form Submission",
    text: `


    Hello,

    Thank you for submitting your details. Here are the details you provided:

    Name: ${formData.Name}
    Age: ${formData.Age}
    Education: ${formData.selectedValue}
    Highest Education Institute: ${formData.highEducation}
    Study Course: ${formData.studyCourse}
    Relevant Work Experience: ${formData.experience}
    Admitted Institute in Canada: ${formData.admitted}
    Program of Study in Canada: ${formData.program}
    Country Applying From: ${formData.country}
    Future Goals: ${formData.goals}
    English Scores - Listening: ${formData.Listening}
    English Scores - Reading: ${formData.Reading}
    English Scores - Speaking: ${formData.Speaking}
    English Scores - Writing: ${formData.writing}
    Did You Pay First Year Tuition: ${formData.tuition}
    Did You Do a GIC: ${formData.gic}
    Amount Paid Towards GIC: ${formData.pay}

    If you have any further questions or need assistance, please feel free to contact us.

    Best regards,
    Sonu -
  `,  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
