import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { validationResult } from "express-validator";

export const register = async (req, res, next) => {
    try {
        // express-validator errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        let cloudResponse;
        if (file) {
            // only attempt upload if Cloudinary credentials are set
            if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_SECRET) {
                console.warn("cloudinary credentials missing, skipping upload");
            } else {
                try {
                    const fileUri = getDataUri(file);
                    cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                } catch (uploadError) {
                    console.error("cloudinary upload failed", uploadError);
                    // don't fail entire registration due to upload; continue without photo
                }
            }
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // build profile object, using uploaded photo or a blank string/default
        const profileData = {};
        if (cloudResponse) {
            profileData.profilePhoto = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: profileData,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        // ensure we have a JWT secret before creating tokens
        const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
        if (!secret) {
            // misconfiguration – respond clearly rather than let jwt throw
            return res.status(500).json({ message: "Server error: JWT secret is not set", success: false });
        }
        const token = await jwt.sign(tokenData, secret, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // send cookie as httpOnly and allow cross‑site requests during development
        // also return token in body so clients can use Authorization header (useful for cross‑origin).
        return res.status(200)
          .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none' })
          .json({
            message: `Welcome back ${user.fullname}`,
            user,
            token,
            success: true
        })
    } catch (error) {
        next(error);
    }
}
export const logout = async (req, res, next) => {
    try {
        // clear the authentication cookie
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'none' }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        next(error);
    }
}
export const updateProfile = async (req, res, next) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        let cloudResponse;
        if (file) {
            if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_SECRET) {
                console.warn("cloudinary credentials missing, skipping upload");
            } else {
                try {
                    const fileUri = getDataUri(file);
                    cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                } catch (uploadError) {
                    console.error("cloudinary upload failed", uploadError);
                }
            }
        }

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            if (file) user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        next(error);
    }
}