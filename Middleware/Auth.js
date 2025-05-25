const jwt = require('jsonwebtoken');

const Authentication = async (req, res, next) => {
    const auth = req.header('authorization');
    const token = auth && auth.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    try 
        {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            req.user = decoded;
            next();
        }
    catch (err)
        {
            return res.status(401).send({ message: "Invalid token" });
        }    

}

module.exports = Authentication;

