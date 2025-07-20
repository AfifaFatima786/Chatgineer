const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.post('/execute', async (req, res) => {
  const { script, language, versionIndex } = req.body;

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script,
      language,
      versionIndex
    });

    res.json(response.data);
  } catch (err) {
    console.error('JDoodle error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Code execution failed.' });
  }
});

module.exports = router;
