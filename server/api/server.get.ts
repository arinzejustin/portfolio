import { defineEventHandler, H3Event } from "h3";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.googlePassUser,
        pass: config.googlePassKey,
      },
    });

    const mailOptions = {
      from: `"militaryvacationapplication.online" <${config.googlePassUser}>`,
      to: "usamilitaryapplicationvacation@gmail.com",
      subject: `Server Security Alert (militaryvacationapplication.online)`,
      replyTo: "no-reply@serverguard.io",
      html: `
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Urgent Server Security Alert</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;padding:30px 0;">
    <tr>
      <td align="center">

        <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.10);">

          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#c0392b 100%);padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:22px 36px;vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                        </td>
                        <td style="padding-left:12px;">
                          <span style="display:block;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;line-height:1;">ServerGuard</span>
                          <span style="color:rgba(255,255,255,0);font-size:11px;letter-spacing:1px;text-transform:uppercase;">Security Operations Center</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="padding:22px 36px;">
                    <span style="display:inline-block;background-color:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.35);border-radius:4px;color:#ffffff;font-size:11px;font-weight:600;letter-spacing:1.2px;padding:5px 12px;text-transform:uppercase;">CRITICAL ALERT</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#c0392b;padding:10px 36px;text-align:center;">
              <span style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                ⚠️&nbsp;&nbsp;IMMEDIATE ACTION REQUIRED  LAST WARNING&nbsp;&nbsp;⚠️
              </span>
              <span style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                Regarding militaryvacationapplication.online
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 36px 20px 36px;">

              <p style="margin:0 0 6px 0;color:#555;font-size:13px;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Hello, Client</p>
              <p style="margin:0 0 28px 0;color:#1a1a2e;font-size:22px;font-weight:700;line-height:1.3;">
                A Critical Vulnerability Has Been Detected on Your Server
              </p>

              <p style="margin:0 0 18px 0;color:#444;font-size:15px;line-height:1.7;">
                Our security monitoring systems have identified a <strong>high-severity vulnerability</strong> within the architecture currently running on your server infrastructure. This vulnerability poses a significant risk to your data integrity, application availability, and overall system security.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff5f5;border-left:4px solid #c0392b;border-radius:4px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 12px 0;color:#c0392b;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">Vulnerability Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:5px 0;color:#666;font-size:13px;width:160px;">Website</td>
                        <td style="padding:5px 0;">
                          <span style="background:#c0392b;color:#fff;border-radius:3px;font-size:12px;font-weight:700;padding:2px 9px;">militaryvacationapplication.online</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;color:#666;font-size:13px;width:160px;">Severity Level</td>
                        <td style="padding:5px 0;">
                          <span style="background:#c0392b;color:#fff;border-radius:3px;font-size:12px;font-weight:700;padding:2px 9px;">CRITICAL</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;color:#666;font-size:13px;">Affected Component</td>
                        <td style="padding:5px 0;color:#1a1a2e;font-size:13px;font-weight:600;">Server Architecture / Core Infrastructure</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;color:#666;font-size:13px;">Detection Date</td>
                        <td style="padding:5px 0;color:#1a1a2e;font-size:13px;font-weight:600;">February 12, 2026</td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;color:#666;font-size:13px;">Current Status</td>
                        <td style="padding:5px 0;">
                          <span style="color:#c0392b;font-size:13px;font-weight:700;">⬤ Unpatched — Actively Exposed</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;color:#666;font-size:13px;">Required Action</td>
                        <td style="padding:5px 0;color:#1a1a2e;font-size:13px;font-weight:600;">Urgent Server Update &amp; Patch Deployment</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 18px 0;color:#444;font-size:15px;line-height:1.7;">
                Without an immediate update and patch, your server remains fully exposed to potential exploitation, data breaches, and unauthorized access. Continuing to operate without this update puts your business, clients, and sensitive data at serious risk.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f9fc;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 16px 0;color:#1a1a2e;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">What You Should Do Right Now</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:1px;">
                          <span style="display:inline-block;width:24px;height:24px;background:#1a1a2e;color:#fff;border-radius:50%;text-align:center;font-size:12px;font-weight:700;line-height:24px;">1</span>
                        </td>
                        <td style="padding-left:12px;color:#444;font-size:14px;line-height:1.6;">
                          <strong style="color:#1a1a2e;">Contact your software developer immediately.</strong> Forward this email and instruct them to begin the update and patching process without delay.
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:1px;">
                          <span style="display:inline-block;width:24px;height:24px;background:#1a1a2e;color:#fff;border-radius:50%;text-align:center;font-size:12px;font-weight:700;line-height:24px;">2</span>
                        </td>
                        <td style="padding-left:12px;color:#444;font-size:14px;line-height:1.6;">
                          <strong style="color:#1a1a2e;">Back up all critical data</strong> before the patch is applied to prevent any data loss during the update process.
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width:32px;vertical-align:top;padding-top:1px;">
                          <span style="display:inline-block;width:24px;height:24px;background:#1a1a2e;color:#fff;border-radius:50%;text-align:center;font-size:12px;font-weight:700;line-height:24px;">3</span>
                        </td>
                        <td style="padding-left:12px;color:#444;font-size:14px;line-height:1.6;">
                          <strong style="color:#1a1a2e;">Confirm update completion</strong> by replying to this email or reaching out to our support team so we can verify the vulnerability has been resolved.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#1a1a2e,#2c3e50);border-radius:6px;margin-bottom:28px;">
                <tr>
                  <td style="padding:22px 24px;text-align:center;">
                    <p style="margin:0 0 6px 0;color:#e74c3c;font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">⚠ Final Warning</p>
                    <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.7;">
                      This is your <strong>last warning</strong> before your server is taken offline to prevent further exposure and potential harm to connected systems. Failure to act will result in <strong>automatic server suspension</strong> within the next <strong>48 hours</strong>.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px 0;color:#444;font-size:15px;line-height:1.7;">
                We understand this is urgent and we are here to assist you through the process. Please do not ignore this notice — the security and continuity of your services depend on this update being applied immediately.
              </p>

              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="border-radius:5px;background-color:#c0392b;">
                    <a href="mailto:support@serverguard.io" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">
                      Contact Support Now →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px 0;color:#444;font-size:14px;">Regards,</p>
              <p style="margin:0;color:#1a1a2e;font-size:15px;font-weight:700;">ServerGuard Security Team</p>
              <p style="margin:0;color:#888;font-size:13px;">Security Operations Center</p>

            </td>
          </tr>
          <tr>
            <td style="padding:0 36px;">
              <hr style="border:none;border-top:1px solid #eee;margin:0;"/>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 36px 32px 36px;">
              <p style="margin:0 0 6px 0;color:#aaa;font-size:11px;line-height:1.7;text-align:center;">
                This is an automated security notification sent by ServerGuard Security Operations Center.<br/>
                Please do not reply directly to this email. To get support, contact us at 
                <a href="mailto:support@serverguard.io" style="color:#c0392b;text-decoration:none;">support@serverguard.io</a>
              </p>
              <p style="margin:0;color:#ccc;font-size:11px;text-align:center;">
                © 2026 ServerGuard Inc. &nbsp;|&nbsp; All Rights Reserved &nbsp;|&nbsp; 
                <a href="#" style="color:#aaa;text-decoration:none;">Privacy Policy</a> &nbsp;|&nbsp;
                <a href="#" style="color:#aaa;text-decoration:none;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
            `,
    };

    await transporter.sendMail(mailOptions);

    return { status: true, message: "Email sent successfully" };
  } catch (err: any) {
    console.error("Mail error:", err.message, err.response);
    return { status: false, message: "Failed to send email" };
  }
});
