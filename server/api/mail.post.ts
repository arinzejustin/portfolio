import { defineEventHandler, readBody, getHeader, H3Event } from "h3";
import nodemailer from "nodemailer";

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export default defineEventHandler(async (event: H3Event) => {
    const config = useRuntimeConfig();

    // Verify origin
    const origin = (getHeader(event, "origin") || getHeader(event, "referer") || "").replace(/\/$/, "");
    const ALLOWED_ORIGIN = ['http://localhost:3000', 'https://arinzejustin.netlify.app']; // e.g. https://yourdomain.com
    if (!ALLOWED_ORIGIN.includes(origin)) {
        return { status: false, message: "Unauthorized request" };
    }

    // Parse body
    const { name, email, message } = await readBody<{ name: string; email: string; message: string }>(event);

    if (!name || !email || !message) {
        return { status: false, message: "Missing required fields" };
    }

    if (!isValidEmail(email)) {
        return { status: false, message: "Invalid email address" };
    }

    try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.googlePassUser,
                pass: config.googlePassKey,
            },
        });

        const mailOptions = {
            from: `"${safeName}" <${config.googlePassUser}>`, // always your Gmail
            replyTo: safeEmail, // reply goes to sender
            to: config.myEmail,
            subject: `New Contact Message from ${safeName}`,
            html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color:#4CAF50;">New Message</h2>
          <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
          <p>${safeMessage}</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return { status: true, message: "Email sent successfully" };
    } catch (err: any) {
        console.error("Mail error:", err.message, err.response);
        return { status: false, message: "Failed to send email" };
    }
});
