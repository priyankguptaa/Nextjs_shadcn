import mongoose from "mongoose";

type ConectionObject = {
    isConnected?:number
}
const connection:ConectionObject = {}


async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("already connected to database")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected = db.connections[0].readyState
        console.log("Db Connected successfully")
    } catch (error:any) {
        console.log("db connection failed", error)
        
        process.exit(1)
    }
}

export default dbConnect;