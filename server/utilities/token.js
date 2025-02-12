import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  try {
    const { _id: id, email } = user;
    const token = jwt.sign({ email, id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    if(!token){
        throw new Error('Token generation failed');
    }
    return token;
  } catch (error) {
    return res.status(500).json("error: ", error.message);
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json("Unauthorized: Something went wrong with jwt authentication");
    }
    return decoded;
  } catch (error) {
    return res.status(500).json("error: ", error.message);
  }
};
