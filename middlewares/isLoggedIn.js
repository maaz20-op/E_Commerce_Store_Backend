import jwt from 'jsonwebtoken';
import {createApiClient ,errorResponseApi} from '@maaz-jutt-utils/my-utils'



export const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken && !refreshToken) {
      return errorResponseApi(res, 500, "Unauthorized request")
    }

    let decodedAccess;
    let decodedRefresh;

    // Verify access token
    if (accessToken) {
      try {
        decodedAccess = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      } catch (err) {
        // Access token invalid/ezxpired
        decodedAccess = null;
      }
    }

    // Verify refresh token
    if (refreshToken) {
      try {
        decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      } catch (err) {
        decodedRefresh = null;
      }
    }

    // If both tokens are invalid, redirect
    if (!decodedAccess && !decodedRefresh) {
      return errorResponseApi(res, 440, "User not login")
    }

    // If access token is invalid but refresh token is valid
    if (!decodedAccess && decodedRefresh) {
      
        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);
      
     SendTokenThroughCookies(accessToken, refreshToken, res);
req.user = {
  id: decodedRefresh.id
}   
      return next();
    } 
    

    // If access token is valid, get user
    if (decodedAccess && decodedAccess.id) {
      req.user = {
        id: decodedAccess.id
      } 
      
      return next();
     }else {
   errorResponseApi(res, 404, "user not loggedIn")
     }
    
  } catch (error) {
    return errorResponseApi(res, 404, "user not loggedIn")
  }
};
