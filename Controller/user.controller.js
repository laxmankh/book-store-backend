import User from "../Model/user.model.js";
// import bcryptjs from "bcryptjs";
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // const hashPassword = await bcryptjs.hash(password, 10);
    const created_user = await User.create({
      fullname,
      email,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      created_user,
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email, password });
  if (user) {
    return res.status(200).json({
      message: "user logged in",
    });
  } else {
    return res.status(400).json({
      message: "signup please",
    });
  }
};

export { signup, login };
