const { validateUserToken } = require("../services/authentication");

function checkForAuthenticatinCookie(cookieName) {
    return (req, res, next) => {
        const cookieValueName = req.cookies[cookieName];
        if (!cookieValueName) {
            return next();
        }
        try {
            const userPayload = validateUserToken(cookieValueName);
            req.user = userPayload;
        } catch (error) {}
        return next();
    };
}

module.exports = checkForAuthenticatinCookie;