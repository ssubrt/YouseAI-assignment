import mongoose from "mongoose";





export async function connect(){
    try {
        
        mongoose.connect(process.env.MONGO_URI!);
        const connection  = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected succesfully")
        })

        connection.on('error',(error)=>{
            console.log("MongoDB connection error. Please make sure MongoDB is running. "+ error);
           process.exit()
        })


        
    } catch (error) {
        console.log("Something Went Wrong");
        console.log(error);
    }   


}