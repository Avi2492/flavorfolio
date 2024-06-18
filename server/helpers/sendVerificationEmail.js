export async function sendVerificationEmail() {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "FlavourFolio | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
  } catch (error) {
    console.log("Email Failed", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
