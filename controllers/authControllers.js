import { hashPassword, comparePassword } from '../helpers/authHelper.js';
import User from '../models/User.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ message: 'Name is Required' });
    }
    if (!email) {
      return res.send({ message: 'Email is Required' });
    }
    if (!password) {
      return res.send({ message: 'Password is Required' });
    }
    if (!phone) {
      return res.send({ message: 'Phone no is Required' });
    }
    if (!address) {
      return res.send({ message: 'Address is Required' });
    }
    //check user
    const exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already Register please login',
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: 'User Register Successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Errro in Registeration',
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registerd',
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Password',
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).send({
      success: true,
      message: 'login successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: 'Email is required' });
    }

    if (!newPassword) {
      res.status(400).send({ message: 'New Password is required' });
    }
    //check
    const user = await User.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Wrong Email Or Password',
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(200).send({
      success: true,
      message: 'Password Reset Succesfuly',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send('Protected Routes');
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
