import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


//->For register(SignUp) at website:-
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };
 
//Cloudinary part for register(SignUp):-  
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exist with this email',
        success: false,
      });
    };

  

//Converting password to hash format using bcrypt:-
    const hashPassword = await bcrypt.hash(password, 10);//10 is salt value
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    })
  }
  catch (error) {
    console.log(error);
  }
};



//->For login(SignIn) for website after registration:-
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    };
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

  //Checking for password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    };
  //Check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist whith current role",
        success: false
      });
    };

//Now we generate a Token:-
    const tokenData = {
      userId: user._id
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '10d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
      // secure:false//
    })

  }
  catch (error) {
    // console.log(error);
    return res.status(404).json({
      message: "Error",
      success: false,
    });
  }
}


//->For logout :-

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}


//->For Updating the profile:-
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    // let cloudResponse = null;

    //->Cloudinary:-
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // console.log(cloudResponse);




    //Split the skills
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    };

    //Updating Data
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray


    //resume comes :-
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url //save the cloudinary Url
      user.profile.resumeOriginalName = file.originalname;//save the original file name 
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
      message: "Profile update successfully",
      user,
      success: true
    })
  }



  catch (error) {
    console.log(error);
  }
}




