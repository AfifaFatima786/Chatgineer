const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true, // JS can't access this cookie
  secure: isProduction, // only true in production (i.e., HTTPS)
  sameSite: isProduction ? 'None' : 'Lax', // 'None' needed for cross-origin in prod
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

module.exports = cookieOptions;
