import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id,email) => {
    return jwt.sign({id,email},JWT_SECRET,{expiresIn:'1h'});
}

export const userSignUp = async (req,res) => {
    try{
        const {userName,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.cookie("token", generateToken(newUser._id,newUser.email), {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(201).json({message:"User created successfully"});
    }catch(error){
        res.status(500).json({message:"Error creating user"});
    }
}
export const userLogin = async (req,res) => {
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"User does not exist"});
        }
        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        res.cookie("token", generateToken(existingUser._id,existingUser.email), {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({message:"Login successful"});
    }catch(error){
        res.status(500).json({message:"Error logging in"});
    }
}

export const userLogout = (req,res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({message:"Logout successful"});
}

export const getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};