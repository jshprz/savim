const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { 
        type: String, 
        required: '{PATH} is required!' 
    },
    lastName: { 
        type: String, 
        required: '{PATH} is required!' 
    },

    email: {
        type: String,
        required: '{PATH} is required!',
        unique: true,
        lowercase: true,
        trim: true
    },
    
    phone: { 
        type: String,
        required: '{PATH} is required!',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

const UserModel = mongoose.model('user', UserSchema);



module.exports = UserModel;