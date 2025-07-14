// cookieOptions.js

const cookieOptions = {
  httpOnly: true, // Prevent access from JS (secure against XSS)
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'Lax', // Lax is a good balance for CSRF protection and usability
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

module.exports = cookieOptions;
