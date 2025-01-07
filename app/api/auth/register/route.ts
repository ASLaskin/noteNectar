import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismaDb';
import sendEmail from '@/app/utils/sendEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;
    if (!email || !name || !password) {
      return NextResponse.json('Missing info', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json('User already exists with this email', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(new Date().getTime() + 30 * 24 * 60 * 60000); 

    await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        resetToken: token,
        resetTokenExpiry: tokenExpiration,
        credits: 1, 
      },
    });


    return NextResponse.json(`Registration Successful, Please Sign In!`, {
      status: 200,
    });
  } catch (error) {
    console.log(error, 'REGISTRATION ERROR');
    return NextResponse.json('Internal Error', { status: 500 });
  }
}
