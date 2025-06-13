const mongoose=require("mongoose");
const connect=async ()=>{
    await mongoose.connect("mongodb+srv://komz18:komz18@cluster0.44tds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.error("Connection error:", err));
    
    
};
connect();