import mongoose from 'mongoose'

const  connnectDB = async ()=>{
    mongoose.connection.on('connected',()=>console.log('MondoDB connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}
export default connnectDB