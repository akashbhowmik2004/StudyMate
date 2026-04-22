import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validate from "validator"


const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required :[ true, "Email is required"],
        unique : true,
        validate : [validate.isEmail,"Please provide a valid email address"]
    },
    password : {
        type : String,
        required : true
    }
})

UserSchema.pre("save", function(){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});


const User = mongoose.model("User", UserSchema);


export default User;