const { getUserInformation } = require('./userManagementService');
const checkBalance = async (userName) => {
    // Fetch the user's balance from the user management service or directly from MongoDB
    const user = await getUserInformation(userName);
    const balanceFunds = user.balance;
    return balanceFunds;
  };
  
  module.exports = {
    checkBalance,
  };
  