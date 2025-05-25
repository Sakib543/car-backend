const changeing = require('../Models/usermodel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

exports.updateemailpassword = async (req, res) => {
    try 
        {
            const allowedFields = ['password'];
            const updates = {};

            // Build update object from allowed fields
            for (const key of allowedFields) {
                if (req.body.hasOwnProperty(key)) {
                    updates[key] = req.body[key];
                }
            }

            // Perform update
            const updateduser = await changeing.findByIdAndUpdate(
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
