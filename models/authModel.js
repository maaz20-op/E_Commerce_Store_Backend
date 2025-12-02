import mongoose from 'mongoose';


const AuthSchema = mongoose.Schema({
 email: {
    type: String,
    unique: true,
    required: true,
 },
 password: {
    type: String,
    required: true,
 },
 userId: {
    type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
 },
 isVerified:{
type: Boolean,
default: false,
 },
 createdAt: {
    type: Date,
    default: Date.now,
 },
});


export const AuthModel = mongoose.model('Auth', AuthSchema);
