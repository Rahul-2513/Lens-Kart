import userModels from '../models/userModels.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}
export const loginUser = async (req, res) => {
    try {
      const {email,password} = req.body;
      const user = await userModels.findOne({email});
      if (!user) {
        return res.json({success:false,message:"User doesn't exists"});
      }
      const isMatch = await bcrypt.compare(password,user.password); 
      if (isMatch) {
        const token = createToken(user._id);
         return res.json( {success: true,token});
      }
      else{
         return res.json({ success: false, message: "Invalid Credentials" });
      }
    } catch (error) {
       console.log(error);
       res.json({ success: false, message: error.message });
    }
};
 
export const registerUser = async (req, res) => {
    try {
       const { name, email, password } = req.body;
       const exists = await userModels.findOne({email});
       if (exists) {
        return res.json({success:false, message:"User Already Exist!"});
       }
       if (!validator.isEmail(email)) {
         return res.json({ success: false, message: "Please Enter a valid email" });
       }
         if (password.length < 7) {
           return res.json({
             success: false,
             message: "Please Enter Strong Password",
           });
         }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModels({
          name,
          email,
          password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
       console.log(error);
       res.json({success:false,message:error.message})
    }

};

export const adminLogin = async (req, res) => {
  try {
    const {email,password} = req.body;
     if (email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD) {
       const token = jwt.sign(email+password,process.env.JWT_SECRET);
       res.json({success:true,token})
     }
     else{
      res.json({success:false,message:"Invalid Credentials"})
     }
  } catch (error) {
    console.log(error);
       res.json({success:false,message:error.message})
  }
};
// controllers/userController.js

export const getUserProfile = async (req, res) => {
  try {
    const user = await userModels.findById(req.userId).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, avatar, password } = req.body;

    const user = await userModels.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const user = await userModels.findById(req.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.address = req.body;
    await user.save();
    res.json({ success: true, address: user.address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const updateUserProfile = async (req, res) => {
//   try {
//     const user = await userModels.findById(req.userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Update fields if provided
//     if (req.body.name) user.name = req.body.name;
//     if (req.body.email) user.email = req.body.email;

//     // If password is provided, hash it before saving
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(req.body.password, salt);
//     }

//     const updatedUser = await user.save();

//     // You don’t need to send a token here unless you're logging in again
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
