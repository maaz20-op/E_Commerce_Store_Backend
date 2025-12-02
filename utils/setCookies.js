

export function SendTokenThroughCookies(accessToken, refreshToken, res){
res.cookie("accessToken", accessToken, {
    httpOnly: true,       // frontend JS can read if needed
    sameSite: "lax",
    maxAge: 4 * 60 * 60 * 1000, // 4 hours
    secure: process.env.NODE_ENV === "production",
  });

  // Refresh Token Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,        // frontend JS cannot read
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === "production",
  });
}