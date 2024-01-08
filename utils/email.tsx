import React from "react";
import nodemailer from "nodemailer"
import { render } from '@react-email/render';

import {EmailVarification} from "./email-tem";

const username = process.env.MAIL;
const password = process.env.MAIL_PASSWORD;

export async function sendTwoFactorEmail(email: string ,token: string ) {
    const emailtem = render(<EmailVarification varification={token} title="Varify Email"/>)
    //  await transporter.sendMail(
    //     {
    //         from: "Authjs team",
    //         to: email,
    //         subject: "Insert 2FA code to sign in",
    //         html:`<p>Your @2FA code: ${token}`
    //     }
    //  )
    

  }

export async function sendEmail(email: string ,token?: string ) {

    const confirmLink = `http://localhost:3000/auth/new-varification?token=${token}`
    const emailtem = render(<EmailVarification varification={confirmLink} title="Varify Email"/>)
    //  await transporter.sendMail(
    //     {
    //         from: "Authjs team",
    //         to: email,
    //         subject: "Confirm email to sign in",
    //         html:emailtem
    //     }
    //  )
    

  }

  export async function sendPasswordResetEmail(email: string ,token?: string ) {

    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`
    const emailtem = render(<EmailVarification varification={resetLink} title="Reset Password"/>)
    //  await transporter.sendMail(
    //     {
    //         from: "Authjs team",
    //         to: email,
    //         subject: "Reset your password",
    //         html:emailtem
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



