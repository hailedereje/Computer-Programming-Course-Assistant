import React from "react";
import nodemailer from "nodemailer"
import { render } from '@react-email/render';

import Email from "./email-tem";

const username = process.env.MAIL;
const password = process.env.MAIL_PASSWORD;


export async function sendEmail(email: string ,token?: string ) {

    const confirmLink = `http://localhost:3000/auth/new-varification?token=${token}`
    const emailtem = render(<Email varification={confirmLink}/>)
    //  await transporter.sendMail(
    //     {
    //         from: "Authjs team",
    //         to: email,
    //         subject: "Confirm email to sign in",
    //         html:`<a href="${confirmLink}">Click to confirm </a>`
    //     }
    //  )
    

  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: username,
        pass: password
    }
})



