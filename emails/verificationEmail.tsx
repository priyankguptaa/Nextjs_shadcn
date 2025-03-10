import * as React from 'react';
import { Html, Button, Preview } from "@react-email/components";

interface verificationEmailProps{
    username: string;
    otp: string;
}

export default function verificationEmail({username, otp}:verificationEmailProps) {
  
    return (
    <Html lang="en">
        <h2>Verification Code</h2>
        <Preview>your verification code:{otp}</Preview>
        <h2>{username}</h2>
        <h2>{otp}</h2>
      <Button>Click me</Button>
    </Html>
  );
}

