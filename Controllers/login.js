const existuser = require('../Models/usermodel');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cashetoken = require('../tokencache');


exports.login = async (req, res) => {
    try 
        {
            const { email, password } = req.body;
            const user = await existuser.findOne({ email });
            if (!user) {
                return res.status(404).json({ msg: "User Not Found" });
            }
            if(!user.isVerified) {
                return res.status(403).send("Please verify your email");
            }
            if(!user.isActive) {
                return res.status(403).send("Your account is not active");
            }
            const isMatch = await bycrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }
            const Accesstoken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
            const RefreshToken = jwt.sign({id: user._id}, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

            cashetoken.set(`${email}_refresh`, RefreshToken);

            res.json({ message: 'login successfull', Accesstoken, RefreshToken });
        }
    catch (err) {
        
        res.status(500).json({ error: err.message });
    }    

};

exports.refreshToken = async (req, res) => {
        const authHeader = req.headers['authorization'];
        const refreshToken = authHeader && authHeader.split(' ')[1];

        if(!refreshToken){
             return res.status(401).send({ message: "Unauthorized" });
        }
        try
        {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
            const cached = cashetoken.get(`${decoded.id}_refresh`);

            if(cached !== refreshToken){
                return res.status(401).send({ message: "Unauthorized" });
            }

            const NewAccessToken = jwt.sign({id: decoded.id}, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'refresh token successfull', NewAccessToken });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
            }
}