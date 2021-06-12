import asynchandler from 'express-async-handler'
import User from '../models/userModel.js'
import jsonwebtoken from '../utils/generateToken.js'

// @desc    Fetch user
// @route   GET /api/users
// @access  Private
const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jsonwebtoken(user._id)
    })

  } else {
    res.status(401).json({message:'Invalid Email or Password'})
  }
});



// @desc    Rigester a user
// @route   GET /api/users
// @access  Public
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({message:'User already exists'})
    
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jsonwebtoken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


// @desc     user Profile
// @route   GET /api/users/profile
// @access  Public

const getuserProfile = asynchandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    })

  } else {

    res.status(401);
    throw new Error('User Not Found')
  }


});


// @desc     user Profile
// @route   GET /api/users/profile
// @access  Public

const UpdateuserProfile = asynchandler(async (req, res) => {

  const user = await User.findById(req.user._id)

  if (user) {

    user.name = req.body.name || user.name,
      user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const UpdatedProfile = await user.save()

    res.json({
      _id: UpdatedProfile._id,
      name: UpdatedProfile.name,
      email: UpdatedProfile.email,
      isAdmin: UpdatedProfile.isAdmin,
      token: jsonwebtoken(UpdatedProfile._id)
    });

  } else {

    res.status(401);
    throw new Error('User Not Found')
  }


});



// @desc     find users
// @route   GET /api/users
// @access  private/Admin

const users = asynchandler(async (req, res) => {

  const users = await User.find({})


  if (users) {
    res.json(users);
  } else {

    throw new Error('USERS NOT FOUND')
  }


});




// @desc    delete users
// @route   DELETE /api/users/:id
// @access  private

const deleteUser = asynchandler(async (req, res) => {

  const user = await User.findById(req.params.id)


  if (user) {
    await user.remove();
    res.json({ message: 'user removed' })
  } else {
    res.status(404);
    throw new Error('USER NOT FOUND')
  }


});



// @desc    edit users
// @route   PUT /api/users/:id
// @access  private/Admin

const updateUser = asynchandler(async (req, res) => {

  const user = await User.findById(req.params.id)


  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }


});

export { authUser, getuserProfile, registerUser, UpdateuserProfile, users, deleteUser, updateUser }