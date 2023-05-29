const User = require('../models/userModel');
const getUserInformation = async (userName) => {
    // Fetch the necessary user information from MongoDB
    try{
      const user = await User.findOne({ userName });
    
      // Return the user information
      return {
        email: user.email,
        mobile: user.mobile,
        balance: user.balance,
      };
    }catch{
      
    }
  };
  
  module.exports = {
    getUserInformation,
  };
  