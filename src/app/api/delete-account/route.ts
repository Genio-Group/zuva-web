import { NextResponse } from "next/server";
import { transporter } from "@/lib/nodemailer";

const DELETE_EMAIL = "zuvanetwork@gmail.com";

export async function POST(req: Request) {
  try {
    const { email, username, details } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Build email body
    const emailBody = [
      "Please permanently delete my Zuva Network account and associated data.",
      "",
      "Email used in app: " + email,
      username ? "Username / Player ID: " + username : "",
      details ? "Additional details: " + details : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Send Email
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: DELETE_EMAIL,
      subject: "Zuva Network Account Deletion Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1a1a2e; margin-bottom: 20px;">Account Deletion Request</h2>
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
              <p style="margin: 0; color: #856404; font-weight: bold;">⚠️ Action Required: Account Deletion Request</p>
            </div>
            <div style="line-height: 1.6; color: #333;">
              <p style="margin-bottom: 15px;">${emailBody.replace(/\n/g, "<br>")}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Request Details:</strong><br>
                Submitted: ${new Date().toLocaleString()}<br>
                User Email: ${email}
              </p>
            </div>
            <p style="margin-top: 20px; color: #999; font-size: 12px; text-align: center;">
              This is an automated email from the Zuva Network account deletion form.
            </p>
          </div>
        </div>
      `,
      text: emailBody,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Deletion request sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending deletion request:", error);
    return NextResponse.json(
      {
        message: "Failed to send deletion request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
