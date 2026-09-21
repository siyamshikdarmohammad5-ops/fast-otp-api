const express = require('express');
const app = express();

app.use(express.json());

// রুট টেস্ট রাউট
app.get('/', (req, res) => {
  res.send('OTP & SMS API চালু আছে!');
});

// ৬ ডিজিটের ওটিপি তৈরির এপিআই
app.get('/api/otp', (req, res) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000);
  res.status(200).json({
    status: 'success',
    otp: otpCode.toString(),
    message: 'ওটিপি সফলভাবে তৈরি হয়েছে'
  });
});

// মেসেজ পাঠানোর ডেমো এপিআই
app.post('/api/send-message', (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({
      status: 'error',
      message: 'ফোন নম্বর ও মেসেজ উভয়ই প্রদান করুন'
    });
  }

  res.status(200).json({
    status: 'success',
    phone: phone,
    delivered_message: message,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
