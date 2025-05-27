import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import prisma from '../config/prisma.js';

dotenv.config();

export const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sendEmailAuth = async (email) => {
  const number = generateRandomNumber(111111, 999999);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '인증 관련 메일 입니다.',
    html: `<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1> ${number}`,
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (err, response) => {
      smtpTransport.close();
      if (err) {
        reject({
          ok: false,
          msg: '메일 전송에 실패하였습니다.',
          error: err.message,
        });
      } else {
        resolve({
          ok: true,
          msg: '메일 전송에 성공하였습니다.',
          authNum: number,
        });
        prisma.user.update({
          where: { email },
          data: { emailAuthentication: number },
        });
      }
    });
  });
};
