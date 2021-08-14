'use strict';

exports.handler = async (event, context, callback) => {
  const email = event.request.userAttributes.email;
  const code = event.request.codeParameter;
  const domain = "MurbanSW";

  // Confirm the user
  event.response.autoConfirmUser = true;

  // Set the email as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty("email")) {
      event.response.autoVerifyEmail = true;
  }

  const signUpTemplate = (code, domain) => `<html>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <div style="border:1px solid black; width: 600px; text-align: left; padding: 5px; font-family: Tahoma; font-size: 12pt; font-color: #424242;">
                        <p align="center">Thank you for signing up with ${domain}!</p>
                        <p align="center">Please use the code below to verify your account.</p>
                        <p align="center" style="padding-top:5px;padding-bottom:5px;margin-left:60px;margin-right:60px;background-color:#b6cfd2;font-size:20pt"><b>${code}</b></p>
                        <footer>
                            <div align="center">
                                <a href="https://www.${domain}.com"><img src="https://sabre-images.s3.amazonaws.com/FindingCRELogo.png" alt="${domain} - Commercial Real Estate for Sale or Lease" title="SabreSW - Commercial Real Estate for Sale or Lease"></a>
                            </div>
                        </footer>
                    </div>
                </td>
            </tr>
        </table>
    </body>
  </html>`;
  
  const forgotPasswordTemplate = (code, domain) => `<html>
    <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <div style="border:1px solid black; width: 600px; text-align: left; padding: 5px; font-family: Tahoma; font-size: 12pt; font-color: #424242;">
                        <p align="center">You have requested to change your ${domain} password</p>
                        <p align="center">Please use the code below to change your password.</p>
                        <p align="center" style="padding-top:5px;padding-bottom:5px;margin-left:60px;margin-right:60px;background-color:#b6cfd2;font-size:20pt"><b>${code}</b></p>
                        <footer>
                            <div align="center">
                                <a href="https://www.${domain}.com"><img src="https://sabre-images.s3.amazonaws.com/FindingCRELogo.png" alt="${domain} - Commercial Real Estate for Sale or Lease" title="SabreSW - Commercial Real Estate for Sale or Lease"></a>
                            </div>
                        </footer>
                    </div>
                </td>
            </tr>
        </table>
    </body>
  </html>`;
  
  if (event.triggerSource === "CustomMessage_SignUp" || event.triggerSource === "CustomMessage_ResendCode" ) {

    event.response = {
        emailSubject: "Verify your SabreSW account",
        emailMessage: signUpTemplate(code, domain)
        
    };
  }
  if (event.triggerSource === "CustomMessage_ForgotPassword") {

    event.response = {
        emailSubject: "Change your SabreSW password",
        emailMessage: forgotPasswordTemplate(code, domain)
        
    };
  }
  callback(null, event);
};
