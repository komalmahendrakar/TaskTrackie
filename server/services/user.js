require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); 


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const checkUsers = await User.findOne({ $or: [{ email }, { username }] });
        if (checkUsers) {
            return res.status(409).json({ error: "Username or email already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPass });
        await newUser.save();

        return res.status(200).json({ success: "Registration done!" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: "Internal server error!" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.cookie("TaskiToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "Lax" : "none",
        });

        return res.status(200).json({ success: "Login success" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error!" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("TaskiToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });
        res.json({ message: "Logged out" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error!" });
    }
};

const userDetails=async(req,res)=>{
    try {
        
       const{user}=req; 
       
       const getDetails=await User.findById(user._id).populate("tasks").select("-password");
       if(getDetails){
        const allTasks=getDetails.tasks;
        let yettobedone=[];
        let inProgress=[];
        let completed=[];
        allTasks.map((item)=>{
            if(item.status==="yettobedone")
            {
                yettobedone.push(item);
            }
        else if(item.status==="inProgress"){
            inProgress.push(item);

        }
        else{
          completed.push(item);
        }
        })
        return res.status(200).json({success:"success",tasks:[{yettobedone},{inProgress},{completed}],
        })

       }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error!"    });
    }
}



module.exports = { register, login,logout ,userDetails};
