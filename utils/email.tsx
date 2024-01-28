import React from "react";
import nodemailer from "nodemailer"
import { render } from '@react-email/render';

import {EmailVarification} from "./email-tem";

const username = process.env.MAIL;
const password = process.env.MAIL_PASSWORD;
const domain = process.env.NEXT_APP_URL


export async function sendEmailVarification(email: string ,token?: string ) {

    const confirmLink = `${domain}/auth/new-varification?token=${token}`
    const emailItem = render(<EmailVarification varification={confirmLink} title="Varify Email"/>)
    const subject = "varify your Email for auth-application"
    await send(email,emailItem,subject)
    

  }

  export async function sendPasswordResetEmail(email: string ,token?: string ) {

    const resetLink = `${domain}/auth/new-password?token=${token}`
    const emailItem = render(<EmailVarification varification={resetLink} title="Reset Password"/>)
    const subject = "reset ur password"
    await send(email,emailItem,subject)
    

  } 

  const send = async(email: string,emailItem: string,subject: string) => {
     await transporter.sendMail(
          {
              from: "Authjs team",
              to: email,
              subject: subject,
              html:emailItem
          }
       )
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



