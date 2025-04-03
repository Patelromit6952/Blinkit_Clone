const verificationemailtemplate = ({name,url})=>{
    return `
    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center;">
     <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <table width="600" border="0" cellpadding="20" cellspacing="0" align="center" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="text-align: center;">
                <h2 style="color: #333;">Welcome Dear ${name}</h2>
                <p style="color: #555; font-size: 16px;">Thank you for signing up! Please verify your email by clicking the button below:</p>
                <a href="#" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email</a>
                <p style="color: #777; font-size: 14px; margin-top: 20px;">If you didn’t create an account, you can ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div/>
    `
}
export default verificationemailtemplate;