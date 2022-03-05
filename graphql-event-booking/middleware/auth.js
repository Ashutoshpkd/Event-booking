const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let decodedToken;
    const header = req.get('Authorization');
    if(!header) {
        req.isAuth = false;
        return next();
    }
    const token = header.split(' ')[1];

    if(!token || token === '') {
        req.isAuth = false;
        return next();
    }
    try {
        decodedToken = jwt.verify(token, 'CaptainLevi@123');
    } catch (error) {
        console.log(`[ERROR] - Invalid token ${error.message}`);
        req.isAuth = false;
        return next();
    }
    if(!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    console.log(`[INFO] - User authorised ID : ${decodedToken.userId} Email: ${decodedToken.email}`);
    return next();
}