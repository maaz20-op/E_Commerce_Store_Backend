
export function SendTokenThroughCookies(accessToken, refreshToken, res) {
  // Access Token Cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",      // IMPORTANT ON VERCEL
    secure: true,          // MUST BE TRUE ON VERCEL
    maxAge: 4 * 60 * 60 * 1000, // 4 hours
  });

  // Refresh Token Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",      // REQUIRED
    secure: true,          // REQUIRED
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}
