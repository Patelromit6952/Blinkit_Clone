const forgotpasswordtemplate =({name,otp}) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 500px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
        <h2 style="color: #333;">Dear ${name}</h2>
        <p style="color: #555;">No worries! This is OTP to reset your password.</p>
        <a href="" style="display: inline-block; background: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 20px;">${otp}</a>
        <p style="color: #777; font-size: 14px; margin-top: 20px;">If you didn’t request a password reset, you can ignore this email.</p>
        <p style="color: #777; font-size: 14px;">This OTP will expire in 5 minutes.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px;">&copy; 2025 Blinkyit. All rights reserved.</p>
    </div>
</div>
    `
}

export default forgotpasswordtemplate