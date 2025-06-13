const router=require("express").Router();
const {register,login,logout,userDetails}=require("../services/user");

const authMiddleware = require("../middleware/authMiddleware.js");
router.post("/register",register);

router.post("/login",login);
router.post("/logout",logout);
router.get("/userDetails",authMiddleware,userDetails);

module.exports=router;