const express = require('express');
// const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/userModel');
const router = express.Router();

const { getUserInformation } = require('../services/userManagementService');
const { checkBalance } = require('../services/walletService');
const { sendNotification } = require('../services/notificationService');

// Defined endpoints using router


//registers a new user
router.post('/register', async (req, res) => {
  const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    userName: Joi.string().alphanum().min(3).max(20).required(),
    balance: Joi.number().required()
  });
  const { error, value } = userValidationSchema.validate(req.body);
  if (error) {
    // Handle validation error
    res.status(400).json({ error: error.details[0].message });
  } else {
    try {
        const { email, mobile, userName,balance } = req.body;
        const user = new User({ email, mobile,userName,balance });
        await user.save();
    
          
        res.status(201).json({ message:"User registered successfully" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  }
});


router.post('/deposit', async (req, res) => {
  const depositValidationSchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(20).required(),
    amount: Joi.number().required(),
    notificationType: Joi.string().valid('email', 'mobile').required()
  });
  const { error, value } = depositValidationSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  }else{
    try {
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
      }catch(error){
        res.status(400).json({ error: "User does not exist" });
      }
  }
});


// Export the router
module.exports = router;
