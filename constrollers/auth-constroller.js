const db = require("../models/db");
const {Status} = require ("@prisma/client")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next) => {
  const {
    name,
    lastName,
    password,
    confirmPassword,
    email,
    phone,
    date,
  } = req.body;
  try {
    // validation
    if (!(name && lastName && email && password && confirmPassword)) {
      return next(new Error("Full fill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("confirm password not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    const data = {
      name,
      lastName,
      email,
      password: hashedPassword,
      phone,
      date,
      role: "USER",
    };

    const rs = await db.users.create({ data });
    console.log(rs);

    res.json({ msg: "Register successful" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!(email.trim() && password.trim())) {
      return next(new Error("Fulfill all inputs"));
    }

    const user = await db.users.findFirstOrThrow({ where: { email } });
    // console.log(user)

    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid login password");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(token)
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering" });
  }
};




exports.getme = (req, res, next) => {
  res.json(req.user);
};

exports.userid = async (req, res, next) => {
  try {
    
    const productData = await db.users.findFirst({
      where: { 
        id: req.user.id
      }
    })
    if (!productData) {
      return res.status(404).json({ message: "unknow" });
    }
    res.json(productData);
    console.log(productData)
  } catch (error) {
    next(error); 


  }

};


