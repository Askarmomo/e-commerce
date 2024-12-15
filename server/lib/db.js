import mongoose from "mongoose";


const mongodbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("mongodb connected succeffully");

    } catch (error) {
        console.log("Error in mongodbConnection" + error);

    }

}

export default mongodbConnection



// AmMuK5x8XhiIEOyZ