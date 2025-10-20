// const isProduction = process.env.NODE_ENV === 'production';

// const cookieOptions = {
//   httpOnly: true, // JS can't access this cookie
//   secure: isProduction, // only true in production (i.e., HTTPS)
//   sameSite: isProduction ? 'None' : 'Lax', // 'None' needed for cross-origin in prod
//   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
// };

// module.exports = cookieOptions;

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true, // JS can't access this cookie
  secure: false, // Set to false for HTTP deployment (not HTTPS)
  sameSite: 'Lax', // Use 'Lax' for better compatibility with HTTP
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/', // Ensure cookie is available for all paths
  domain: process.env.COOKIE_DOMAIN || undefined // Allow domain configuration
};

module.exports = cookieOptions;
