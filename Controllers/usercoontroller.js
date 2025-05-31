const newuser = require('../Models/usermodel');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../emailtransporter');

//Create User

exports.createuser = async (req, res) => 
{
    try
        {
            const {
                username, email, password, confirmpassword,
                isVerified, isActive
                } = req.body;    

            //check email existing
            const existing = await newuser.findOne({ email });
            if (existing) {
                return res.status(400).send('Email already exists');
            }
            
            if (password !== confirmpassword) {
                return res.status(400).send("Passwords do not match.");
            }
        
            const hashed = await bycrypt.hash(password, 10);
            const Adduser = await newuser.create({
                username: username,
                email: email,
                password: hashed,
                isVerified: isVerified,
                isActive: isActive
            });        

            //create verification token
            const token = jwt.sign({id: Adduser._id}, process.env.ACCESS_SECRET_KEY, {expiresIn: '1d'});

            //verification link
            // const link = `https://car-backend-production.up.railway.app/api/customer/Verify-email?token=${token}`;
            const link = `https://car-backend-production.up.railway.app/api/user/Verify-email?token=${token}`;

            await transporter.sendMail({
                from: `"Verify Email" <${process.env.Email}>`,
                to: email,
                subject: "Email Verification",
                html: `<p>Hi ${username}</p>
                   <p>Click <a href="${link}">here</a> to verify your email.</p>`,
            });
            res.status(200).send("User Successfuly Register ! plz verify email ");
 
        }
    catch (err)
        {
            res.status(500).json({error: err.message});
        }
};

exports.verifyemail = async (req, res) => {
    try 
        {
            const {token} = req.query;
            const decode = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            await newuser.findByIdAndUpdate(decode.id, {isVerified: true});
            res.send("Email verified successfully!");
        }
    catch (err) 
        {
            res.status(400).send("Invalid or expired token");
        }
};

exports.getuserbyid = async (req, res) => 
{
    try 
        {
            const userexists = await newuser.findById(req.params.id);
            if (userexists) {
                res.status(200).json(userexists);
            }
            else {
                return res.status(404).json({ message: "Customer not found" });
            }
        }
    catch (err) 
        {
            res.status(500).json({ error: err.message });
        }
};

exports.updatuser = async (req, res) => {
    try 
        {
            const allowedFields = ['username', 'isActive',];
            const updates = {};

            // Build update object from allowed fields
            for (const key of allowedFields) {
                if (req.body.hasOwnProperty(key)) {
                    updates[key] = req.body[key];
                }
            }

            // Normalize role casing (optional)
            // if (updates.role) {
            //     updates.role = updates.role.charAt(0).toUpperCase() + updates.role.slice(1).toLowerCase();
            // }

            // Perform update
            const updateduser = await newuser.findByIdAndUpdate(
                req.params.Id,
                updates,
                { new: true } // return updated document
            );

            if (!updateduser) {
                return res.status(404).send('User not found');
            }

            res.json(updateduser);
        } 
        catch (err) 
        {
            console.error("Update Error:", err);
            res.status(500).json({ error: err.message });
        }
};

exports.userdelete = async (req, res) => {
  try {
    const deleteduser = await newuser.findByIdAndDelete(req.params.id);

    if (!deleteduser) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully", deleteduser });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
};




