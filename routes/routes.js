const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

const { getUserInformation } = require('../services/userManagementService');
const { checkBalance } = require('../services/walletService');
const { sendNotification } = require('../services/notificationService');

// Defined endpoints using router


//registers a new user
router.post('/register', async (req, res) => {
    try {
        const { email, mobile, userName,balance } = req.body;
        const user = new User({ email, mobile,userName,balance });
        await user.save();
    
          
        res.status(201).json({ message:"User registered successfully" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});


router.post('/deposit', async (req, res) => {
  const { userName, amount, notificationType } = req.body;

  // fetches user's balance
  const balanceFunds = await checkBalance(userName);


  //checks if user's balance is less than amount to be deposite
  if (balanceFunds<amount) {
    const message = 'Failed automated deposit. Insufficient funds. Kindly visit our website to resolve the issue.';
    sendNotification(userName, notificationType, message);
    return res.status(200).json({ Message: 'Insufficient funds, automated deposit not successful an email/sms has been sent to the user' });
  }

  // Proceed with the deposit process
   res.status(200).json({ message: 'Automated deposit successful' });
});


// Export the router
module.exports = router;
