require('dotenv').config();

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const config = {
    PUBLIC_Key: process.env.PUBLIC_Key,
    SERVICE_ID: process.env.SERVICE_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID
  };

  res.status(200).json(config);
};