const authmid=require("../middleware/authMiddleware");
const {addTask}=require("../services/task");
const {editTask}=require("../services/task");
const {getTask}=require("../services/task");
const {deleteTask}=require("../services/task");
const router =require("express").Router();
 
router.post("/addTask",authmid,addTask);
router.put("/editTask/:id",authmid,editTask);
router.get("/getTask/:id",authmid,getTask);
router.delete("/deleteTask/:id", authmid, deleteTask);


module.exports=router;