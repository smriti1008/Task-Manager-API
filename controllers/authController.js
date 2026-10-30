import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';               //creates authentication tokens

export const register = async(req, res, next)=>{
    try{
        const{name, email, password} = req.body;

        if(!name?.trim()||!email?.trim()||!password){
            return res.status(400).json({
                message: "Name, email and password are required",
            })
        }
        if(password.length<8){
            return res.status(400).json({
                message: "Password must be atleast 8 characters",
            })
        }

        const normalizedEmail = email.trim().toLowerCase();
        //This helps avoid duplicate accounts caused by
        //differences in capitalization or surrounding whitespace.
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if(existingUser){
            return res.status(409).json({
                message: "Email is already registered",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        })

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    }
    catch(error){
        if(error.code === 11000){     //MongoDB error 11000 means duplicate key error.
            return res.status(409).json({
                message: "Email is already registered",
            })
        }
        next(error);
    }
}

export const login = async(req, res, next)=>{
    try{
        const {email, password} = req.body;

        if(!email?.trim() || !password){
            return res.status(400).json({
                message: "Email and password are required",
            })
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        }).select("+password");

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
            })
        }

        const token = jwt.sign(
            { userId: user._id.toString()},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error){
        next(error);
    }
}