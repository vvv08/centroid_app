import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();
router.post("/", (req, res) => {
  const user = req.body;
  login(user)
    .then((result) => {
      // res.cookie("accessToken", result,{
      //     httpOnly : true,
      // }).status(200).json(result)
      res.status(200).json(result);
    })
    .catch((err) => {
      //Status code 401 for unauthorized request from client side
      res.status(401).json(err);
    });
});

export default router;
