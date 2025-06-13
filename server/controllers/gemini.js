const router=require("express").Router();
const {gemini}=require("../services/gemini");
router.post('/gemini', gemini);
module.exports=router;